'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import StatsRow from '@/components/dashboard/StatsRow';
import GlassCard from '@/components/ui/GlassCard';
import XPBar from '@/components/ui/XPBar';
import { useProgress } from '@/hooks/useProgress';
import { getLevelInfo } from '@/lib/xp';
import { getTodayChallenge } from '@/data/scenarios';
import { scenarios } from '@/data/scenarios';
import { achievements } from '@/data/achievements';
import { Zap, ArrowRight, Clock, Star, Compass } from 'lucide-react';

const difficultyStyle: Record<string, { bg: string; text: string; border: string }> = {
  Easy:   { bg: 'bg-[#EDF2E8]', text: 'text-[#3A6B35]', border: 'border-[#D0DFC8]/60' },
  Medium: { bg: 'bg-[#FFF8EC]', text: 'text-[#B07D2A]', border: 'border-[#FFF8EC]' },
  Hard:   { bg: 'bg-[#FDEEF0]', text: 'text-[#9B2A2A]', border: 'border-[#FDEEF0]' },
};

const categoryColors: Record<string, string> = {
  'Communication':          'bg-[#EDF2E8] border-[#D0DFC8] text-[#3A6B35]',
  'Confidence':             'bg-[#EDF2E8] border-[#D0DFC8] text-[#3A6B35]',
  'Interview':              'bg-[#EDF2E8] border-[#D0DFC8] text-[#3A6B35]',
  'Social':                 'bg-[#EDF2E8] border-[#D0DFC8] text-[#3A6B35]',
  'Critical Thinking':      'bg-[#EDF2E8] border-[#D0DFC8] text-[#3A6B35]',
  'Emotional Intelligence': 'bg-[#EDF2E8] border-[#D0DFC8] text-[#3A6B35]',
};

