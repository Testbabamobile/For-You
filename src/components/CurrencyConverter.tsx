import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useCurrencyConverter } from '../hooks/useCurrencyConverter';
import { CURRENCIES } from '../constants/currencies';
import { RefreshCw, ArrowLeftRight, Search, AlertCircle, Clock, TrendingUp } from 'lucide-react';
import { cn } from '../utils/cn';

export const CurrencyConverter: React.FC = () => {
  const conv = useCurrencyConverter();
  const [searchBase, setSearchBase] = useState('');
  const [searchTarget, setSearchTarget] = useState('');

  const filteredBase = CURRENCIES.filter(c => 
    c.code.toLowerCase().includes(searchBase.toLowerCase()) || 
    c.name.toLowerCase().includes(searchBase.toLowerCase())
  );

  const filteredTarget = CURRENCIES.filter(c => 
    c.code.toLowerCase().includes(searchTarget.toLowerCase()) || 
    c.name.toLowerCase().includes(searchTarget.toLowerCase())
  );

  return (
    <div className="p-8 max-w-2xl mx-auto space-y-8">
      {/* Error State */}
      {conv.error && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 flex items-center gap-3 text-red-600 dark:text-red-400"
        >
          <AlertCircle className="w-5 h-5" />
          <p className="text-sm font-medium">{conv.error}</p>
          <button onClick={conv.refresh} className="ml-auto p-2 hover:bg-red-500/10 rounded-xl transition-colors">
            <RefreshCw className="w-4 h-4" />
          </button>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-6 items-center">
        {/* Base Currency */}
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">From</label>
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-emerald-500 transition-colors" />
              <input
                type="text"
                placeholder="Search base..."
                value={searchBase}
                onChange={(e) => setSearchBase(e.target.value)}
                className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl pl-11 pr-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all"
              />
            </div>
            <select
              value={conv.baseCurrency}
              onChange={(e) => conv.setBaseCurrency(e.target.value)}
              className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 text-xl font-bold text-zinc-900 dark:text-zinc-50 focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all shadow-sm h-16"
            >
              {filteredBase.map(c => (
                <option key={c.code} value={c.code}>{c.code} - {c.name}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">Amount</label>
            <input
              type="number"
              value={conv.amount}
              onChange={(e) => conv.setAmount(Number(e.target.value))}
              className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 text-2xl font-bold text-zinc-900 dark:text-zinc-50 focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all shadow-sm h-16"
            />
          </div>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center pt-6">
          <motion.button
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            onClick={conv.swapCurrencies}
            className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 transition-colors"
          >
            <ArrowLeftRight className="w-6 h-6" />
          </motion.button>
        </div>

        {/* Target Currency */}
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">To</label>
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-emerald-500 transition-colors" />
              <input
                type="text"
                placeholder="Search target..."
                value={searchTarget}
                onChange={(e) => setSearchTarget(e.target.value)}
                className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl pl-11 pr-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all"
              />
            </div>
            <select
              value={conv.targetCurrency}
              onChange={(e) => conv.setTargetCurrency(e.target.value)}
              className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 text-xl font-bold text-zinc-900 dark:text-zinc-50 focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all shadow-sm h-16"
            >
              {filteredTarget.map(c => (
                <option key={c.code} value={c.code}>{c.code} - {c.name}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">Converted</label>
            <div className="w-full bg-zinc-100 dark:bg-zinc-800/50 border border-transparent dark:border-zinc-800 rounded-2xl p-4 text-2xl font-bold text-zinc-900 dark:text-zinc-50 h-16 flex items-center overflow-hidden">
              {conv.loading ? (
                <RefreshCw className="w-6 h-6 animate-spin text-emerald-500" />
              ) : (
                <span className="truncate">{conv.convertedAmount.toLocaleString(undefined, { maximumFractionDigits: 4 })}</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Result Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-emerald-500 dark:bg-emerald-600 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-emerald-500/30 relative overflow-hidden group border border-white/10"
      >
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700" />
        
        <div className="relative flex flex-col items-center text-center space-y-4">
          <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
            <TrendingUp className="w-8 h-8" />
          </div>
          <div>
            <p className="text-emerald-50 font-bold text-xs uppercase tracking-[0.2em] mb-2 opacity-80">Exchange Rate</p>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tighter">
              1 {conv.baseCurrency} = {conv.exchangeRate.toFixed(4)} {conv.targetCurrency}
            </h2>
          </div>
          
          <div className="flex items-center gap-2 text-emerald-100 text-xs font-bold uppercase tracking-widest pt-4 opacity-70">
            <Clock className="w-4 h-4" />
            Last Updated: {conv.lastUpdated ? new Date(conv.lastUpdated).toLocaleString() : 'Never'}
          </div>
        </div>
      </motion.div>

      {/* Info Bar */}
      <div className="flex items-center justify-between px-4">
        <div className="flex items-center gap-2 text-zinc-400 dark:text-zinc-500 text-xs font-bold uppercase tracking-widest">
          <div className={cn("w-2 h-2 rounded-full", conv.loading ? "bg-amber-500 animate-pulse" : "bg-emerald-500")} />
          {conv.loading ? "Updating Rates..." : "Live Rates Active"}
        </div>
        <button 
          onClick={conv.refresh}
          disabled={conv.loading}
          className="flex items-center gap-2 text-emerald-500 hover:text-emerald-600 text-xs font-bold uppercase tracking-widest transition-colors disabled:opacity-50"
        >
          <RefreshCw className={cn("w-4 h-4", conv.loading && "animate-spin")} />
          Refresh Rates
        </button>
      </div>
    </div>
  );
};
