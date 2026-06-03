'use client';

import { useState, useEffect, useRef } from 'react';
import { Clock, Play, Pause, RotateCcw } from 'lucide-react';

interface Props {
  initialSeconds: number;
  onExpire?: () => void;
}

export default function Timer({ initialSeconds, onExpire }: Props) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [running, setRunning] = useState(false);
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => {
      setSeconds(s => {
        if (s <= 1) {
          clearInterval(interval);
          setExpired(true);
          setRunning(false);
          setTimeout(() => onExpire?.(), 0);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [running, onExpire]);

  const reset = () => {
    setSeconds(initialSeconds);
    setRunning(false);
    setExpired(false);
  };
  const pct = (seconds / initialSeconds) * 100;
  const color = pct > 50 ? '#06b6d4' : pct > 20 ? '#f59e0b' : '#ef4444';

  const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
  const ss = String(seconds % 60).padStart(2, '0');

  return (
    <div className="glass rounded-2xl p-4 flex items-center gap-4">
      {/* Circular progress */}
      <div className="relative w-14 h-14">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 56 56">
          <circle cx="28" cy="28" r="24" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4" />
          <circle
            cx="28" cy="28" r="24" fill="none"
            stroke={color}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 24}`}
            strokeDashoffset={`${2 * Math.PI * 24 * (1 - pct / 100)}`}
            style={{ transition: 'stroke-dashoffset 1s linear, stroke 0.3s' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <Clock size={14} style={{ color }} />
        </div>
      </div>

      {/* Time display */}
      <div className="flex-1">
        <div className="font-outfit font-bold text-2xl" style={{ color: expired ? '#f87171' : color }}>
          {expired ? 'Time!' : `${mm}:${ss}`}
        </div>
        <div className="text-xs text-slate-500">
          {expired ? 'Timer expired' : running ? 'Timer running' : 'Ready'}
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-2">
        <button
          onClick={() => setRunning(r => !r)}
          disabled={expired}
          className="p-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-slate-300 disabled:opacity-40 transition-colors"
        >
          {running ? <Pause size={14} /> : <Play size={14} />}
        </button>
        <button
          onClick={reset}
          className="p-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-slate-300 transition-colors"
        >
          <RotateCcw size={14} />
        </button>
      </div>
    </div>
  );
}
