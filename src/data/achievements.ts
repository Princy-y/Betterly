import { Achievement, UserProgress } from '@/types';

export const achievements: Achievement[] = [
  {
    id: 'first-step',
    title: 'First Step',
    description: 'Complete your first practice scenario',
    icon: '🌱',
    rarity: 'Common',
    xpReward: 50,
    condition: (p) => p.completedScenarios.length >= 1,
  },
  {
    id: 'on-fire',
    title: 'On Fire',
    description: 'Maintain a 3-day practice streak',
    icon: '🔥',
    rarity: 'Common',
    xpReward: 75,
    condition: (p) => p.streak >= 3,
  },
  {
    id: 'week-warrior',
    title: 'Week Warrior',
    description: 'Maintain a 7-day practice streak',
    icon: '⚔️',
    rarity: 'Rare',
    xpReward: 150,
    condition: (p) => p.streak >= 7,
  },
  {
    id: 'communicator',
    title: 'Communicator',
    description: 'Complete all Communication scenarios',
    icon: '🗣️',
    rarity: 'Rare',
    xpReward: 120,
    condition: (p) => {
      const ids = ['comm-1', 'comm-2', 'comm-3', 'comm-4'];
      return ids.every(id => p.completedScenarios.some(c => c.scenarioId === id));
    },
  },
  {
    id: 'interview-ready',
    title: 'Interview Ready',
    description: 'Complete all Interview scenarios',
    icon: '💼',
    rarity: 'Rare',
    xpReward: 120,
    condition: (p) => {
      const ids = ['intv-1', 'intv-2', 'intv-3', 'intv-4'];
      return ids.every(id => p.completedScenarios.some(c => c.scenarioId === id));
    },
  },
  {
    id: 'confident',
    title: 'Confidence Unlocked',
    description: 'Complete all Confidence scenarios',
    icon: '💪',
    rarity: 'Rare',
    xpReward: 120,
    condition: (p) => {
      const ids = ['conf-1', 'conf-2', 'conf-3', 'conf-4'];
      return ids.every(id => p.completedScenarios.some(c => c.scenarioId === id));
    },
  },
  {
    id: 'social-butterfly',
    title: 'Social Butterfly',
    description: 'Complete all Social scenarios',
    icon: '🦋',
    rarity: 'Rare',
    xpReward: 100,
    condition: (p) => {
      const ids = ['soc-1', 'soc-2', 'soc-3'];
      return ids.every(id => p.completedScenarios.some(c => c.scenarioId === id));
    },
  },
  {
    id: 'deep-thinker',
    title: 'Deep Thinker',
    description: 'Complete all Critical Thinking scenarios',
    icon: '🧩',
    rarity: 'Epic',
    xpReward: 180,
    condition: (p) => {
      const ids = ['crit-1', 'crit-2', 'crit-3'];
      return ids.every(id => p.completedScenarios.some(c => c.scenarioId === id));
    },
  },
  {
    id: 'emotionally-intelligent',
    title: 'Emotionally Intelligent',
    description: 'Complete all Emotional Intelligence scenarios',
    icon: '🌊',
    rarity: 'Epic',
    xpReward: 180,
    condition: (p) => {
      const ids = ['ei-1', 'ei-2', 'ei-3'];
      return ids.every(id => p.completedScenarios.some(c => c.scenarioId === id));
    },
  },
  {
    id: 'level-5',
    title: 'Rising Star',
    description: 'Reach Level 5',
    icon: '⭐',
    rarity: 'Common',
    xpReward: 100,
    condition: (p) => p.level >= 5,
  },
  {
    id: 'level-10',
    title: 'Skilled Communicator',
    description: 'Reach Level 10',
    icon: '🌟',
    rarity: 'Rare',
    xpReward: 200,
    condition: (p) => p.level >= 10,
  },
  {
    id: 'level-20',
    title: 'Master Communicator',
    description: 'Reach Level 20',
    icon: '👑',
    rarity: 'Epic',
    xpReward: 500,
    condition: (p) => p.level >= 20,
  },
  {
    id: 'completionist',
    title: 'Completionist',
    description: 'Complete all 20 scenarios',
    icon: '🏆',
    rarity: 'Legendary',
    xpReward: 1000,
    condition: (p) => {
      const uniqueCompleted = new Set(p.completedScenarios.map(c => c.scenarioId));
      return uniqueCompleted.size >= 20;
    },
  },
  {
    id: 'hard-mode',
    title: 'Hard Mode',
    description: 'Complete 5 Hard difficulty scenarios',
    icon: '🎯',
    rarity: 'Epic',
    xpReward: 300,
    condition: (p) => {
      const hardIds = ['comm-4', 'conf-2', 'intv-4', 'crit-2', 'crit-3', 'ei-3'];
      const uniqueHardCompleted = new Set(
        p.completedScenarios
          .map(c => c.scenarioId)
          .filter(id => hardIds.includes(id))
      );
      return uniqueHardCompleted.size >= 5;
    },
  },
  {
    id: 'xp-1000',
    title: 'XP Collector',
    description: 'Earn 1000 total XP',
    icon: '💎',
    rarity: 'Rare',
    xpReward: 100,
    condition: (p) => p.xp >= 1000,
  },
];
