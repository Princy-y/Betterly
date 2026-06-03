'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import ScenarioCard from '@/components/practice/ScenarioCard';
import CategoryFilter from '@/components/practice/CategoryFilter';
import { useProgress } from '@/hooks/useProgress';
import { scenarios } from '@/data/scenarios';

export default function PracticePage() {
  const [category, setCategory] = useState('All');
  const [difficulty, setDifficulty] = useState('All');
  const [search, setSearch] = useState('');
  const { progress, isLoaded } = useProgress();

  const filtered = useMemo(() => {
    return scenarios.filter(s => {
      if (category !== 'All' && s.category !== category) return false;
      if (difficulty !== 'All' && s.difficulty !== difficulty) return false;
      if (search && !s.title.toLowerCase().includes(search.toLowerCase()) &&
          !s.description.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [category, difficulty, search]);

  if (!isLoaded || !progress) {
    return (
      <div className="min-h-screen bg-[#F7F9F5] relative">
        <Navbar />
        <div className="flex flex-col items-center justify-center h-[80vh] gap-3">
          <div className="w-10 h-10 border-2 border-[#3A6B35] border-t-transparent rounded-full animate-spin shadow-sm" />
          <span className="text-xs text-[#3D4F38] font-sans font-bold uppercase tracking-widest animate-pulse">Synchronizing Cosmos</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F9F5] pb-16">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10 font-sans">
        
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <h1 className="font-serif text-[28px] font-bold leading-tight mb-2">
            <span className="text-[#3D4F38]">Practice</span>{' '}
            <span className="text-[#3A6B35]">Scenarios</span>
          </h1>
          <p className="text-[#3D4F38] text-[15px] leading-relaxed max-w-lg font-sans">
            Choose from our handcrafted situations to build emotional control, communication skills, and critical reflection.
          </p>
        </motion.div>

        {/* Filters Panel */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4 mb-8"
        >
          {/* Search bar */}
          <div className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-4 top-1/2 -translate-y-1/2" width="18" height="18" viewBox="0 0 24 24" strokeWidth="1.8" stroke="#8BBF7A" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
              <path d="M21 21l-6 -6" />
            </svg>
            
            <input
              type="text"
              placeholder="Search scenarios by title or description..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-white border border-[#D0DFC8] rounded-[10px] pl-11 pr-[16px] py-[10px] text-[14px] text-[#141F12] placeholder-[#3D4F38]/40 focus:border-[#3A6B35] transition-colors focus:outline-none shadow-sm font-sans"
            />
          </div>

          {/* Category Filter Pills (Wrapping grid) */}
          <CategoryFilter active={category} onChange={setCategory} />

          {/* Difficulty Toggles (Second Row) */}
          <div className="flex flex-wrap gap-[8px] items-center mt-2.5">
            {['All', 'Easy', 'Medium', 'Hard'].map(d => (
              <button
                key={d}
                onClick={() => setDifficulty(d)}
                className={`px-[12px] py-[4px] rounded-full text-[13px] font-sans font-semibold transition-all border border-[#D0DFC8]/40
                  ${ difficulty === d
                    ? 'bg-[#3A6B35] text-white border-[#3A6B35] shadow-sm'
                    : 'bg-[#EDF2E8] text-[#3D4F38] hover:bg-[#D0DFC8]/50 hover:text-[#3A6B35]'
                  }`}
              >
                {d}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Muted count badge */}
        <div className="mb-4">
          <span className="inline-block text-[12px] text-[#3D4F38]/60 font-sans font-bold bg-[#EDF2E8] border border-[#D0DFC8]/50 px-[10px] py-[4px] rounded-[8px] uppercase tracking-wide">
            {filtered.length} scenario{filtered.length !== 1 ? 's' : ''} found
          </span>
        </div>

        {/* Grid layout (2 columns on desktop, 1 column on mobile) */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 bg-white/40 border border-[#D0DFC8]/50 rounded-[16px] p-6 shadow-sm">
            <p className="text-slate-500 text-sm">No scenarios match your filter options.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
              >
                <ScenarioCard
                  scenario={s}
                  completed={isLoaded ? progress?.completedScenarios.some(c => c.scenarioId === s.id) : false}
                />
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
