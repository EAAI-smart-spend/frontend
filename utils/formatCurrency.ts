/**
 * Currency symbols mapping
 */
const currencySymbols: { [key: string]: string } = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  JPY: "¥",
  CNY: "¥",
  INR: "₹",
  AUD: "A$",
  CAD: "C$",
  CHF: "Fr",
  HKD: "HK$",
  SGD: "S$",
  TWD: "NT$",
};

/**
 * Format a number as currency
 */
export const formatCurrency = (
  amount: number,
  currency: string = "USD",
  showSymbol: boolean = true
): string => {
  const symbol = currencySymbols[currency] || currency;

  // Format number with commas and 2 decimal places
  const formatted = amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return showSymbol ? `${symbol}${formatted}` : formatted;
};

/**
 * Format currency without symbol
 */
export const formatAmount = (amount: number): string => {
  return formatCurrency(amount, "USD", false);
};

/**
 * Parse currency string to number
 */
export const parseCurrency = (value: string): number => {
  // Remove all non-numeric characters except decimal point and minus
  const cleaned = value.replace(/[^\d.-]/g, "");
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
};

/**
 * Get currency symbol
 */
export const getCurrencySymbol = (currency: string = "USD"): string => {
  return currencySymbols[currency] || currency;
};

/**
 * Get all available currencies
 */
export const getAvailableCurrencies = (): string[] => {
  return Object.keys(currencySymbols);
};
