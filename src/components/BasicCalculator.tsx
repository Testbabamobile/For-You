import React from 'react';
import { CalcButton } from './CalcButton';
import { useCalculator } from '../hooks/useCalculator';
import { formatNumber } from '../utils/math';
import { Copy, Share2, History as HistoryIcon } from 'lucide-react';

interface BasicCalculatorProps {
  calc: ReturnType<typeof useCalculator>;
  onOpenHistory: () => void;
}

export const BasicCalculator: React.FC<BasicCalculatorProps> = ({ calc, onOpenHistory }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(calc.display);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'OmniCalc Result',
        text: `Result: ${calc.display}`,
      });
    }
  };

  return (
    <div className="flex flex-col h-full max-w-md mx-auto">
      {/* Display Area */}
      <div className="flex-1 flex flex-col justify-end p-8 text-right space-y-2 relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 dark:bg-emerald-500/10 blur-[100px] -mr-32 -mt-32 pointer-events-none" />
        
        <div className="text-zinc-400 dark:text-zinc-500 text-lg font-medium h-8 overflow-hidden whitespace-nowrap overflow-ellipsis relative z-10">
          {calc.expression}
        </div>
        <div className="text-6xl sm:text-7xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tighter break-all leading-none relative z-10 drop-shadow-sm">
          {formatNumber(parseFloat(calc.display))}
        </div>
        
        <div className="flex justify-end gap-4 pt-6 relative z-10">
          <button onClick={onOpenHistory} className="p-2.5 bg-zinc-100 dark:bg-zinc-900/50 rounded-xl text-zinc-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition-all hover:scale-110 active:scale-95 border border-transparent dark:border-zinc-800/50">
            <HistoryIcon className="w-5 h-5" />
          </button>
          <button onClick={handleCopy} className="p-2.5 bg-zinc-100 dark:bg-zinc-900/50 rounded-xl text-zinc-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition-all hover:scale-110 active:scale-95 border border-transparent dark:border-zinc-800/50">
            <Copy className="w-5 h-5" />
          </button>
          <button onClick={handleShare} className="p-2.5 bg-zinc-100 dark:bg-zinc-900/50 rounded-xl text-zinc-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition-all hover:scale-110 active:scale-95 border border-transparent dark:border-zinc-800/50">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Keypad */}
      <div className="grid grid-cols-4 gap-3.5 p-7 bg-white dark:bg-zinc-950/50 backdrop-blur-xl rounded-t-[3rem] shadow-2xl border-t border-zinc-100 dark:border-zinc-800/50">
        <CalcButton label="AC" variant="action" onClick={calc.allClear} />
        <CalcButton label="C" variant="action" onClick={calc.clear} />
        <CalcButton label="%" variant="action" onClick={() => calc.handleScientific('percent')} />
        <CalcButton label="÷" variant="operator" onClick={() => calc.appendOperator('÷')} />

        <CalcButton label="7" onClick={() => calc.appendDigit('7')} />
        <CalcButton label="8" onClick={() => calc.appendDigit('8')} />
        <CalcButton label="9" onClick={() => calc.appendDigit('9')} />
        <CalcButton label="×" variant="operator" onClick={() => calc.appendOperator('×')} />

        <CalcButton label="4" onClick={() => calc.appendDigit('4')} />
        <CalcButton label="5" onClick={() => calc.appendDigit('5')} />
        <CalcButton label="6" onClick={() => calc.appendDigit('6')} />
        <CalcButton label="-" variant="operator" onClick={() => calc.appendOperator('-')} />

        <CalcButton label="1" onClick={() => calc.appendDigit('1')} />
        <CalcButton label="2" onClick={() => calc.appendDigit('2')} />
        <CalcButton label="3" onClick={() => calc.appendDigit('3')} />
        <CalcButton label="+" variant="operator" onClick={() => calc.appendOperator('+')} />

        <CalcButton label="0" className="col-span-2" onClick={() => calc.appendDigit('0')} />
        <CalcButton label="." onClick={() => calc.appendDigit('.')} />
        <CalcButton label="=" variant="operator" onClick={calc.calculate} />
      </div>
    </div>
  );
};
