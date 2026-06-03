'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import AchievementCard from '@/components/achievements/AchievementCard';
import { useProgress } from '@/hooks/useProgress';
import { achievements } from '@/data/achievements';
import { Trophy } from 'lucide-react';

export default function AchievementsPage() {
  const { progress, isLoaded } = useProgress();

  if (!isLoaded || !progress) {
    return (
      <div className="min-h-screen bg-[#03030d] relative">
        <Navbar />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/5 to-cyan-900/5 backdrop-blur-sm pointer-events-none" />
        <div className="flex flex-col items-center justify-center h-[80vh] relative z-10 gap-3">
          <div className="w-10 h-10 border-2 border-purple-500 border-t-transparent rounded-full animate-spin shadow-[0_0_15px_rgba(139,92,246,0.3)]" />
          <span className="text-xs text-slate-500 font-outfit uppercase tracking-widest animate-pulse">Polishing Badges</span>
        </div>
      </div>
    );
  }

  const earned = progress.earnedAchievements || [];
  const earnedAchievements = achievements.filter(a => earned.includes(a.id));
  const lockedAchievements = achievements.filter(a => !earned.includes(a.id));

  return (
    <div className="min-h-screen bg-[#03030d]">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 font-sans">
          <div className="flex items-center gap-3 mb-2">
            <Trophy size={28} className="text-[#3A6B35]" />
            <h1 className="font-serif text-3xl text-[#141F12]">
              Achievements
            </h1>
          </div>
          <p className="text-[#3D4F38] text-sm">
            {earned.length} of {achievements.length} badges earned
          </p>
          {/* Progress bar */}
          <div className="mt-4 h-2 bg-white/[0.06] rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(earned.length / achievements.length) * 100}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-amber-500 to-orange-400 rounded-full"
            />
          </div>
        </motion.div>

        {/* Earned */}
        {earnedAchievements.length > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="mb-10">
            <h2 className="font-outfit font-semibold text-sm text-emerald-400 uppercase tracking-wider mb-4">
              ✓ Earned ({earnedAchievements.length})
            </h2>
            <div className="space-y-3">
              {earnedAchievements.map((a, i) => (
                <motion.div
                  key={a.id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <AchievementCard achievement={a} earned />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Locked */}
        <div>
          <h2 className="font-outfit font-semibold text-sm text-slate-600 uppercase tracking-wider mb-4">
            Locked ({lockedAchievements.length})
          </h2>
          <div className="space-y-3">
            {lockedAchievements.map((a, i) => (
              <motion.div
                key={a.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.04 }}
              >
                <AchievementCard achievement={a} earned={false} />
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
