import { UserProgress, LevelInfo } from '@/types';

// XP required to reach each level (cumulative)
export function xpForLevel(level: number): number {
  return Math.floor(100 * Math.pow(level, 1.5));
}

export function getLevelFromXP(xp: number): number {
  let level = 1;
  while (xpForLevel(level + 1) <= xp) level++;
  return Math.min(level, 50);
}

export function getLevelInfo(xp: number): LevelInfo {
  const level = getLevelFromXP(xp);
  const xpRequired = xpForLevel(level);
  const xpForNext = xpForLevel(level + 1);
  const xpIntoLevel = xp - xpRequired;
  const xpNeeded = xpForNext - xpRequired;
  const progress = Math.min(100, Math.round((xpIntoLevel / xpNeeded) * 100));

  const titles = [
    '', 'Beginner', 'Novice', 'Learner', 'Practitioner', 'Communicator',
    'Speaker', 'Conversationalist', 'Influencer', 'Leader', 'Expert',
    'Master', 'Guru', 'Champion', 'Legend', 'Icon',
  ];

  return {
    level,
    title: titles[Math.min(level, titles.length - 1)],
    xpRequired,
    xpForNext,
    progress,
  };
}

export function updateStreak(progress: UserProgress): UserProgress {
  const today = new Date().toDateString();
  const last = progress.lastPracticeDate;

  if (last === today) return progress; // already practiced today

  const yesterday = new Date(Date.now() - 86400000).toDateString();
  const newStreak = last === yesterday ? progress.streak + 1 : 1;

  return { ...progress, streak: newStreak, lastPracticeDate: today };
}
