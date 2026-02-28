import { useState, useCallback } from 'react';
import { factorial } from '../utils/math';

export type HistoryItem = {
  expression: string;
  result: string;
  timestamp: number;
};

export const useCalculator = () => {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [memory, setMemory] = useState(0);
  const [shouldReset, setShouldReset] = useState(false);

  const clear = useCallback(() => {
    setDisplay('0');
    setExpression('');
    setShouldReset(false);
  }, []);

  const allClear = useCallback(() => {
    clear();
    setHistory([]);
  }, [clear]);

  const appendDigit = useCallback((digit: string) => {
    if (shouldReset) {
      setDisplay(digit);
      setShouldReset(false);
    } else {
      setDisplay(prev => (prev === '0' ? digit : prev + digit));
    }
  }, [shouldReset]);

  const appendOperator = useCallback((op: string) => {
    setExpression(prev => prev + display + ' ' + op + ' ');
    setShouldReset(true);
  }, [display]);

  const calculate = useCallback(() => {
    try {
      const fullExpression = expression + display;
      // Basic sanitization and evaluation
      // Replace symbols for JS eval
      const sanitized = fullExpression
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/π/g, Math.PI.toString())
        .replace(/sin\((.*?)\)/g, (_, v) => Math.sin(parseFloat(v) * Math.PI / 180).toString())
        .replace(/cos\((.*?)\)/g, (_, v) => Math.cos(parseFloat(v) * Math.PI / 180).toString())
        .replace(/tan\((.*?)\)/g, (_, v) => Math.tan(parseFloat(v) * Math.PI / 180).toString())
        .replace(/log\((.*?)\)/g, (_, v) => Math.log10(parseFloat(v)).toString())
        .replace(/ln\((.*?)\)/g, (_, v) => Math.log(parseFloat(v)).toString())
        .replace(/√\((.*?)\)/g, (_, v) => Math.sqrt(parseFloat(v)).toString());

      // Note: Using Function constructor instead of eval for slightly better safety in this context
      const result = new Function(`return ${sanitized}`)();
      const resultStr = result.toString();
      
      setHistory(prev => [{
        expression: fullExpression,
        result: resultStr,
        timestamp: Date.now()
      }, ...prev].slice(0, 50));

      setDisplay(resultStr);
      setExpression('');
      setShouldReset(true);
    } catch (e) {
      setDisplay('Error');
      setShouldReset(true);
    }
  }, [display, expression]);

  const handleScientific = useCallback((func: string) => {
    const val = parseFloat(display);
    let result: number;

    switch (func) {
      case 'square': result = val * val; break;
      case 'sqrt': result = Math.sqrt(val); break;
      case 'pow': setExpression(prev => prev + `Math.pow(${display}, `); setShouldReset(true); return;
      case 'sin': result = Math.sin(val * Math.PI / 180); break;
      case 'cos': result = Math.cos(val * Math.PI / 180); break;
      case 'tan': result = Math.tan(val * Math.PI / 180); break;
      case 'log': result = Math.log10(val); break;
      case 'ln': result = Math.log(val); break;
      case 'fact': result = factorial(val); break;
      case 'pi': setDisplay(Math.PI.toString()); return;
      case 'percent': result = val / 100; break;
      default: return;
    }

    setDisplay(result.toString());
    setShouldReset(true);
  }, [display]);

  const handleMemory = useCallback((action: string) => {
    const val = parseFloat(display);
    switch (action) {
      case 'M+': setMemory(prev => prev + val); break;
      case 'M-': setMemory(prev => prev - val); break;
      case 'MR': setDisplay(memory.toString()); break;
      case 'MC': setMemory(0); break;
    }
    setShouldReset(true);
  }, [display, memory]);

  return {
    display,
    expression,
    history,
    memory,
    appendDigit,
    appendOperator,
    calculate,
    clear,
    allClear,
    handleScientific,
    handleMemory,
    setDisplay
  };
};
