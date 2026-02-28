import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../utils/cn';

interface CalcButtonProps {
  label: string | React.ReactNode;
  onClick: () => void;
  variant?: 'default' | 'operator' | 'action' | 'scientific' | 'memory';
  className?: string;
}

export const CalcButton: React.FC<CalcButtonProps> = ({
  label,
  onClick,
  variant = 'default',
  className
}) => {
  const variants = {
    default: 'bg-zinc-100 dark:bg-zinc-900/80 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-800 border border-transparent dark:border-zinc-800/50',
    operator: 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg shadow-emerald-500/20 dark:shadow-emerald-500/10',
    action: 'bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-700 border border-transparent dark:border-zinc-700/30',
    scientific: 'bg-zinc-50 dark:bg-zinc-950/40 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/60 backdrop-blur-sm',
    memory: 'bg-transparent text-zinc-400 hover:text-emerald-500 dark:hover:text-emerald-400 text-xs font-bold uppercase tracking-wider transition-colors'
  };

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      whileHover={{ y: -1 }}
      onClick={onClick}
      className={cn(
        'h-14 sm:h-16 rounded-2xl flex items-center justify-center text-xl font-medium transition-all duration-200',
        variants[variant],
        className
      )}
    >
      {label}
    </motion.button>
  );
};
