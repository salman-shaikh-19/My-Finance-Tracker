import { MdOutlinePayments } from "react-icons/md";
import { FaMoneyBillWave, FaChartLine, FaPiggyBank, FaRegCreditCard, FaBeer, FaGift, FaCarAlt } from "react-icons/fa";
import { BiRestaurant, BiBus, BiHealth } from "react-icons/bi";
import { GiShoppingCart } from "react-icons/gi";
import { MdOutlineCategory } from "react-icons/md";

// export const expenseCategories = [
//   { name: "Payments", icon: MdOutlinePayments, bg: "bg-primary" },
//   { name: "Food", icon: BiRestaurant, bg: "bg-secondary" },
//   { name: "Transport", icon: BiBus, bg: "bg-accent" },
//   { name: "Shopping", icon: GiShoppingCart, bg: "bg-info" },
//   { name: "Credit Cards", icon: FaRegCreditCard, bg: "bg-warning" },
//   { name: "Other", icon: MdOutlineCategory, bg: "bg-info" },
// ];
export const expenseCategories = [
  { name: "Payments", icon: MdOutlinePayments, bg: "bg-primary" },
  { name: "Food", icon: BiRestaurant, bg: "bg-secondary" },
  { name: "Transport", icon: BiBus, bg: "bg-accent" },
  { name: "Shopping", icon: GiShoppingCart, bg: "bg-info" },
  { name: "Credit Cards", icon: FaRegCreditCard, bg: "bg-warning" },
  { name: "Health", icon: BiHealth, bg: "bg-error" },
  { name: "Entertainment", icon: FaBeer, bg: "bg-success" },
  { name: "Gifts", icon: FaGift, bg: "bg-purple-500" },
  { name: "Vehicle", icon: FaCarAlt, bg: "bg-yellow-500" },
  { name: "Other", icon: MdOutlineCategory, bg: "bg-gray-500" },
];

export const incomeCategories = [
  { name: "Salary", icon: FaMoneyBillWave, bg: "bg-success" },
  { name: "Bonus", icon: FaMoneyBillWave, bg: "bg-accent" },
  { name: "Investments", icon: FaChartLine, bg: "bg-info" },
  { name: "Rental Income", icon: FaPiggyBank, bg: "bg-purple-500" },
  { name: "Other", icon: MdOutlineCategory, bg: "bg-neutral" },
];

export const investmentCategories = [
  { name: "Stocks", icon: FaChartLine, bg: "bg-primary" },
  { name: "Mutual Funds", icon: FaChartLine, bg: "bg-secondary" },
  { name: "Bonds", icon: FaChartLine, bg: "bg-accent" },
  { name: "Other", icon: MdOutlineCategory, bg: "bg-info" },
];
// export const paymentMethods = [
//   { name: "Cash", bg: "bg-primary" },
//   { name: "Card", bg: "bg-secondary" },
//   { name: "UPI", bg: "bg-accent" },
//   { name: "Other", bg: "bg-info" },
// ];
export const paymentMethods = [
  { name: "Cash", bg: "bg-primary" },
  { name: "Card", bg: "bg-secondary" },
  { name: "UPI", bg: "bg-accent" },
  { name: "Net Banking", bg: "bg-green-500" },
  { name: "Wallet", bg: "bg-yellow-500" },
  { name: "Cheque", bg: "bg-purple-500" },
  { name: "Other", bg: "bg-info" },
];

export const savingsCategories = [
  { name: "Emergency Fund", icon: FaPiggyBank, bg: "bg-error" },
  { name: "Retirement", icon: FaPiggyBank, bg: "bg-warning" },
  { name: "Short-term Goals", icon: FaPiggyBank, bg: "bg-success" },
  { name: "Other", icon: MdOutlineCategory, bg: "bg-info" },
];
// Get category object by name
export const getCategoryByName = (object, name) => {
  return (
    object.find((cat) => cat.name.toLowerCase() === name.toLowerCase()) ||
    object.find((cat) => cat.name === "Other")
  );
};
