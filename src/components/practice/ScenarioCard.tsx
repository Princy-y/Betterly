'use client';

import Link from 'next/link';
import { Clock, Zap, CheckCircle2 } from 'lucide-react';
import { Scenario } from '@/types';

interface Props {
  scenario: Scenario;
  completed?: boolean;
}

const difficultyStyle: Record<string, { bg: string; text: string; border: string }> = {
  Easy:   { bg: 'bg-[#EDF2E8]', text: 'text-[#3A6B35]', border: 'border-[#D0DFC8]/50' },
  Medium: { bg: 'bg-[#FFF8EC]', text: 'text-[#B07D2A]', border: 'border-[#FFF8EC]' },
  Hard:   { bg: 'bg-[#FDEEF0]', text: 'text-[#9B2A2A]', border: 'border-[#FDEEF0]' },
};

export default function ScenarioCard({ scenario, completed }: Props) {
  const diff = difficultyStyle[scenario.difficulty] || difficultyStyle.Easy;

  return (
    <Link href={`/practice/${scenario.id}`} className="block no-underline">
      <div 
        className="bg-white border border-[#D0DFC8] rounded-[14px] px-[24px] py-[20px] flex flex-col gap-4 group transition-all duration-250 ease-out hover:-translate-y-[2px] hover:shadow-[0_4px_16px_rgba(58,107,53,0.08)]"
      >
        {/* Header (Title & Completed check) */}
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1.5 flex-1">
            <h3 className="font-sans font-semibold text-[16px] text-[#141F12] group-hover:text-[#3A6B35] transition-colors leading-snug no-underline">
              {scenario.title}
            </h3>
            <p className="text-[14px] text-[#3D4F38] mt-[6px] leading-relaxed font-sans line-clamp-2">
              {scenario.description}
            </p>
          </div>
          {completed && (
            <div className="flex items-center gap-1 text-[#3A6B35] font-sans font-bold text-[10px] uppercase tracking-wider bg-[#EDF2E8] px-2 py-0.5 border border-[#D0DFC8]/50 rounded-[6px] flex-shrink-0">
              <CheckCircle2 size={11} />
              <span>Cleared</span>
            </div>
          )}
        </div>

        {/* Bottom row (Flex between) */}
        <div className="flex items-center justify-between pt-3 border-t border-[#D0DFC8]/40">
          {/* Left: Category Pill + Time + XP */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[12px] font-sans font-semibold text-[#3A6B35] bg-[#EDF2E8] px-[10px] py-[4px] rounded-full border border-[#D0DFC8]/40">
              {scenario.category}
            </span>
            
            {scenario.timeLimit && (
              <span className="flex items-center gap-0.5 text-[11px] font-sans font-medium text-[#3D4F38]/80 bg-[#F7F9F5] border border-[#D0DFC8]/30 px-2 py-[3px] rounded-[6px]">
                <Clock size={11} className="text-[#3A6B35]" />
                <span>{Math.floor(scenario.timeLimit / 60)}m</span>
              </span>
            )}
            
            <span className="flex items-center gap-0.5 text-[11px] font-sans font-bold text-[#3A6B35] bg-[#F7F9F5] border border-[#D0DFC8]/30 px-2 py-[3px] rounded-[6px]">
              <Zap size={11} className="fill-[#3A6B35] text-[#3A6B35]" />
              <span>+{scenario.xpReward} XP</span>
            </span>
          </div>

          {/* Right: Difficulty badge */}
          <span className={`text-[11px] font-sans font-bold uppercase tracking-wider px-[10px] py-[4px] rounded-full border ${diff.bg} ${diff.text} ${diff.border}`}>
            {scenario.difficulty}
          </span>
        </div>
      </div>
    </Link>
  );
}
