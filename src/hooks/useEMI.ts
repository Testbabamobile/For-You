import { useState, useMemo } from 'react';

export const useEMI = () => {
  const [loanAmount, setLoanAmount] = useState<number>(1000000);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [tenure, setTenure] = useState<number>(120);
  const [tenureType, setTenureType] = useState<'months' | 'years'>('months');
  const [currency, setCurrency] = useState<string>('USD');

  const results = useMemo(() => {
    const P = loanAmount;
    const R = interestRate / 12 / 100;
    const N = tenureType === 'years' ? tenure * 12 : tenure;

    if (P <= 0 || R < 0 || N <= 0) {
      return { emi: 0, totalInterest: 0, totalPayment: 0 };
    }

    // EMI = [P x R x (1+R)^N] / [(1+R)^N - 1]
    const emi = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    const totalPayment = emi * N;
    const totalInterest = totalPayment - P;

    return {
      emi: isFinite(emi) ? emi : 0,
      totalInterest: isFinite(totalInterest) ? totalInterest : 0,
      totalPayment: isFinite(totalPayment) ? totalPayment : 0,
    };
  }, [loanAmount, interestRate, tenure, tenureType]);

  return {
    loanAmount, setLoanAmount,
    interestRate, setInterestRate,
    tenure, setTenure,
    tenureType, setTenureType,
    currency, setCurrency,
    ...results
  };
};
