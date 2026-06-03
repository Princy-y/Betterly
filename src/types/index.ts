export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export type Category =
  | 'Communication'
  | 'Confidence'
  | 'Interview'
  | 'Social'
  | 'Critical Thinking'
  | 'Emotional Intelligence';

export interface Scenario {
  id: string;
  title: string;
  category: Category;
  difficulty: Difficulty;
  description: string;
  prompt: string;
  tips: string[];
  timeLimit?: number; // seconds
  xpReward: number;
  icon: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  condition: (progress: UserProgress) => boolean;
  xpReward: number;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
}

export interface CompletedScenario {
  scenarioId: string;
  response: string;
  completedAt: string;
  xpEarned: number;
}

export interface UserProgress {
  xp: number;
  level: number;
  streak: number;
  lastPracticeDate: string | null;
  completedScenarios: CompletedScenario[];
  earnedAchievements: string[];
  totalPracticeTime: number; // minutes
  draftResponses: Record<string, string>;
}

export interface LevelInfo {
  level: number;
  title: string;
  xpRequired: number;
  xpForNext: number;
  progress: number; // 0-100
}