export default function DashboardPage() {
  const { progress, isLoaded } = useProgress();

  if (!isLoaded || !progress) {
    return (
      <div className="min-h-screen bg-[#F7F9F5] relative">
        <Navbar />
        <div className="flex items-center justify-center h-[80vh]">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-2 border-[#3A6B35] border-t-transparent rounded-full animate-spin shadow-sm" />
            <span className="text-xs text-[#3D4F38] font-sans font-bold uppercase tracking-widest animate-pulse">Entering Chamber</span>
          </div>
        </div>
      </div>
    );
  }

  const levelInfo = getLevelInfo(progress.xp);
  const todayChallenge = getTodayChallenge();
  const recentActivity = [...progress.completedScenarios]
    .reverse()
    .slice(0, 4)
    .map(c => ({ ...c, scenario: scenarios.find(s => s.id === c.scenarioId) }));
  const earnedCount = progress.earnedAchievements.length;
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  
  const todayDone = progress.completedScenarios.some(
    c => c.scenarioId === todayChallenge.id &&
      new Date(c.completedAt).toDateString() === new Date().toDateString()
  );

  return (
    <div className="min-h-screen bg-[#F7F9F5] relative overflow-hidden pb-16">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 relative z-10 font-sans">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div>
            <h1 className="font-serif text-4xl sm:text-5xl text-[#141F12] tracking-tight leading-none mb-2">
              {greeting}, <span className="text-[#3A6B35] organic-underline">{levelInfo.title}</span>.
            </h1>
            <p className="text-[#3D4F38] text-sm max-w-md">
              {progress.streak > 0
                ? `You have fueled a ${progress.streak}-day streak! Keep up the practice today.`
                : 'Complete a scenario today to light your learning streak!'}
            </p>
          </div>

          <Link
            href="/practice"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-[8px] bg-white border border-[#D0DFC8] text-[#3A6B35] hover:bg-[#EDF2E8] font-sans text-sm font-bold shadow-sm transition-all"
          >
            <Compass size={14} />
            Explore Scenarios
          </Link>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="mb-10"
        >
          <StatsRow progress={progress} />
        </motion.div>

        {/* 2x2 Grid Columns */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Grid (Left 8-cols) */}
          <div className="lg:col-span-8 space-y-[24px]">
            
            {/* Daily Challenge with Spotlight Outline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div 
                className="bg-white border-y border-r border-[#D0DFC8] border-l-4 border-l-[#3A6B35] rounded-[16px] overflow-hidden shadow-[0_8px_32px_rgba(58,107,53,0.10)] transition-all duration-250 hover:shadow-[0_8px_32px_rgba(58,107,53,0.15)]"
              >
                <div className="p-6 sm:p-8">
                  <div className="flex flex-wrap items-center gap-2 mb-6">
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-[8px] bg-[#EDF2E8] border border-[#D0DFC8]/50 text-[#3A6B35] text-[10px] uppercase font-sans font-bold tracking-widest">
                      <Star size={10} className="fill-[#3A6B35]" />
                      <span>Daily Challenge</span>
                    </div>
                    {todayDone && (
                      <span className="text-[10px] uppercase font-sans font-bold tracking-widest bg-[#EDF2E8] text-[#3A6B35] border border-[#D0DFC8]/50 px-3 py-1 rounded-[8px] ml-auto">
                        ✓ Cleared Today
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row items-start gap-6">
                    <div className={`w-16 h-16 rounded-[16px] flex-shrink-0 flex items-center justify-center text-3xl border border-[#D0DFC8]/50 bg-[#EDF2E8] text-[#3A6B35]`}>
                      {todayChallenge.icon}
                    </div>

                    <div className="flex-1 space-y-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-serif font-bold text-2xl text-[#141F12] tracking-tight">{todayChallenge.title}</h3>
                        {(() => {
                          const diff = difficultyStyle[todayChallenge.difficulty] || difficultyStyle.Easy;
                          return (
                            <span className={`text-[10px] uppercase font-sans font-bold tracking-wider px-2 py-0.5 rounded-[8px] border ${diff.bg} ${diff.text} ${diff.border}`}>
                              {todayChallenge.difficulty}
                            </span>
                          );
                        })()}
                      </div>

                      <p className="text-sm text-[#3D4F38] leading-relaxed max-w-xl">
                        {todayChallenge.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-5 pt-3 border-t border-[#D0DFC8]/40 text-xs">
                        <span className="flex items-center gap-1 text-[#3A6B35] font-bold">
                          <Zap size={13} /> +{todayChallenge.xpReward} XP
                        </span>
                        {todayChallenge.timeLimit && (
                          <span className="flex items-center gap-1 text-[#3D4F38]">
                            <Clock size={13} /> {Math.floor(todayChallenge.timeLimit / 60)} min limit
                          </span>
                        )}
                        <Link
                          href={`/practice/${todayChallenge.id}`}
                          className="ml-auto inline-flex items-center gap-1 font-sans font-bold text-sm text-[#3A6B35] hover:text-[#3A6B35]/80 hover:underline transition-colors"
                        >
                          {todayDone ? 'Practice Again' : 'Start Mission'}
                          <ArrowRight size={14} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Level progress metrics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <GlassCard glow="none" className="p-6 border-[#D0DFC8]">
                <div className="mb-4">
                  <h2 className="font-serif font-semibold text-[#141F12] text-[18px] mb-[4px]">Rank Advancement</h2>
                  <p className="text-[11px] text-[#3D4F38] font-sans font-bold uppercase tracking-widest opacity-75">Clear challenges to advance ranks</p>
                </div>
                
                <XPBar levelInfo={levelInfo} xp={progress.xp} />
                
                <div className="flex justify-between text-xs text-[#3D4F38] mt-4 pt-3 border-t border-[#D0DFC8]/40">
                  <span>{progress.xp} Total XP secured</span>
                  <span className="text-[#3A6B35] font-bold">{levelInfo.xpForNext - progress.xp} XP until Level {levelInfo.level + 1}</span>
                </div>
              </GlassCard>
            </motion.div>

            {/* Cosmic Logs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <GlassCard glow="none" className="p-6 border-[#D0DFC8]">
                <h2 className="font-serif font-semibold text-[#141F12] text-[18px] mb-[16px]">Cosmic Reflection Logs</h2>
                {recentActivity.length === 0 ? (
                  <div className="flex flex-col items-center justify-center text-center gap-1.5 h-[120px] max-h-[120px]">
                    <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '32px', height: '32px' }} className="text-[#8BBF7A]" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                      <path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z" />
                      <path d="M16 3v4" />
                      <path d="M8 3v4" />
                      <path d="M4 11h16" />
                      <path d="M11 15h1" />
                      <path d="M12 15v3" />
                    </svg>
                    <p className="text-[13px] text-[#3D4F38] font-sans font-medium">No sessions yet</p>
                    <Link href="/practice" className="text-[#3A6B35] font-sans font-bold text-[12px] hover:underline hover:text-[#3A6B35]/80 transition-colors">
                      Start your first session →
                    </Link>
                  </div>
                ) : (
                  <div className="grid gap-3 sm:grid-cols-2">
                    {recentActivity.map((a, i) => a.scenario && (
                      <Link 
                        key={i} 
                        href={`/practice/${a.scenarioId}`}
                        className="flex items-center gap-3 p-3.5 rounded-[16px] border border-[#D0DFC8] bg-white hover:bg-[#EDF2E8]/40 hover:border-[#3A6B35] transition-all group"
                      >
                        <span className="text-2xl bg-[#EDF2E8] w-10 h-10 rounded-[8px] border border-[#D0DFC8]/50 flex items-center justify-center">{a.scenario.icon}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-[#141F12] font-semibold truncate">{a.scenario.title}</p>
                          <p className="text-[10px] text-[#3D4F38] mt-0.5">{a.scenario.category}</p>
                        </div>
                        <div className="flex items-center gap-0.5 text-xs text-[#3A6B35] font-bold ml-2">
                          <Zap size={11} />+{a.xpEarned}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </GlassCard>
            </motion.div>

          </div>

          {/* Right sidebar column (4-cols) */}
          <div className="lg:col-span-4 space-y-[24px]">
            
            {/* Streak flame card - Pulsing Green dot animation */}
            <motion.div
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <GlassCard className="p-6 text-center border-[#D0DFC8]" glow="purple">
                <div className="w-16 h-16 rounded-full bg-[#EDF2E8] flex items-center justify-center mx-auto mb-4 border border-[#D0DFC8] relative shadow-sm">
                  <span className="relative flex h-5 w-5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3A6B35] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-5 w-5 bg-[#3A6B35]"></span>
                  </span>
                </div>
                <div className="font-serif text-5xl text-[#3A6B35] leading-none mb-1.5">
                  {progress.streak}
                </div>
                <p className="text-[#3D4F38] font-sans text-xs uppercase tracking-wider font-bold">
                  {progress.streak === 1 ? '1 day streak active' : `${progress.streak} day streak active`}
                </p>
                {progress.streak === 0 ? (
                  <p className="text-[10px] text-[#3D4F38] mt-2">Ignite your streak today by completing a task.</p>
                ) : (
                  <p className="text-[10px] text-[#3A6B35] mt-2 font-bold animate-pulse">Your learning streak is actively glowing!</p>
                )}
              </GlassCard>
            </motion.div>

            {/* Achievements badge grid */}
            <motion.div
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
            >
              <GlassCard className="p-6 border-[#D0DFC8]" glow="purple">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-serif font-semibold text-[#141F12] text-[18px]">Unlocked Badges</h2>
                  <Link href="/achievements" className="text-xs text-[#3A6B35] hover:text-[#3A6B35]/80 font-bold hover:underline">
                    View All
                  </Link>
                </div>
                
                <div className="flex items-end gap-2 mb-4 font-sans">
                  <span className="font-serif text-4xl text-[#3A6B35] leading-none">
                    {earnedCount}
                  </span>
                  <span className="text-[10px] text-[#3D4F38] font-bold uppercase tracking-widest mb-1">
                    of {achievements.length} earned
                  </span>
                </div>

                <div className="h-2 bg-[#EDF2E8] border border-[#D0DFC8] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#3A6B35] rounded-full transition-all duration-500"
                    style={{ width: `${(earnedCount / achievements.length) * 100}%` }}
                  />
                </div>

                <div className="flex gap-3 mt-5 flex-wrap">
                  {achievements.slice(0, 5).map((a) => {
                    const isEarned = progress.earnedAchievements.includes(a.id);
                    if (isEarned) {
                      return (
                        <span key={a.id} className="text-2xl bg-white w-12 h-12 rounded-full border border-[#D0DFC8] flex items-center justify-center shadow-sm" title={a.title}>
                          {a.icon}
                        </span>
                      );
                    }
                    return (
                      <div key={a.id} className="w-12 h-12 rounded-full bg-[#EDF2E8] border border-[#D0DFC8]/50 flex items-center justify-center text-[#3D4F38]" title={`Locked: ${a.title}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#3D4F38]/60" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                          <path d="M5 11m0 2a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2z" />
                          <path d="M12 16m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                          <path d="M8 11v-4a4 4 0 0 1 8 0v4" />
                        </svg>
                      </div>
                    );
                  })}
                </div>
              </GlassCard>
            </motion.div>

            {/* Quick Practice jump */}
            <motion.div
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Link href="/practice">
                <GlassCard glow="purple" hoverFloat className="p-6 border-[#D0DFC8] cursor-pointer">
                  <h2 className="font-serif font-semibold text-[#141F12] text-[18px] mb-[12px]">Practice Chamber</h2>
                  <p className="text-xs text-[#3D4F38] leading-relaxed mb-4">Pick a scenario from any category and start building your communication power immediately.</p>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-[#3A6B35]">
                    Browse categories <ArrowRight size={12} />
                  </span>
                </GlassCard>
              </Link>
            </motion.div>

          </div>

        </div>

      </main>
    </div>
  );
}
