import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { BiCalendar } from "react-icons/bi";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  Legend,
  XAxis,
  YAxis,
} from "recharts";

import Main from "../../common/layouts/Main";
import StatCard from "./StatCard";
import ChartSkeleton from "./ChartSkeleton";
import CustomCommonTooltipForChart from "../../common/components/charts/CustomCommonTooltipForChart";
import PrevNextButton from "../../common/components/PrevNextButton";
import PerformanceSuggestions from "./PerformanceSuggestions";
import { formatCurrency } from "../../../utils/currencyUtils";

import { getAllExpenses } from "../../expenses/expensesSlice";
import { getAllIncomes } from "../../income/incomeSlice";
import { getAllInvestments } from "../../investments/investmentsSlice";
import { getAllLiabilities } from "../../liabilities/liabilitySlice";
import RecentActivity from "./RecentActivity";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { loggedInUserId, userCurrency,expenseLimit } = useSelector((state) => state.common);

  const { expenses, loading: expensesLoading } = useSelector(
    (state) => state.expenses
  );
  const { incomes, loading: incomesLoading } = useSelector(
    (state) => state.income
  );
  const { investments, loading: investmentsLoading } = useSelector(
    (state) => state.investments
  );
  const { liabilities, loading: liabilitiesLoading } = useSelector(
    (state) => state.liabilities
  );

  const [yearOffset, setYearOffset] = useState(0); // 0 = current year
  const currentYear = dayjs().add(yearOffset, "year").year();
  const custDate = dayjs().add(yearOffset, "year").startOf("year").toDate();

  // sum field values
  const sumBy = (items, key) => {
    if (!items || !items.length) return 0;
    return items.reduce((total, item) => total + (item[key] || 0), 0);
  };

  // fetch all data
  const fetchData = () => {
    if (!loggedInUserId) return;
    dispatch(
      getAllExpenses({
        userId: loggedInUserId,
        wise: "year",
        customWeakDate: custDate,
      })
    );
    dispatch(
      getAllIncomes({
        userId: loggedInUserId,
        wise: "year",
        customWeakDate: custDate,
      })
    );
    dispatch(getAllInvestments({ userId: loggedInUserId, year: currentYear }));
    dispatch(getAllLiabilities({ userId: loggedInUserId, year: currentYear }));
  };

  useEffect(() => {
    fetchData();
  }, [dispatch, loggedInUserId, yearOffset]);

  const months = useMemo(
    () => [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    []
  );

  const chartData = useMemo(() => {
    const getMonthlyTotal = (items, key, dateField) => {
      if (!items || !items.length) return {};
      return items.reduce((acc, item) => {
        const month = dayjs(item[dateField]).format("MMMM");
        const value = Number(item[key] || 0);
        acc[month] = Number(((acc[month] || 0) + value).toFixed(2));
        return acc;
      }, {});
    };

    const incomeMonthly = getMonthlyTotal(
      incomes,
      "income_amount",
      "received_on"
    );
    const expenseMonthly = getMonthlyTotal(expenses, "amount", "expense_date");

    return months.map((month) => ({
      month,
      income_amount: incomeMonthly[month] || 0,
      amount: expenseMonthly[month] || 0,
    }));
  }, [incomes, expenses, months]);

  const calculatePerformanceRating = (incomes, expenses, liabilities) => {
    const totalIncome = sumBy(incomes, "income_amount");
    const totalExpense = sumBy(expenses, "amount");
    const totalLiabilities = sumBy(liabilities, "remaining_amount");

    if (totalIncome === 0) return 1;
    if (totalLiabilities > totalIncome) return 0;

    const savingPercent =
      ((totalIncome - totalExpense - totalLiabilities) / totalIncome) * 100;
    if (savingPercent >= 40) return 5;
    if (savingPercent >= 25) return 4;
    if (savingPercent >= 10) return 3;
    if (savingPercent >= 0) return 2;
    return 1;
  };

  const performanceRating = useMemo(
    () => calculatePerformanceRating(incomes, expenses, liabilities),
    [incomes, expenses, liabilities]
  );

  const refreshData = () => {
    if (!loggedInUserId) return;
    //reset to currrent year

    setYearOffset(0);
    fetchData();
  };
  return (
    <Main mainClassName="p-4">
      <div className="flex justify-between items-center">
        <h2 className="card-title">Dashboard</h2>
        <h3 className=" font-bold ">
          Your Expense Limit: {expenseLimit}
        </h3>
      </div>

      <PrevNextButton
        customLabelDate={new Date(new Date().getFullYear() + yearOffset, 0, 1)}
        offset={yearOffset}
        setPrevOffset={() => setYearOffset((prev) => prev - 1)}
        setNextOffset={() => setYearOffset((prev) => prev + 1)}
        refreshData={refreshData}
        getLabel={(date) => date.getFullYear()}
        disableNext={false}
      />

      <div className="grid grid-cols-1 md:grid-cols-auto lg:grid-cols-3 gap-2 mt-4">
        <StatCard
          cardTitle="Total Income"
          loading={incomesLoading}
          cardContent={
            <span className="text-success text-2xl font-bold">
              {formatCurrency(sumBy(incomes, "income_amount"), userCurrency)}
            </span>
          }
        />

        <StatCard
          cardTitle="Total Expense"
          loading={expensesLoading}
          cardContent={
            <span className="text-error text-2xl font-bold">
              {formatCurrency(sumBy(expenses, "amount"), userCurrency)}
            </span>
          }
        />

        <StatCard
          cardTitle="Total Savings"
          loading={expensesLoading || incomesLoading}
          cardContent={
            <span
              className={`text-2xl font-bold ${sumBy(incomes, "income_amount") - sumBy(expenses, "amount") > 0
                ? "text-success"
                : "text-error"
                }`}
            >
              {formatCurrency(
                sumBy(incomes, "income_amount") - sumBy(expenses, "amount"),
                userCurrency
              )}
            </span>
          }
        />

        <StatCard
          cardTitle="Total Liabilities (Debt)"
          loading={liabilitiesLoading}
          cardContent={
            <span className="text-warning text-2xl font-bold">
              {formatCurrency(
                sumBy(liabilities, "remaining_amount"),
                userCurrency
              )}
            </span>
          }
        />

        <StatCard
          cardTitle="Total Investments"
          loading={investmentsLoading}
          cardContent={
            <span className="text-primary text-2xl font-bold">
              {formatCurrency(
                sumBy(investments, "invested_amount"),
                userCurrency
              )}
            </span>
          }
        />
{(incomes.length || expenses.length || liabilities.length) > 0 ? (
  <StatCard
    cardTitle="Your Performance"
    loading={expensesLoading || incomesLoading || liabilitiesLoading}
   
    cardContent={
      <div
        className="tooltip tooltip-bottom tooltip-primary flex flex-col md:flex-row items-start md:items-center gap-2"
        data-tip="Performance based on your income, expenses, and liabilities"
      >
        <div className="rating">
          {[1, 2, 3, 4, 5].map((num) => (
            <input
              key={num}
              type="radio"
              name="rating"
              className="mask mask-star-2 bg-orange-400"
              checked={num === performanceRating}
              readOnly
            />
          ))}
        </div>
        <div className="flex flex-col gap-1">
          <p
            className={`text-xs lg:text-sm ${
              performanceRating >= 4
                ? "text-success"
                : performanceRating === 3
                ? "text-warning"
                : performanceRating === 2
                ? "text-error"
                : performanceRating === 0
                ? "text-info"
                : "text-info"
            }`}
          >
            {performanceRating >= 4
              ? "Excellent money management!"
              : performanceRating === 3
              ? "Average — room to improve."
              : performanceRating === 2
              ? "Watch your expenses!"
              : performanceRating === 0
              ? "You are in debt!"
              : "Overspending detected!"}
          </p>
          <PerformanceSuggestions performanceRating={performanceRating} />
        </div>
      </div>
    }
  />
) : (
  <StatCard
    cardTitle="Your Performance"
    loading={investmentsLoading}
    cardContent={<p className="">No data available</p>}
  />
)}

      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
        {/* Chart */}
        <div className="w-full h-[500px] p-4 bg-base-100 rounded-lg shadow-lg lg:col-span-2">
          {expensesLoading || incomesLoading ? (
            <ChartSkeleton containerHeight={480} />
          ) : (
            <ResponsiveContainer width="100%" height={480}>
              <BarChart data={chartData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip content={<CustomCommonTooltipForChart />} />
                <Legend />
                <Bar dataKey="income_amount" name="Income" fill="green" />
                <Bar dataKey="amount" name="Expense" fill="red" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* recent activity */}
        <RecentActivity
          expenses={expenses}
          incomes={incomes}
          userCurrency={userCurrency}
          loading={expensesLoading || incomesLoading || liabilitiesLoading || investmentsLoading}
        />
      </div>

    </Main>
  );
};

export default Dashboard;
