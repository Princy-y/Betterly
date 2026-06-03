import { Achievement } from '@/types';
import { Lock } from 'lucide-react';

interface Props {
  achievement: Achievement;
  earned: boolean;
}

const rarityGlow: Record<string, string> = {
  Common:    'hover:shadow-[0_0_20px_rgba(148,163,184,0.15)]',
  Rare:      'hover:shadow-[0_0_20px_rgba(99,102,241,0.25)]',
  Epic:      'hover:shadow-[0_0_25px_rgba(139,92,246,0.3)]',
  Legendary: 'hover:shadow-[0_0_30px_rgba(245,158,11,0.35)]',
};

const rarityBorder: Record<string, string> = {
  Common:    'border-white/[0.06]',
  Rare:      'border-indigo-500/20',
  Epic:      'border-purple-500/25',
  Legendary: 'border-amber-500/30',
};

export default function AchievementCard({ achievement, earned }: Props) {
  return (
    <div className={`glass rounded-2xl p-4 flex items-start gap-3 border transition-all duration-300
      ${rarityBorder[achievement.rarity]} ${rarityGlow[achievement.rarity]}
      ${ !earned ? 'opacity-50 grayscale' : '' }`}
    >
      {/* Icon */}
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 relative
        ${ earned ? 'glass-strong' : 'bg-white/[0.03]' }`}
      >
        {earned ? achievement.icon : <Lock size={18} className="text-slate-600" />}
        {earned && achievement.rarity === 'Legendary' && (
          <div className="absolute inset-0 rounded-xl animate-pulse-slow bg-amber-500/10" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <h3 className={`font-outfit font-semibold text-sm ${ earned ? 'text-white' : 'text-slate-500' }`}>
            {achievement.title}
          </h3>
          <span className={`text-xs px-1.5 py-0.5 rounded-full badge-${achievement.rarity.toLowerCase()}`}>
            {achievement.rarity}
          </span>
        </div>
        <p className="text-xs text-slate-500 leading-relaxed">{achievement.description}</p>
        {earned && (
          <p className="text-xs text-amber-400 mt-1 font-medium">+{achievement.xpReward} XP earned</p>
        )}
      </div>
    </div>
  );
}
