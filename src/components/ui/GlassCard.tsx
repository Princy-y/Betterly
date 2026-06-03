import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
  glow?: 'purple' | 'cyan' | 'pink' | 'emerald' | 'none';
  onClick?: () => void;
  hoverFloat?: boolean;
}

const glowMap = {
  purple: 'hover:shadow-[0_0_40px_rgba(139,92,246,0.25)] hover:border-purple-500/40',
  cyan:   'hover:shadow-[0_0_40px_rgba(6,182,212,0.25)]  hover:border-cyan-500/40',
  pink:   'hover:shadow-[0_0_40px_rgba(244,114,182,0.25)] hover:border-pink-500/40',
  emerald: 'hover:shadow-[0_0_40px_rgba(16,185,129,0.25)] hover:border-emerald-500/40',
  none:   '',
};

export default function GlassCard({ children, className = '', glow = 'purple', onClick, hoverFloat = false }: Props) {
  return (
    <div
      onClick={onClick}
      className={`glass rounded-2xl transition-all duration-300 border border-white/[0.055] ${
        glow !== 'none' ? glowMap[glow] : ''
      } ${
        hoverFloat ? 'hover:-translate-y-1.5 hover:scale-[1.015]' : ''
      } ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}
