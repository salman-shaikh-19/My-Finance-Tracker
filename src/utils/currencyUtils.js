
export const currencySymbols = [
  { code: "INR", symbol: "₹" },
  { code: "USD", symbol: "$" },
  { code: "EUR", symbol: "€" },
  { code: "GBP", symbol: "£" },
  { code: "JPY", symbol: "¥" },
  
];
// format amount with symbol
export function formatCurrency(amount, currency = "INR") {
  // find the symbol for the given currency code
  const currencyObj = currencySymbols.find((c) => c.code === currency);
  const symbol = currencyObj ? currencyObj.symbol : "";

  // format number with commas
  const formattedAmount = new Intl.NumberFormat(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);

  return `${symbol}${formattedAmount}`;
}

