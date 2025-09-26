import { MdOutlinePayments } from "react-icons/md";
import { FaMoneyBillWave, FaChartLine, FaPiggyBank, FaRegCreditCard } from "react-icons/fa";
import { BiRestaurant, BiBus } from "react-icons/bi";
import { GiShoppingCart } from "react-icons/gi";
import { MdOutlineCategory } from "react-icons/md";

export const expenseCategories = [
  { name: "Payments", icon: MdOutlinePayments },
  { name: "Food", icon: BiRestaurant },
  { name: "Transport", icon: BiBus },
  { name: "Shopping", icon: GiShoppingCart },
  { name: "Credit Cards", icon: FaRegCreditCard },
  { name: "Other", icon: MdOutlineCategory },
];

export const incomeCategories = [
  { name: "Salary", icon: FaMoneyBillWave },
  { name: "Bonus", icon: FaMoneyBillWave },
  { name: "Investments", icon: FaChartLine },
  { name: "Other", icon: MdOutlineCategory },
];

export const investmentCategories = [
  { name: "Stocks", icon: FaChartLine },
  { name: "Mutual Funds", icon: FaChartLine },
  { name: "Bonds", icon: FaChartLine },
  { name: "Other", icon: MdOutlineCategory },
];

export const savingsCategories = [
  { name: "Emergency Fund", icon: FaPiggyBank },
  { name: "Retirement", icon: FaPiggyBank },
  { name: "Short-term Goals", icon: FaPiggyBank },
  { name: "Other", icon: MdOutlineCategory },
];

// Get category object by name
export const getCategoryByName = (object, name) => {
  return (
    object.find((cat) => cat.name.toLowerCase() === name.toLowerCase()) ||
    object.find((cat) => cat.name === "Other")
  );
};
