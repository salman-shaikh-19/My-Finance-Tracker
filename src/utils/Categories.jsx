import { MdOutlinePayments } from "react-icons/md";
import { FaMoneyBillWave, FaChartLine, FaPiggyBank, FaRegCreditCard } from "react-icons/fa";
import { BiRestaurant, BiBus } from "react-icons/bi";
import { GiShoppingCart } from "react-icons/gi";
import { MdOutlineCategory } from "react-icons/md";

export const expenseCategories = [
  { name: "Payments", icon: MdOutlinePayments, bg: "bg-primary" },
  { name: "Food", icon: BiRestaurant, bg: "bg-secondary" },
  { name: "Transport", icon: BiBus, bg: "bg-accent" },
  { name: "Shopping", icon: GiShoppingCart, bg: "bg-info" },
  { name: "Credit Cards", icon: FaRegCreditCard, bg: "bg-warning" },
  { name: "Other", icon: MdOutlineCategory, bg: "bg-info" },
];

export const incomeCategories = [
  { name: "Salary", icon: FaMoneyBillWave, bg: "bg-success" },
  { name: "Bonus", icon: FaMoneyBillWave, bg: "bg-accent" },
  { name: "Investments", icon: FaChartLine, bg: "bg-info" },
  { name: "Other", icon: MdOutlineCategory, bg: "bg-neutral" },
];

export const investmentCategories = [
  { name: "Stocks", icon: FaChartLine, bg: "bg-primary" },
  { name: "Mutual Funds", icon: FaChartLine, bg: "bg-secondary" },
  { name: "Bonds", icon: FaChartLine, bg: "bg-accent" },
  { name: "Other", icon: MdOutlineCategory, bg: "bg-info" },
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
