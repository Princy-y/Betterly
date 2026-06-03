'use client';

import { Category } from '@/types';

const categories: (Category | 'All')[] = [
  'All', 'Communication', 'Confidence', 'Interview',
  'Social', 'Critical Thinking', 'Emotional Intelligence',
];

interface Props {
  active: string;
  onChange: (cat: string) => void;
}

export default function CategoryFilter({ active, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-[8px] w-full">
      {categories.map(cat => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`px-[16px] py-[6px] rounded-full text-[13px] font-sans font-semibold transition-all duration-200 border border-[#D0DFC8]/40
            ${ active === cat
              ? 'bg-[#3A6B35] text-white border-[#3A6B35] shadow-sm'
              : 'bg-[#EDF2E8] text-[#3D4F38] hover:bg-[#D0DFC8]/50 hover:text-[#3A6B35]'
            }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
