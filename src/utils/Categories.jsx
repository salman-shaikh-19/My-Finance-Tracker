import { MdOutlinePayments } from "react-icons/md";
import {
  FaMoneyBillWave,
  FaChartLine,
  FaPiggyBank,
  FaRegCreditCard,
  FaBeer,
  FaGift,
  FaCarAlt,
  FaPlane,
  FaHome,
  FaLaptop,
  FaBriefcase,
  FaHandHoldingUsd,
  FaCreditCard,
  FaMobileAlt,
  FaUniversity,
  FaWallet,
  FaRegFileAlt,
  FaQuestionCircle,
  FaLandmark,
  FaBitcoin,
} from "react-icons/fa";
import { BiRestaurant, BiBus, BiHealth, BiBook } from "react-icons/bi";
import { GiGoldBar, GiMoneyStack, GiShoppingCart } from "react-icons/gi";
import { MdOutlineCategory } from "react-icons/md";
import { FaRegMoneyBill1 } from "react-icons/fa6";
import { TbBuildingBank } from "react-icons/tb";

// expense category
export const expenseCategories = [
  { name: "Payments", icon: MdOutlinePayments, bg: "bg-primary" },
  { name: "Food", icon: BiRestaurant, bg: "bg-secondary" },
  // { name: "Transport", icon: BiBus, bg: "bg-accent" },
  { name: "Shopping", icon: GiShoppingCart, bg: "bg-info" },
  { name: "Credit Cards", icon: FaRegCreditCard, bg: "bg-warning" },
  { name: "Health", icon: BiHealth, bg: "bg-error" },
  { name: "Entertainment", icon: FaBeer, bg: "bg-success" },
  { name: "Gifts", icon: FaGift, bg: "bg-purple-500" },
  { name: "Vehicle", icon: FaCarAlt, bg: "bg-yellow-500" },
  { name: "Education", icon: BiBook, bg: "bg-indigo-500" },
  { name: "Travel", icon: FaPlane, bg: "bg-pink-500" },
  { name: "Home", icon: FaHome, bg: "bg-emerald-500" },
  // { name: "Electronics", icon: FaLaptop, bg: "bg-teal-500" },
  { name: "Other", icon: MdOutlineCategory, bg: "bg-gray-500" },
];

export const incomeCategories = [
  { name: "Salary", icon: FaMoneyBillWave, bg: "bg-success" },
  { name: "Bonus", icon: FaHandHoldingUsd, bg: "bg-accent" },
  { name: "Business", icon: FaBriefcase, bg: "bg-warning" },
  { name: "Investments", icon: FaChartLine, bg: "bg-info" },
  { name: "Rental Income", icon: FaPiggyBank, bg: "bg-purple-500" },
  // { name: "Gifts", icon: FaGift, bg: "bg-secondary" },
  { name: "Other", icon: MdOutlineCategory, bg: "bg-gray-500" },
];

export const investmentCategories = [
  { name: "Stock", icon: FaChartLine, bg: "bg-primary" },
  { name: "Mutual Fund", icon: GiMoneyStack, bg: "bg-secondary" },
  { name: "Bonds", icon: FaLandmark, bg: "bg-accent" },
  { name: "Real Estate", icon: FaHome, bg: "bg-info" },
  { name: "Cryptocurrency", icon: FaBitcoin, bg: "bg-warning" },
  { name: "Fixed Deposit", icon: TbBuildingBank, bg: "bg-success" },
  { name: "Gold", icon: GiGoldBar, bg: "bg-amber-500" },
  { name: "Other", icon: MdOutlineCategory, bg: "bg-info" },
];

export const paymentMethods = [
  { name: "Cash", icon: FaMoneyBillWave, bg: "bg-primary" },
  { name: "Card", icon: FaCreditCard, bg: "bg-secondary" },
  { name: "UPI", icon: FaMobileAlt, bg: "bg-accent" },
  { name: "Net Banking", icon: FaUniversity, bg: "bg-green-500" },
  { name: "Wallet", icon: FaWallet, bg: "bg-yellow-500" },
  { name: "Cheque", icon: FaRegFileAlt, bg: "bg-purple-500" },
  { name: "Other", icon: FaRegMoneyBill1, bg: "bg-info" },
];

export const liabilitesCategories = [
  { name: "Credit Card", icon: FaRegCreditCard, bg: "bg-primary" },
  { name: "Personal Loan", icon: FaHandHoldingUsd, bg: "bg-secondary" },
  { name: "Home Loan", icon: FaHome, bg: "bg-success" },
  { name: "Borrowed Money", icon: FaHandHoldingUsd, bg: "bg-warning" },
  { name: "Mortgage", icon: FaHome, bg: "bg-accent" },
  { name: "Auto Loan", icon: FaCarAlt, bg: "bg-info" },
  { name: "Student Loan", icon: BiBook, bg: "bg-warning" },
  { name: "Other", icon: MdOutlineCategory, bg: "bg-info" },
];

// Get category object by name
export const getCategoryByName = (object, name) => {
  return (
    object.find((cat) => cat.name.toLowerCase() === name.toLowerCase()) ||
    object.find((cat) => cat.name === "Other")
  );
};
