import { useState, useEffect, useCallback, useMemo } from 'react';

export interface ExchangeRates {
  [key: string]: number;
}

export const useCurrencyConverter = () => {
  const [rates, setRates] = useState<ExchangeRates>({});
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [targetCurrency, setTargetCurrency] = useState('EUR');
  const [amount, setAmount] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<number | null>(null);

  const fetchRates = useCallback(async (base: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://open.er-api.com/v6/latest/${base}`);
      if (!response.ok) throw new Error('Failed to fetch exchange rates');
      const data = await response.json();
      setRates(data.rates);
      setLastUpdated(data.time_last_update_unix * 1000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRates(baseCurrency);
  }, [baseCurrency, fetchRates]);

  const convertedAmount = useMemo(() => {
    if (!rates[targetCurrency]) return 0;
    return amount * rates[targetCurrency];
  }, [amount, targetCurrency, rates]);

  const exchangeRate = useMemo(() => {
    return rates[targetCurrency] || 0;
  }, [targetCurrency, rates]);

  const swapCurrencies = () => {
    setBaseCurrency(targetCurrency);
    setTargetCurrency(baseCurrency);
  };

  return {
    rates,
    baseCurrency,
    setBaseCurrency,
    targetCurrency,
    setTargetCurrency,
    amount,
    setAmount,
    convertedAmount,
    exchangeRate,
    loading,
    error,
    lastUpdated,
    refresh: () => fetchRates(baseCurrency),
    swapCurrencies
  };
};
