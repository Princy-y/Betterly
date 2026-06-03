'use client';

import { useState, useEffect, useCallback } from 'react';
import { UserProgress, CompletedScenario, Scenario } from '@/types';
import { loadProgress, saveProgress } from '@/lib/storage';
import { getLevelFromXP, updateStreak } from '@/lib/xp';
import { achievements } from '@/data/achievements';

export interface RewardSummary {
  baseXp: number;
  achievementXp: number;
  totalXp: number;
  newAchievements: string[];
  levelUp: number | null;
}

export function useProgress() {
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [lastReward, setLastReward] = useState<RewardSummary | null>(null);

  useEffect(() => {
    const loaded = loadProgress();
    // Update streak on load
    const updated = updateStreak(loaded);
    setProgress(updated);
    setIsLoaded(true);
    if (updated.streak !== loaded.streak || updated.lastPracticeDate !== loaded.lastPracticeDate) {
      saveProgress(updated);
    }
  }, []);

  const clearLastReward = useCallback(() => {
    setLastReward(null);
  }, []);

  const completeScenario = useCallback((scenario: Scenario, response: string) => {
    setProgress(prev => {
      if (!prev) return prev;

      // Check if already completed today
      const alreadyCompleted = prev.completedScenarios.some(
        c => c.scenarioId === scenario.id &&
          new Date(c.completedAt).toDateString() === new Date().toDateString()
      );

      const prevLvl = prev.level;
      const baseXpEarned = alreadyCompleted ? 0 : scenario.xpReward;

      const entry: CompletedScenario = {
        scenarioId: scenario.id,
        response,
        completedAt: new Date().toISOString(),
        xpEarned: baseXpEarned,
      };

      const newXP = prev.xp + entry.xpEarned;
      const newLevel = getLevelFromXP(newXP);

      const updated: UserProgress = {
        ...prev,
        xp: newXP,
        level: newLevel,
        completedScenarios: [...prev.completedScenarios, entry],
        lastPracticeDate: new Date().toDateString(),
        totalPracticeTime: (prev.totalPracticeTime || 0) + 2, // Increment total practice time by 2 minutes
      };

      // Check and award achievements
      const newAchievements = achievements
        .filter(a => !updated.earnedAchievements.includes(a.id) && a.condition(updated))
        .map(a => a.id);

      let achievementXP = 0;
      if (newAchievements.length > 0) {
        achievementXP = achievements
          .filter(a => newAchievements.includes(a.id))
          .reduce((sum, a) => sum + a.xpReward, 0);
        updated.earnedAchievements = [...updated.earnedAchievements, ...newAchievements];
        updated.xp += achievementXP;
        updated.level = getLevelFromXP(updated.xp);
      }

      saveProgress(updated);

      setLastReward({
        baseXp: baseXpEarned,
        achievementXp: achievementXP,
        totalXp: baseXpEarned + achievementXP,
        newAchievements: newAchievements,
        levelUp: updated.level > prevLvl ? updated.level : null,
      });

      return updated;
    });
  }, []);

  const saveDraft = useCallback((scenarioId: string, draft: string) => {
    setProgress(prev => {
      if (!prev) return prev;
      const updated = {
        ...prev,
        draftResponses: { ...prev.draftResponses, [scenarioId]: draft },
      };
      saveProgress(updated);
      return updated;
    });
  }, []);

  const getDraft = useCallback((scenarioId: string): string => {
    return progress?.draftResponses[scenarioId] || '';
  }, [progress]);

  const isScenarioCompleted = useCallback((scenarioId: string): boolean => {
    return progress?.completedScenarios.some(c => c.scenarioId === scenarioId) ?? false;
  }, [progress]);

  const getNewAchievements = useCallback((): string[] => {
    if (!progress) return [];
    return achievements
      .filter(a => !progress.earnedAchievements.includes(a.id) && a.condition(progress))
      .map(a => a.id);
  }, [progress]);

  return {
    progress,
    isLoaded,
    completeScenario,
    saveDraft,
    getDraft,
    isScenarioCompleted,
    getNewAchievements,
    lastReward,
    clearLastReward,
  };
}
