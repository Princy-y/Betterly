'use client';

import { LevelInfo } from '@/types';

interface Props {
  levelInfo: LevelInfo;
  xp?: number;
  compact?: boolean;
}

export default function XPBar({ levelInfo, xp, compact = false }: Props) {
  const currentXp = xp !== undefined ? xp : levelInfo.xpRequired;

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-xs text-[#3D4F38] font-medium font-sans">Lv.{levelInfo.level}</span>
        <div className="flex-1 h-1.5 bg-[#D0DFC8] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#3A6B35] rounded-full transition-all duration-500"
            style={{ width: `${levelInfo.progress}%` }}
          />
        </div>
        <span className="text-xs text-[#3D4F38] font-sans">{levelInfo.progress}%</span>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center font-sans">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-[#3A6B35] bg-[#EDF2E8] px-2 py-0.5 rounded-[8px] border border-[#D0DFC8]/50">
            Level {levelInfo.level}
          </span>
          <span className="text-xs text-[#3D4F38]">{levelInfo.title}</span>
        </div>
        <span className="text-xs text-[#3D4F38]/60 font-sans font-medium">
          {currentXp} / {levelInfo.xpForNext} XP
        </span>
      </div>
      <div className="h-2 bg-[#D0DFC8] rounded-full overflow-hidden">
        <div
          className="h-full bg-[#3A6B35] rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${levelInfo.progress}%`,
          }}
        />
      </div>
    </div>
  );
}
