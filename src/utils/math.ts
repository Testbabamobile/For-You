export const factorial = (n: number): number => {
  if (n < 0) return NaN;
  if (n === 0) return 1;
  let res = 1;
  for (let i = 2; i <= n; i++) res *= i;
  return res;
};

export const formatNumber = (num: number, precision: number = 10): string => {
  if (isNaN(num)) return 'Error';
  if (!isFinite(num)) return 'Infinity';
  
  // Handle scientific notation for very large or small numbers
  if (Math.abs(num) > 1e12 || (Math.abs(num) < 1e-7 && num !== 0)) {
    return num.toExponential(4);
  }

  const s = num.toString();
  if (s.includes('.')) {
    const parts = s.split('.');
    if (parts[1].length > precision) {
      return parseFloat(num.toFixed(precision)).toString();
    }
  }
  return s;
};
