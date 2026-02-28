import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { History, Trash2, X } from 'lucide-react';
import { HistoryItem } from '../hooks/useCalculator';
import { formatNumber } from '../utils/math';

interface HistoryPanelProps {
  history: HistoryItem[];
  isOpen: boolean;
  onClose: () => void;
  onClear: () => void;
  onSelect: (val: string) => void;
}

export const HistoryPanel: React.FC<HistoryPanelProps> = ({
  history,
  isOpen,
  onClose,
  onClear,
  onSelect
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-sm bg-white dark:bg-zinc-900 shadow-2xl z-50 flex flex-col"
          >
            <div className="p-4 border-bottom border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <History className="w-5 h-5 text-zinc-500" />
                <h2 className="font-semibold text-zinc-800 dark:text-zinc-100">History</h2>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={onClear}
                  className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full text-zinc-500 transition-colors"
                  title="Clear history"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full text-zinc-500 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {history.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-zinc-400 space-y-2">
                  <History className="w-12 h-12 opacity-20" />
                  <p>No history yet</p>
                </div>
              ) : (
                history.map((item) => (
                  <motion.div
                    key={item.timestamp}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={() => onSelect(item.result)}
                    className="p-3 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800/50 cursor-pointer transition-colors group"
                  >
                    <div className="text-sm text-zinc-500 dark:text-zinc-400 text-right mb-1">
                      {item.expression} =
                    </div>
                    <div className="text-xl font-medium text-zinc-900 dark:text-zinc-100 text-right group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {formatNumber(parseFloat(item.result))}
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
