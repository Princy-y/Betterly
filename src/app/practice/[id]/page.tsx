'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';
import Timer from '@/components/practice/Timer';
import AIAssistPanel from '@/components/ai/AIAssistPanel';
import XPBar from '@/components/ui/XPBar';
import { useProgress } from '@/hooks/useProgress';
import { scenarios } from '@/data/scenarios';
import { achievements } from '@/data/achievements';
import { getLevelInfo } from '@/lib/xp';
import {
  ArrowLeft, ChevronDown, Zap, CheckCircle2, RotateCcw, Clock, Lightbulb
} from 'lucide-react';

const categoryColors: Record<string, string> = {
  'Communication':          'bg-[#EDF2E8] border-[#D0DFC8] text-[#3A6B35]',
  'Confidence':             'bg-[#EDF2E8] border-[#D0DFC8] text-[#3A6B35]',
  'Interview':              'bg-[#EDF2E8] border-[#D0DFC8] text-[#3A6B35]',
  'Social':                 'bg-[#EDF2E8] border-[#D0DFC8] text-[#3A6B35]',
  'Critical Thinking':      'bg-[#EDF2E8] border-[#D0DFC8] text-[#3A6B35]',
  'Emotional Intelligence': 'bg-[#EDF2E8] border-[#D0DFC8] text-[#3A6B35]',
};

const MIN_WORDS = 20;

