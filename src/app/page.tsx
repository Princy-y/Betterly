'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Button from '@/components/ui/Button';

// Reusable SVG inline Tabler icons at 28px in #3A6B35
const Icons = {
  messages: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-messages" width="28" height="28" viewBox="0 0 24 24" strokeWidth="1.8" stroke="#3A6B35" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M21 14l-3 -3h-7a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1h9a1 1 0 0 1 1 1v7a1 1 0 0 1 -1 1z" />
      <path d="M14 15v2a1 1 0 0 1 -1 1h-7l-3 3v-10a1 1 0 0 1 1 -1h2" />
    </svg>
  ),
  trophy: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trophy" width="28" height="28" viewBox="0 0 24 24" strokeWidth="1.8" stroke="#3A6B35" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M8 21l8 0" />
      <path d="M12 17l0 4" />
      <path d="M7 4l10 0" />
      <path d="M17 4v8a5 5 0 0 1 -10 0v-8" />
      <path d="M5 9m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
      <path d="M19 9m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
    </svg>
  ),
  sparkles: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-sparkles" width="28" height="28" viewBox="0 0 24 24" strokeWidth="1.8" stroke="#3A6B35" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M16 18a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2z" />
      <path d="M16 6a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2z" />
      <path d="M9 18a3 3 0 0 1 3 3a3 3 0 0 1 3 -3a3 3 0 0 1 -3 -3a3 3 0 0 1 -3 3z" />
      <path d="M6 10a4 4 0 0 1 4 4a4 4 0 0 1 4 -4a4 4 0 0 1 -4 -4a4 4 0 0 1 -4 4z" />
    </svg>
  ),
  chartLine: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chart-line" width="28" height="28" viewBox="0 0 24 24" strokeWidth="1.8" stroke="#3A6B35" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M4 19l16 0" />
      <path d="M4 15l4 -4l4 4l8 -8" />
    </svg>
  ),
};

const featureList = [
  {
    icon: Icons.messages,
    title: 'Real-World Scenarios',
    description: 'Practice 20+ handcrafted situations from job interviews to tough conversations, each uniquely designed.',
  },
  {
    icon: Icons.trophy,
    title: 'Atmospheric Progress',
    description: 'Climb 50 distinct ranks, keep daily streaks alive, and earn rare badges no two players share.',
  },
  {
    icon: Icons.sparkles,
    title: 'Optional AI Support',
    description: 'Get a personalized hint or a full breakdown of your response — only when you ask for it.',
  },
  {
    icon: Icons.chartLine,
    title: 'Self-Reflection Logs',
    description: 'Review your personal growth calendar, past attempts, and skill-by-skill improvement metrics.',
  },
];

