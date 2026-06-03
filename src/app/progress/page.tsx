'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import GlassCard from '@/components/ui/GlassCard';
import XPBar from '@/components/ui/XPBar';
import { useProgress } from '@/hooks/useProgress';
import { getLevelInfo } from '@/lib/xp';
import { scenarios } from '@/data/scenarios';
import { Category } from '@/types';
import { Zap, Flame, Target, Clock } from 'lucide-react';

const categoryEmoji: Record<string, string> = {
  'Communication':          '🗣️',
  'Confidence':             '💪',
  'Interview':              '💼',
  'Social':                 '🌐',
  'Critical Thinking':      '🧠',
  'Emotional Intelligence': '❤️',
};

const categoryColors: Record<string, string> = {
  'Communication':          'from-indigo-500 to-purple-600',
  'Confidence':             'from-purple-500 to-pink-600',
  'Interview':              'from-cyan-500 to-indigo-600',
  'Social':                 'from-pink-400 to-purple-600',
  'Critical Thinking':      'from-amber-500 to-orange-600',
  'Emotional Intelligence': 'from-emerald-500 to-cyan-600',
};

const categories: Category[] = [
  'Communication', 'Confidence', 'Interview',
  'Social', 'Critical Thinking', 'Emotional Intelligence',
];

export default function ProgressPage() {
  const { progress, isLoaded } = useProgress();

  if (!isLoaded || !progress) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center h-[80vh]">
          <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  const levelInfo = getLevelInfo(progress.xp);
  const uniqueCompleted = new Set(progress.completedScenarios.map(c => c.scenarioId)).size;
  const totalAttempts = progress.completedScenarios.length;

  // Category breakdown
  const categoryStats = categories.map(cat => {
    const catScenarios = scenarios.filter(s => s.category === cat);
    const completedInCat = catScenarios.filter(s =>
      progress.completedScenarios.some(c => c.scenarioId === s.id)
    ).length;
    return { cat, total: catScenarios.length, completed: completedInCat };
  });

  // Recent 14 days for activity heatmap
  const last14Days = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (13 - i));
    const dateStr = d.toDateString();
    const count = progress.completedScenarios.filter(
      c => new Date(c.completedAt).toDateString() === dateStr
    ).length;
    return { date: d, count };
  });

  return (
    <div className="min-h-screen bg-[#03030d]">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 font-sans">
          <h1 className="font-serif text-3xl sm:text-4xl text-[#141F12] mb-2">
            Your <span className="text-[#3A6B35] organic-underline">Progress</span>
          </h1>
          <p className="text-[#3D4F38] text-sm">Track your growth across all skill areas.</p>
        </motion.div>

        {/* Stats summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8"
        >
          {[
            { icon: Zap,    label: 'Total XP',     value: progress.xp.toLocaleString(), color: 'text-amber-600' },
            { icon: Flame,  label: 'Best Streak',  value: `${progress.streak}d`,         color: 'text-orange-600' },
            { icon: Target, label: 'Completed',    value: uniqueCompleted,               color: 'text-emerald-700' },
            { icon: Clock,  label: 'Total Sessions', value: totalAttempts,               color: 'text-cyan-700' },
          ].map(({ icon: Icon, label, value, color }) => (
            <GlassCard key={label} className="p-4 border-[#D0DFC8]">
              <Icon size={16} className={`${color} mb-2`} />
              <div className={`font-serif text-2xl ${color}`}>{value}</div>
              <div className="text-xs text-[#3D4F38] mt-0.5">{label}</div>
            </GlassCard>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Level progress */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <GlassCard className="p-6 border-[#D0DFC8]">
              <h2 className="font-serif font-bold text-[#141F12] text-lg mb-5">Level Progress</h2>
              <XPBar levelInfo={levelInfo} />
              <p className="text-xs text-[#3D4F38] mt-3 font-semibold">
                {levelInfo.xpForNext - progress.xp} XP to reach Level {levelInfo.level + 1}
              </p>
            </GlassCard>
          </motion.div>

          {/* Activity heatmap */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <GlassCard className="p-6 border-[#D0DFC8]">
              <h2 className="font-serif font-bold text-[#141F12] text-lg mb-5">Last 14 Days</h2>
              <div className="flex gap-2 flex-wrap">
                {last14Days.map(({ date, count }, i) => (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <div
                      className="w-8 h-8 rounded-lg transition-all"
                      style={{
                        background: count === 0
                          ? 'rgba(255,255,255,0.04)'
                          : count === 1
                            ? 'rgba(99,102,241,0.4)'
                            : count === 2
                              ? 'rgba(99,102,241,0.65)'
                              : 'rgba(99,102,241,0.9)',
                        boxShadow: count > 0 ? '0 0 8px rgba(99,102,241,0.3)' : 'none',
                      }}
                      title={`${date.toLocaleDateString()}: ${count} sessions`}
                    />
                    <span className="text-xs text-slate-600">
                      {date.toLocaleDateString('en', { weekday: 'narrow' })}
                    </span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </div>

        {/* Category breakdown */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="mt-6">
          <GlassCard className="p-6 border-[#D0DFC8]">
            <h2 className="font-serif font-bold text-[#141F12] text-lg mb-6">Skills Breakdown</h2>
            <div className="space-y-5">
              {categoryStats.map(({ cat, total, completed }) => {
                const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
                return (
                  <div key={cat}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span>{categoryEmoji[cat]}</span>
                        <span className="text-sm text-slate-300 font-medium">{cat}</span>
                      </div>
                      <span className="text-xs text-slate-500">{completed}/{total}</span>
                    </div>
                    <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.3 }}
                        className={`h-full rounded-full bg-gradient-to-r ${categoryColors[cat]}`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </GlassCard>
        </motion.div>
      </main>
    </div>
  );
}
