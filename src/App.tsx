import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sun, Moon, Calculator, FlaskConical, Landmark, Menu, Globe } from 'lucide-react';
import { BasicCalculator } from './components/BasicCalculator';
import { ScientificCalculator } from './components/ScientificCalculator';
import { EMICalculator } from './components/EMICalculator';
import { CurrencyConverter } from './components/CurrencyConverter';
import { HistoryPanel } from './components/HistoryPanel';
import { useCalculator } from './hooks/useCalculator';
import { cn } from './utils/cn';

type Mode = 'basic' | 'scientific' | 'emi' | 'currency';

export default function App() {
  const [mode, setMode] = useState<Mode>('basic');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const calc = useCalculator();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const modes = [
    { id: 'basic', label: 'Basic', icon: Calculator },
    { id: 'scientific', label: 'Scientific', icon: FlaskConical },
    { id: 'emi', label: 'EMI', icon: Landmark },
    { id: 'currency', label: 'Currency', icon: Globe },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 transition-colors duration-500 font-sans selection:bg-emerald-500/30 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/5 dark:bg-emerald-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-500/5 dark:bg-emerald-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-4xl mx-auto min-h-screen flex flex-col relative z-10">
        {/* Header */}
        <header className="p-6 sm:p-8 flex items-center justify-between">
          <div className="flex items-center gap-4 group cursor-default">
            <motion.div 
              whileHover={{ rotate: 15 }}
              className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-emerald-500/20 dark:shadow-emerald-500/10"
            >
              <Calculator className="w-7 h-7" />
            </motion.div>
            <div>
              <h1 className="text-2xl font-black text-zinc-900 dark:text-zinc-50 tracking-tighter leading-none">
                OmniCalc
              </h1>
              <p className="text-[10px] uppercase font-bold tracking-[0.3em] text-zinc-400 dark:text-zinc-600 mt-1">Professional Tool</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md p-1.5 rounded-[1.5rem] shadow-sm border border-zinc-200/50 dark:border-zinc-800/50">
            {modes.map((m) => {
              const Icon = m.icon;
              return (
                <button
                  key={m.id}
                  onClick={() => setMode(m.id as Mode)}
                  className={cn(
                    'flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-bold transition-all duration-300',
                    mode === m.id
                      ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                      : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{m.label}</span>
                </button>
              );
            })}
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-4 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md rounded-2xl shadow-sm border border-zinc-200/50 dark:border-zinc-800/50 text-zinc-500 hover:text-emerald-500 transition-all"
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </motion.button>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex flex-col relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="flex-1"
            >
              {mode === 'basic' && (
                <BasicCalculator calc={calc} onOpenHistory={() => setIsHistoryOpen(true)} />
              )}
              {mode === 'scientific' && (
                <ScientificCalculator calc={calc} onOpenHistory={() => setIsHistoryOpen(true)} />
              )}
              {mode === 'emi' && <EMICalculator />}
              {mode === 'currency' && <CurrencyConverter />}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* History Panel */}
        <HistoryPanel
          isOpen={isHistoryOpen}
          history={calc.history}
          onClose={() => setIsHistoryOpen(false)}
          onClear={calc.allClear}
          onSelect={(val) => {
            calc.setDisplay(val);
            setIsHistoryOpen(false);
          }}
        />

        {/* Footer */}
        <footer className="p-6 text-center text-zinc-400 dark:text-zinc-600 text-xs font-medium uppercase tracking-widest">
          Precision & Simplicity • © 2026 OmniCalc
        </footer>
      </div>
    </div>
  );
}
