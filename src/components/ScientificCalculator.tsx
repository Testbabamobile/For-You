import React from 'react';
import { CalcButton } from './CalcButton';
import { useCalculator } from '../hooks/useCalculator';
import { formatNumber } from '../utils/math';
import { Copy, Share2, History as HistoryIcon } from 'lucide-react';

interface ScientificCalculatorProps {
  calc: ReturnType<typeof useCalculator>;
  onOpenHistory: () => void;
}

export const ScientificCalculator: React.FC<ScientificCalculatorProps> = ({ calc, onOpenHistory }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(calc.display);
  };

  return (
    <div className="flex flex-col h-full max-w-2xl mx-auto">
      {/* Display Area */}
      <div className="p-8 text-right space-y-2 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 dark:bg-emerald-500/10 blur-[80px] -mr-24 -mt-24 pointer-events-none" />
        
        <div className="text-zinc-400 dark:text-zinc-500 text-sm font-medium h-6 overflow-hidden relative z-10">
          {calc.expression}
        </div>
        <div className="text-5xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight break-all relative z-10">
          {formatNumber(parseFloat(calc.display))}
        </div>
        <div className="flex justify-end gap-3 pt-4 relative z-10">
          <button onClick={onOpenHistory} className="p-2 bg-zinc-100 dark:bg-zinc-900/50 rounded-xl text-zinc-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition-all border border-transparent dark:border-zinc-800/50">
            <HistoryIcon className="w-4 h-4" />
          </button>
          <button onClick={handleCopy} className="p-2 bg-zinc-100 dark:bg-zinc-900/50 rounded-xl text-zinc-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition-all border border-transparent dark:border-zinc-800/50">
            <Copy className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Memory Row */}
      <div className="grid grid-cols-4 gap-3 px-8 mb-6">
        <CalcButton label="MC" variant="memory" onClick={() => calc.handleMemory('MC')} />
        <CalcButton label="MR" variant="memory" onClick={() => calc.handleMemory('MR')} />
        <CalcButton label="M+" variant="memory" onClick={() => calc.handleMemory('M+')} />
        <CalcButton label="M-" variant="memory" onClick={() => calc.handleMemory('M-')} />
      </div>

      {/* Keypad */}
      <div className="grid grid-cols-5 gap-3 p-8 bg-white dark:bg-zinc-950/50 backdrop-blur-xl rounded-t-[3rem] shadow-2xl border-t border-zinc-100 dark:border-zinc-800/50 flex-1">
        {/* Scientific Functions */}
        <CalcButton label="sin" variant="scientific" onClick={() => calc.handleScientific('sin')} />
        <CalcButton label="cos" variant="scientific" onClick={() => calc.handleScientific('cos')} />
        <CalcButton label="tan" variant="scientific" onClick={() => calc.handleScientific('tan')} />
        <CalcButton label="π" variant="scientific" onClick={() => calc.handleScientific('pi')} />
        <CalcButton label="AC" variant="action" onClick={calc.allClear} />

        <CalcButton label="log" variant="scientific" onClick={() => calc.handleScientific('log')} />
        <CalcButton label="ln" variant="scientific" onClick={() => calc.handleScientific('ln')} />
        <CalcButton label="x²" variant="scientific" onClick={() => calc.handleScientific('square')} />
        <CalcButton label="xʸ" variant="scientific" onClick={() => calc.handleScientific('pow')} />
        <CalcButton label="÷" variant="operator" onClick={() => calc.appendOperator('÷')} />

        <CalcButton label="√" variant="scientific" onClick={() => calc.handleScientific('sqrt')} />
        <CalcButton label="7" onClick={() => calc.appendDigit('7')} />
        <CalcButton label="8" onClick={() => calc.appendDigit('8')} />
        <CalcButton label="9" onClick={() => calc.appendDigit('9')} />
        <CalcButton label="×" variant="operator" onClick={() => calc.appendOperator('×')} />

        <CalcButton label="n!" variant="scientific" onClick={() => calc.handleScientific('fact')} />
        <CalcButton label="4" onClick={() => calc.appendDigit('4')} />
        <CalcButton label="5" onClick={() => calc.appendDigit('5')} />
        <CalcButton label="6" onClick={() => calc.appendDigit('6')} />
        <CalcButton label="-" variant="operator" onClick={() => calc.appendOperator('-')} />

        <CalcButton label="(" variant="scientific" onClick={() => calc.appendDigit('(')} />
        <CalcButton label="1" onClick={() => calc.appendDigit('1')} />
        <CalcButton label="2" onClick={() => calc.appendDigit('2')} />
        <CalcButton label="3" onClick={() => calc.appendDigit('3')} />
        <CalcButton label="+" variant="operator" onClick={() => calc.appendOperator('+')} />

        <CalcButton label=")" variant="scientific" onClick={() => calc.appendDigit(')')} />
        <CalcButton label="0" onClick={() => calc.appendDigit('0')} />
        <CalcButton label="." onClick={() => calc.appendDigit('.')} />
        <CalcButton label="EXP" variant="scientific" onClick={() => calc.appendDigit('e')} />
        <CalcButton label="=" variant="operator" onClick={calc.calculate} />
      </div>
    </div>
  );
};
