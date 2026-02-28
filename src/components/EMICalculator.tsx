import React from 'react';
import { motion } from 'motion/react';
import { useEMI } from '../hooks/useEMI';
import { formatNumber } from '../utils/math';
import { DollarSign, Percent, Calendar, TrendingUp, Wallet, ArrowRight, Globe } from 'lucide-react';
import { CURRENCIES } from '../constants/currencies';

export const EMICalculator: React.FC = () => {
  const emi = useEMI();

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: emi.currency,
      maximumFractionDigits: 0
    }).format(val);
  };

  const selectedCurrencySymbol = CURRENCIES.find(c => c.code === emi.currency)?.symbol || '$';

  return (
    <div className="p-8 max-w-2xl mx-auto space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Inputs */}
        <div className="space-y-8">
          <div className="space-y-3">
            <label className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.2em] flex items-center gap-2">
              <Globe className="w-3.5 h-3.5 text-emerald-500" /> Currency
            </label>
            <select
              value={emi.currency}
              onChange={(e) => emi.setCurrency(e.target.value)}
              className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 text-lg font-bold text-zinc-900 dark:text-zinc-50 focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all shadow-sm cursor-pointer"
            >
              {CURRENCIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.code} - {c.name} ({c.symbol})
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.2em] flex items-center gap-2">
              <span className="text-emerald-500 font-bold">{selectedCurrencySymbol}</span> Loan Amount
            </label>
            <div className="relative group">
              <input
                type="number"
                value={emi.loanAmount}
                onChange={(e) => emi.setLoanAmount(Number(e.target.value))}
                className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 text-xl font-bold text-zinc-900 dark:text-zinc-50 focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all shadow-sm group-hover:border-emerald-500/30"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.2em] flex items-center gap-2">
              <Percent className="w-3.5 h-3.5 text-emerald-500" /> Interest Rate (% p.a.)
            </label>
            <input
              type="number"
              step="0.1"
              value={emi.interestRate}
              onChange={(e) => emi.setInterestRate(Number(e.target.value))}
              className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 text-xl font-bold text-zinc-900 dark:text-zinc-50 focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all shadow-sm"
            />
          </div>

          <div className="space-y-3">
            <label className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.2em] flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-emerald-500" /> Loan Tenure
            </label>
            <div className="flex gap-3">
              <input
                type="number"
                value={emi.tenure}
                onChange={(e) => emi.setTenure(Number(e.target.value))}
                className="flex-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 text-xl font-bold text-zinc-900 dark:text-zinc-50 focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all shadow-sm"
              />
              <select
                value={emi.tenureType}
                onChange={(e) => emi.setTenureType(e.target.value as 'months' | 'years')}
                className="bg-zinc-100 dark:bg-zinc-800 border-none rounded-2xl px-4 font-bold text-zinc-700 dark:text-zinc-300 focus:ring-2 focus:ring-emerald-500/50 cursor-pointer"
              >
                <option value="months">Months</option>
                <option value="years">Years</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Card */}
        <div className="bg-emerald-500 dark:bg-emerald-600 rounded-[3rem] p-10 text-white shadow-2xl shadow-emerald-500/40 dark:shadow-emerald-900/20 flex flex-col justify-between relative overflow-hidden group border border-white/10">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 bg-white/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-1000" />
          
          <div className="relative">
            <p className="text-emerald-50 font-bold text-xs uppercase tracking-[0.2em] mb-2 opacity-80">Monthly EMI</p>
            <h2 className="text-5xl sm:text-6xl font-black tracking-tighter">
              {formatCurrency(emi.emi)}
            </h2>
          </div>

          <div className="space-y-8 relative">
            <div className="flex items-center justify-between border-t border-white/20 pt-8">
              <div className="flex items-center gap-4">
                <div className="p-2.5 bg-white/20 rounded-2xl backdrop-blur-md">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] text-emerald-50 uppercase font-black tracking-[0.2em] opacity-70">Total Interest</p>
                  <p className="text-xl font-bold">{formatCurrency(emi.totalInterest)}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-white/20 pt-8">
              <div className="flex items-center gap-4">
                <div className="p-2.5 bg-white/20 rounded-2xl backdrop-blur-md">
                  <Wallet className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] text-emerald-50 uppercase font-black tracking-[0.2em] opacity-70">Total Payment</p>
                  <p className="text-xl font-bold">{formatCurrency(emi.totalPayment)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Summary / Info */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-zinc-900/50 backdrop-blur-sm rounded-[2rem] p-8 border border-zinc-100 dark:border-zinc-800/50 flex items-center justify-between shadow-sm"
      >
        <div className="flex items-center gap-6">
          <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-inner">
            <Wallet className="w-7 h-7" />
          </div>
          <div>
            <h3 className="font-bold text-zinc-900 dark:text-zinc-50 text-lg">Financial Planning</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Plan your future with accurate loan insights.</p>
          </div>
        </div>
        <button className="p-4 bg-zinc-100 dark:bg-zinc-800 rounded-2xl text-zinc-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition-all hover:scale-110 active:scale-95">
          <ArrowRight className="w-6 h-6" />
        </button>
      </motion.div>
    </div>
  );
};