const pills = [
  'Communication',
  'Confidence',
  'Critical Thinking',
  'Emotional Intelligence',
];

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#F7F9F5] selection:bg-[#D0DFC8]/50 relative">
      <Navbar />

      {/* Decorative organic background blobs */}
      <div className="absolute top-[15%] left-[-5%] w-[450px] h-[400px] rounded-full bg-[#EDF2E8] blur-[110px] pointer-events-none" />
      <div className="absolute top-[8%] right-[-5%] w-[500px] h-[450px] rounded-full bg-[#EDF2E8] blur-[120px] pointer-events-none" />

      {/* Hero Section */}
      <section className="w-full bg-[#F7F9F5] relative overflow-hidden flex items-center" style={{ minHeight: '85vh' }}>
        
        {/* Subtle radial gradient blob behind the card */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse 500px 400px at 70% 50%, rgba(139, 191, 122, 0.12) 0%, transparent 70%)'
        }} />

        <div className="w-full max-w-7xl mx-auto px-6 md:px-[80px] py-[60px] relative z-10 grid md:grid-cols-2 gap-[64px] items-center">
          
          {/* LEFT COLUMN (text) */}
          <div className="flex flex-col items-start text-left">
            {/* Small tag above headline */}
            <div className="px-3 py-1 rounded-full bg-[#EDF2E8] text-[#3A6B35] text-[12px] font-sans font-bold uppercase tracking-wider mb-5 flex items-center gap-1">
              <span>✦</span> Free & Private
            </div>

            {/* Headline */}
            <h1 className="font-serif text-[52px] leading-[1.15] font-extrabold text-[#141F12] tracking-tight">
              Build Your <br />
              <span className="text-[#3A6B35]">True Voice &</span> <br />
              <span className="text-[#3A6B35]">Confidence</span>
            </h1>

            {/* Subtext */}
            <p className="text-[#3D4F38] text-[16px] max-w-[440px] leading-[1.7] my-[20px] font-sans">
              Step into a calming, self-contained workspace designed to build life and communication skills. 
              Master tough conversations, interviews, social events, and critical reasoning — free of generic noise.
            </p>

            {/* Hero CTAs on ONE ROW */}
            <div className="flex flex-row items-center gap-[12px] flex-wrap">
              <Link href="/dashboard">
                <button className="bg-[#3A6B35] text-white px-[28px] py-[13px] rounded-[10px] text-[15px] font-sans font-semibold hover:bg-[#3A6B35]/90 transition-all shadow-sm active:scale-[0.99]">
                  Start Practicing Free
                </button>
              </Link>
              <Link href="/practice">
                <button className="bg-transparent border-[1.5px] border-[#3A6B35] text-[#3A6B35] px-[28px] py-[13px] rounded-[10px] text-[15px] font-sans font-semibold hover:bg-[#EDF2E8] transition-all active:scale-[0.99]">
                  Browse Scenarios
                </button>
              </Link>
            </div>

            {/* Pills row BELOW buttons */}
            <div className="flex flex-wrap gap-[8px] mt-[32px]">
              {pills.map((pill) => (
                <div 
                  key={pill} 
                  className="px-[14px] py-[5px] rounded-full bg-[#EDF2E8] text-[#3A6B35] border border-[#D0DFC8] font-sans font-semibold text-[13px] transition-colors cursor-default"
                >
                  {pill}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN (card) */}
          <div className="flex justify-center items-center relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="relative w-full max-w-[380px] flex justify-center"
            >
              {/* Subtle floating animation */}
              <div 
                className="bg-white border border-[#D0DFC8] rounded-[20px] p-6 shadow-[0_8px_32px_rgba(58,107,53,0.10)] relative z-10 w-full animate-float transition-all duration-300 hover:scale-[1.01]"
                style={{
                  animation: 'float 4s ease-in-out infinite'
                }}
              >
                {/* Style floating animation inside CSS or custom keyframes tag in JSX */}
                <style jsx global>{`
                  @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-8px); }
                  }
                  .animate-float {
                    animation: float 4s ease-in-out infinite;
                  }
                `}</style>

                {/* Top row */}
                <div className="flex items-center justify-between pb-3 border-b border-[#D0DFC8]/40 mb-4">
                  <span className="text-[11px] text-[#3D4F38] font-sans font-bold uppercase tracking-wider">
                    3-Day Streak 🔥
                  </span>
                  <span className="text-[11px] font-sans font-bold text-[#3A6B35] px-2 py-0.5 bg-[#EDF2E8] border border-[#D0DFC8]/60 rounded-[8px] uppercase tracking-wider">
                    Daily Challenge
                  </span>
                </div>

                {/* Title */}
                <div className="space-y-1 mb-3">
                  <h4 className="font-serif font-bold text-[18px] text-[#141F12] leading-snug">
                    Introduce Yourself
                  </h4>
                  {/* Badge row */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[11px] font-sans font-bold text-[#3A6B35] px-2 py-0.5 bg-[#EDF2E8] border border-[#D0DFC8]/40 rounded-[6px]">
                      Communication
                    </span>
                    <span className="text-[13px] text-[#3D4F38] font-sans font-medium">
                      · Medium
                    </span>
                  </div>
                </div>

                {/* Scenario text in quotes */}
                <p className="text-[14px] text-[#3D4F38] leading-relaxed italic my-[12px] font-sans opacity-95">
                  "Give a clear, confident, and memorable self-introduction to your university project partners."
                </p>

                {/* Bottom row */}
                <div className="flex items-center justify-between pt-3 border-t border-[#D0DFC8]/40">
                  <span className="text-[11px] font-sans font-bold text-[#3A6B35] bg-[#EDF2E8] px-2.5 py-1 border border-[#D0DFC8]/50 rounded-[8px]">
                    +25 XP
                  </span>

                  <Link href="/practice/comm-1">
                    <button className="text-xs font-sans font-bold text-white bg-[#3A6B35] hover:opacity-90 active:scale-[0.98] transition-all px-[18px] py-[8px] rounded-[8px]">
                      Try Practice →
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* Features Grid Section */}
      <section className="bg-[#EDF2E8] py-[100px] relative z-10 border-t border-b border-[#D0DFC8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Features Title */}
          <div className="text-center max-w-xl mx-auto mb-16">
            <h2 className="font-serif text-3xl sm:text-4xl text-[#141F12] leading-tight">
              Immersive Features to <span className="text-[#3A6B35]">Level Up</span>
            </h2>
            <p className="text-[#3D4F38] text-sm mt-3 font-sans leading-relaxed">
              Explore custom-built systems that help you refine emotional control, logical reasoning, and speech.
            </p>
          </div>

          {/* 2x2 Grid of premium white cards */}
          <div className="grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {featureList.map((f) => {
              const IconComp = f.icon;
              return (
                <div
                  key={f.title}
                  className="bg-white border border-[#D0DFC8] rounded-[16px] p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(58,107,53,0.12)] glass-hover group"
                >
                  <div className="mb-4 inline-flex items-center justify-center">
                    <IconComp />
                  </div>
                  <h3 className="font-serif font-bold text-lg text-[#141F12] mb-2">{f.title}</h3>
                  <p className="text-sm text-[#3D4F38] leading-relaxed font-sans">{f.description}</p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* CTA Section - Solid Green Background with organic radial gradient overlay */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-[100px] relative z-10">
        <div 
          className="rounded-[16px] border border-[#3A6B35]/30 overflow-hidden relative shadow-lg"
          style={{
            backgroundColor: '#3A6B35',
            backgroundImage: `
              radial-gradient(circle at 10% 20%, rgba(74, 127, 69, 0.12) 0%, transparent 45%),
              radial-gradient(circle at 90% 80%, rgba(74, 127, 69, 0.16) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, rgba(74, 127, 69, 0.08) 0%, transparent 50%)
            `
          }}
        >
          <div className="relative z-10 px-8 py-16 text-center max-w-xl mx-auto space-y-6">
            <h2 className="font-serif text-3xl sm:text-4xl text-white leading-tight">
              Ready to clear the chamber?
            </h2>
            <p className="text-white/80 font-sans text-sm leading-relaxed">
              Join students and young professionals who are practicing emotional intelligence, confidence, and interviews in a visually satisfying light organic workspace.
            </p>
            <div className="pt-2">
              <Link href="/dashboard">
                <button className="bg-white text-[#3A6B35] font-sans font-bold text-base px-8 py-4 rounded-[8px] shadow-sm hover:bg-[#F7F9F5] transition-all hover:scale-105">
                  Begin Free Practice
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
