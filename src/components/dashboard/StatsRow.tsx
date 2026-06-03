import { Zap, Flame, Trophy, CheckCircle } from 'lucide-react';
import { UserProgress } from '@/types';
import { getLevelInfo } from '@/lib/xp';

interface Props {
  progress: UserProgress;
}

export default function StatsRow({ progress }: Props) {
  const levelInfo = getLevelInfo(progress.xp);
  const uniqueCompleted = new Set(progress.completedScenarios.map(c => c.scenarioId)).size;

  const stats = [
    {
      icon: Zap,
      label: 'Total XP',
      value: progress.xp.toLocaleString(),
    },
    {
      icon: Flame,
      label: 'Day Streak',
      value: `${progress.streak} Days`,
    },
    {
      icon: Trophy,
      label: 'Cosmic Rank',
      value: `Lvl ${levelInfo.level}`,
    },
    {
      icon: CheckCircle,
      label: 'Completed',
      value: `${uniqueCompleted} Scenarios`,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-[12px]">
      {stats.map(({ icon: Icon, label, value }) => (
        <div 
          key={label} 
          className="bg-[#EDF2E8] border border-[#D0DFC8]/50 rounded-[12px] px-[20px] py-[16px] flex flex-col justify-between shadow-sm transition-all hover:scale-[1.01]"
        >
          {/* Label on top with icon left of label */}
          <div className="flex items-center gap-2 mb-2">
            <Icon size={15} className="text-[#3A6B35]" />
            <span className="text-[11px] text-[#3D4F38] font-bold font-sans tracking-wide uppercase opacity-80">{label}</span>
          </div>
          {/* Large bold value below */}
          <div className="font-serif text-[24px] font-bold text-[#141F12] leading-none">{value}</div>
        </div>
      ))}
    </div>
  );
}