export default function PracticeSessionPage() {
  const params   = useParams();
  const router   = useRouter();
  const id       = params?.id as string;
  const scenario = scenarios.find(s => s.id === id);

  const { 
    progress, 
    completeScenario, 
    saveDraft, 
    getDraft, 
    isLoaded, 
    lastReward, 
    clearLastReward 
  } = useProgress();
  
  const [response, setResponse]       = useState('');
  const [submitted, setSubmitted]     = useState(false);
  const [tipsOpen, setTipsOpen]       = useState(false);
  const [wordCount, setWordCount]     = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Load draft on mount
  useEffect(() => {
    if (isLoaded && scenario) {
      const draft = getDraft(scenario.id);
      if (draft) setResponse(draft);
    }
  }, [isLoaded, scenario, getDraft]);

  // Auto-save draft
  useEffect(() => {
    if (!scenario || submitted || !isLoaded) return;
    const timer = setTimeout(() => saveDraft(scenario.id, response), 800);
    return () => clearTimeout(timer);
  }, [response, scenario, submitted, saveDraft, isLoaded]);

  // Word count
  useEffect(() => {
    setWordCount(response.trim() ? response.trim().split(/\s+/).length : 0);
  }, [response]);

  // Reset reward summary state on unmount
  useEffect(() => {
    return () => {
      clearLastReward();
    };
  }, [clearLastReward]);

  if (!scenario) {
    return (
      <div className="min-h-screen bg-[#F7F9F5]">
        <Navbar />
        <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
          <p className="text-[#3D4F38] text-lg font-sans font-semibold">Scenario not found.</p>
          <Button variant="secondary" onClick={() => router.push('/practice')}>
            <ArrowLeft size={16} /> Back to Practice
          </Button>
        </div>
      </div>
    );
  }

  // Full Page loader to prevent draft race conditions
  if (!isLoaded || !progress) {
    return (
      <div className="min-h-screen bg-[#F7F9F5] relative">
        <Navbar />
        <div className="flex flex-col items-center justify-center h-[70vh] gap-3">
          <div className="w-10 h-10 border-2 border-[#3A6B35] border-t-transparent rounded-full animate-spin" />
          <span className="text-xs text-[#3D4F38] font-sans font-bold uppercase tracking-widest animate-pulse">Entering Chamber</span>
        </div>
      </div>
    );
  }

  const readyToSubmit = wordCount >= MIN_WORDS;

  const handleSubmit = () => {
    if (!readyToSubmit || submitted) return;
    completeScenario(scenario, response);
    setSubmitted(true);
  };

  const handleRetry = () => {
    setResponse('');
    setSubmitted(false);
    clearLastReward();
    textareaRef.current?.focus();
  };

  return (
    <div className="min-h-screen bg-[#F7F9F5] relative overflow-hidden pb-16">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 relative z-10 font-sans">
        
        {/* Back Button */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6">
          <Button variant="ghost" size="sm" onClick={() => router.push('/practice')}>
            <ArrowLeft size={15} /> Back to Scenarios
          </Button>
        </motion.div>

        {/* Scenario Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          <GlassCard className="p-6 mb-8 border-[#D0DFC8]" glow="purple">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              
              <div className={`w-16 h-16 rounded-[16px] border flex items-center justify-center text-3xl flex-shrink-0 ${categoryColors[scenario.category]}`}>
                {scenario.icon}
              </div>

              <div className="flex-1 space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs text-[#3D4F38] font-sans font-bold uppercase tracking-wider">{scenario.category}</span>
                  <span className="text-[#D0DFC8]">·</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-[8px] border uppercase tracking-wider font-sans font-bold ${
                    scenario.difficulty === 'Easy' ? 'badge-easy' : scenario.difficulty === 'Medium' ? 'badge-medium' : 'badge-hard'
                  }`}>
                    {scenario.difficulty}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-[#3A6B35] font-bold ml-auto">
                    <Zap size={13} /> +{scenario.xpReward} XP Reward
                  </span>
                </div>
                <h1 className="font-serif text-2xl text-[#141F12]">
                  {scenario.title}
                </h1>
                <p className="text-sm text-[#3D4F38] leading-relaxed max-w-2xl font-sans">
                  {scenario.description}
                </p>
              </div>

            </div>
          </GlassCard>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* Main Practice Chamber (Left 8-cols) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Challenge Prompt */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <GlassCard glow="none" className="p-6 border-[#D0DFC8]">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1 h-5 bg-[#3A6B35] rounded-full" />
                  <h2 className="font-serif font-bold text-[#141F12] text-sm uppercase tracking-wider">The Mission</h2>
                </div>
                <p className="text-[#3D4F38] leading-relaxed text-sm">{scenario.prompt}</p>
              </GlassCard>
            </motion.div>

            {/* Stable Timer */}
            {scenario.timeLimit && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
              >
                <Timer initialSeconds={scenario.timeLimit} />
              </motion.div>
            )}

            {/* Textarea Workspace */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <GlassCard glow="purple" className="overflow-hidden border-[#D0DFC8] shadow-[0_8px_32px_rgba(58,107,53,0.05)] focus-within:border-[#3A6B35]">
                <textarea
                  ref={textareaRef}
                  value={response}
                  onChange={e => setResponse(e.target.value)}
                  disabled={submitted}
                  placeholder="Draft your reply here... Deep breaths, speak authentically, and capture the scene."
                  className="w-full bg-transparent p-6 text-[#141F12] placeholder-[#3D4F38]/40 text-sm leading-relaxed resize-none min-h-[220px] focus:outline-none disabled:opacity-60 font-sans"
                />
                <div className="flex items-center justify-between px-6 py-4 border-t border-[#D0DFC8]/40 bg-[#EDF2E8]/30 text-xs">
                  <span className={`font-sans font-bold transition-colors duration-300 ${
                    wordCount >= MIN_WORDS ? 'text-[#3A6B35]' : 'text-slate-500'
                  }`}>
                    {wordCount} / {MIN_WORDS} words minimum required
                  </span>
                  <span className="text-slate-500 italic">Saved to Local Vault</span>
                </div>
              </GlassCard>
            </motion.div>

            {/* Actions / Interactive Celebration screen */}
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.div
                  key="submit"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex gap-3"
                >
                  <Button
                    onClick={handleSubmit}
                    disabled={!readyToSubmit}
                    size="lg"
                    className="flex-1 rounded-[8px]"
                  >
                    <CheckCircle2 size={18} />
                    Complete Practice Mission
                  </Button>
                  <Button variant="secondary" onClick={handleRetry} size="lg" className="rounded-[8px]">
                    <RotateCcw size={16} />
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <GlassCard className="p-8 text-center border-[#D0DFC8] bg-[#EDF2E8]/40 relative overflow-hidden" glow="none">
                    <div className="relative z-10 space-y-5">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1], rotate: [0, 8, -8, 0] }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl"
                      >
                        🔮
                      </motion.div>
                      
                      <div className="space-y-1">
                        <h3 className="font-serif font-bold text-2xl text-[#141F12] tracking-tight">
                          Chamber Cleared!
                        </h3>
                        <p className="text-[#3D4F38] text-sm">
                          You successfully completed <strong className="text-[#141F12]">{scenario.title}</strong>
                        </p>
                      </div>

                      {/* Unified XP Breakdown */}
                      {lastReward && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-center gap-2 text-[#3A6B35] font-serif font-bold text-3xl">
                            <Zap size={24} className="fill-[#3A6B35]" />
                            +{lastReward.totalXp} XP Secured!
                          </div>
                          
                          {lastReward.baseXp === 0 ? (
                            <p className="text-[10px] text-[#3A6B35] bg-[#EDF2E8] border border-[#D0DFC8] rounded-[8px] py-1.5 px-3 max-w-sm mx-auto font-bold font-sans">
                              🔄 Re-practicing scenario! (Base XP is granted once daily, but your growth continues!)
                            </p>
                          ) : (
                            lastReward.achievementXp > 0 && (
                              <p className="text-xs text-slate-500 font-sans">
                                ({lastReward.baseXp} base + {lastReward.achievementXp} bonus XP)
                              </p>
                            )
                          )}
                        </div>
                      )}

                      {/* Level Up display */}
                      {lastReward?.levelUp && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          className="py-2.5 px-5 rounded-[8px] bg-white border border-[#D0DFC8] inline-block shadow-sm"
                        >
                          <span className="font-sans font-bold text-xs text-[#3A6B35] uppercase tracking-widest">
                            🚀 Cosmic Rank Level Up! Level {lastReward.levelUp} reached
                          </span>
                        </motion.div>
                      )}

                      {/* Inline Newly Unlocked Achievements badges */}
                      {lastReward && lastReward.newAchievements.length > 0 && (
                        <div className="max-w-sm mx-auto space-y-2 pt-2 text-left">
                          <p className="text-[10px] text-slate-500 font-sans uppercase font-bold tracking-widest text-center">New Badges Unlocked!</p>
                          <div className="space-y-2">
                            {lastReward.newAchievements.map(achId => {
                              const ach = achievements.find(a => a.id === achId);
                              if (!ach) return null;
                              return (
                                <div 
                                  key={achId} 
                                  className="flex items-center gap-3 p-3.5 rounded-[16px] border border-[#D0DFC8] bg-white shadow-sm"
                                >
                                  <span className="text-3xl bg-[#EDF2E8] w-12 h-12 rounded-[8px] border border-[#D0DFC8]/50 flex items-center justify-center">{ach.icon}</span>
                                  <div>
                                    <h4 className="font-serif font-bold text-xs text-[#141F12]">{ach.title}</h4>
                                    <p className="text-[10px] text-[#3D4F38] leading-relaxed font-sans">{ach.description}</p>
                                  </div>
                                  <span className="text-[10px] font-sans font-bold text-[#3A6B35] ml-auto border border-[#D0DFC8] bg-[#EDF2E8] px-2 py-0.5 rounded-[8px] flex-shrink-0">
                                    +{ach.xpReward} XP
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {progress && (
                        <div className="max-w-md mx-auto pt-2 pb-3">
                          <XPBar levelInfo={getLevelInfo(progress.xp)} />
                        </div>
                      )}

                      {/* Navigation group */}
                      <div className="flex gap-3 justify-center pt-2">
                        <Button variant="secondary" onClick={handleRetry} className="rounded-[8px]">
                          <RotateCcw size={14} /> Try Another Answer
                        </Button>
                        <Button onClick={() => router.push('/practice')} className="rounded-[8px]">
                          Browse More Scenarios
                        </Button>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Side helpers (Right 4-cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Accordion tips */}
            <motion.div
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <GlassCard className="border-[#D0DFC8]">
                <button
                  onClick={() => setTipsOpen(v => !v)}
                  className="w-full flex items-center justify-between p-4.5 text-left"
                >
                  <div className="flex items-center gap-2">
                    <Lightbulb size={15} className="text-[#3A6B35]" />
                    <span className="font-serif font-bold text-sm text-[#141F12] uppercase tracking-wider">Coach Guidelines</span>
                  </div>
                  <ChevronDown
                    size={16}
                    className={`text-slate-500 transition-transform ${tipsOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                {tipsOpen && (
                  <div className="px-4.5 pb-5 space-y-3 border-t border-[#D0DFC8]/40 pt-4.5">
                    {scenario.tips.map((tip, i) => (
                      <div key={i} className="flex gap-2.5 text-sm items-start font-sans">
                        <span className="text-[#3A6B35] font-sans font-bold text-xs mt-0.5 bg-[#EDF2E8] border border-[#D0DFC8]/50 w-5 h-5 rounded-[4px] flex items-center justify-center flex-shrink-0">{i + 1}</span>
                        <span className="text-[#3D4F38] leading-relaxed text-xs">{tip}</span>
                      </div>
                    ))}
                  </div>
                )}
              </GlassCard>
            </motion.div>

            {/* AI Assistant tool */}
            <motion.div
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 }}
            >
              <AIAssistPanel scenario={scenario} userResponse={response} />
            </motion.div>

            {/* Mini progress tracker */}
            {progress && (
              <motion.div
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <GlassCard className="p-4 border-[#D0DFC8]">
                  <div className="flex items-center gap-1.5 mb-3 text-xs text-[#3D4F38] font-bold font-sans">
                    <span>Cosmic Rank Status</span>
                  </div>
                  <XPBar levelInfo={getLevelInfo(progress.xp)} compact />
                </GlassCard>
              </motion.div>
            )}

          </div>

        </div>

      </main>
    </div>
  );
}
