import { ReactNode, ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  loading?: boolean;
}

const variants = {
  primary:   'bg-[var(--primary)] text-[var(--btn-text)] hover:opacity-95 shadow-sm active:scale-[0.99]',
  secondary: 'bg-transparent border border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--card)] active:scale-[0.99]',
  ghost:     'text-[var(--body)] hover:bg-[var(--card)]',
  danger:    'bg-red-500/10 text-red-700 border border-red-500/30 hover:bg-red-500/20',
};

const sizes = {
  sm: 'px-3.5 py-1.5 text-xs',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
};

export default function Button({
  variant = 'primary', size = 'md', children, loading, className = '', disabled, ...props
}: Props) {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center gap-2 font-medium rounded-[8px]
        transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
        font-sans
        ${variants[variant]} ${sizes[size]} ${className}
      `}
    >
      {loading ? (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      ) : null}
      {children}
    </button>
  );
}
