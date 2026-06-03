import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        purple: { 400: '#a78bfa', 500: '#8b5cf6', 600: '#7c3aed', 700: '#6d28d9' },
        indigo: { 400: '#818cf8', 500: '#6366f1', 600: '#4f46e5' },
        cyan:   { 400: '#22d3ee', 500: '#06b6d4', 600: '#0891b2' },
        pink:   { 400: '#f472b6', 500: '#ec4899' },
      },
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
        inter:  ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'aurora':        'linear-gradient(135deg, #6366f1, #8b5cf6, #06b6d4)',
        'aurora-pink':   'linear-gradient(135deg, #f472b6, #8b5cf6, #6366f1)',
        'glass-border':  'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.02))',
      },
      animation: {
        'pulse-slow':    'pulse 6s cubic-bezier(0.4,0,0.6,1) infinite',
        'float-slow':    'float-slow 12s ease-in-out infinite alternate',
        'float-slower':  'float-slower 16s ease-in-out infinite alternate',
        'float-medium':  'float-medium 8s ease-in-out infinite alternate',
        'glow-pulse':    'glow-pulse 3s ease-in-out infinite',
        'fade-up':       'fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
      },
      keyframes: {
        'float-slow': {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '50%':      { transform: 'translate(10px, -15px) scale(1.03)' },
        },
        'float-slower': {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '50%':      { transform: 'translate(-12px, 12px) scale(0.97)' },
        },
        'float-medium': {
          '0%, 100%': { transform: 'translate(0px, 0px)' },
          '50%':      { transform: 'translate(6px, -8px)' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 25px rgba(139,92,246,0.2)' },
          '50%':      { boxShadow: '0 0 45px rgba(139,92,246,0.45)' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
