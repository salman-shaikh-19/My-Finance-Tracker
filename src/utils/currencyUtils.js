
export const currencySymbols = [
  { code: "INR", symbol: "₹" },
  { code: "USD", symbol: "$" },
  { code: "EUR", symbol: "€" },
  { code: "GBP", symbol: "£" },
  { code: "JPY", symbol: "¥" },
  
];
// format amount with symbol
export function formatCurrency(amount, currency = "INR") {

  const currencyObj = currencySymbols.find((c) => c.code === currency);
  const symbol = currencyObj ? currencyObj.symbol : "";

  // format number with commas
  const formattedAmount = new Intl.NumberFormat(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);

  return `${symbol}${formattedAmount}`;
}
// export const currencySymbols = [
//   { code: "INR", symbol: "₹" },
//   { code: "USD", symbol: "$" },
//   { code: "EUR", symbol: "€" },
//   { code: "GBP", symbol: "£" },
//   { code: "JPY", symbol: "¥" },
// ];

// // conversion rates (default = INR)
// const conversionRates = {
//   INR: 1,
//   USD: 0.012,
//   EUR: 0.011,
//   GBP: 0.0097,
//   JPY: 1.78,
// };


// let defaultCurrency = "INR";
// export const setDefaultCurrency = (currency) => {
//   defaultCurrency = currency;
// };

// export function formatCurrency(amount, currency) {
//   const targetCurrency = currency || defaultCurrency;
//   const convertedAmount = (amount || 0) * (conversionRates[targetCurrency] || 1);

//   const currencyObj = currencySymbols.find((c) => c.code === targetCurrency);
//   const symbol = currencyObj ? currencyObj.symbol : "";

//   const formattedAmount = new Intl.NumberFormat(undefined, {
//     minimumFractionDigits: 0,
//     maximumFractionDigits: 2,
//   }).format(convertedAmount);

//   return `${symbol}${formattedAmount}`;
// }

