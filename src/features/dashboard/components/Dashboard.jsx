import { Link } from "react-router-dom";
import Main from "../../common/layouts/Main";
import { useDispatch, useSelector } from "react-redux";
import { getAllExpenses } from "../../expenses/expensesSlice";
import { getAllIncomes } from "../../income/incomeSlice";
import { getAllInvestments } from "../../investments/investmentsSlice";
import { getAllLiabilities } from "../../liabilities/liabilitySlice";
import { useEffect, useMemo } from "react";
import { formatCurrency } from "../../../utils/currencyUtils";
import dayjs from "dayjs";
import { BiCalendar, BiLineChartDown } from "react-icons/bi";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import StatCard from "./StatCard";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import CustomCommonTooltipForChart from "../../common/components/charts/CustomCommonTooltipForChart";
import ChartSkeleton from './ChartSkeleton';
import { PiChartLineUp } from "react-icons/pi";
const Dashboard = () => {
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
  const { loggedInUserId, userCurrency } = useSelector((state) => state.common);
  const dispatch = useDispatch();
  const chartHeight = 400;
  const init = () => {
    if (!loggedInUserId) return;
    dispatch(getAllExpenses({ userId: loggedInUserId, wise: "year" }));
    dispatch(getAllIncomes({ userId: loggedInUserId, wise: "year" }));
    dispatch(getAllInvestments({ userId: loggedInUserId }));
    dispatch(getAllLiabilities({ userId: loggedInUserId }));
  };

  useEffect(() => {
    init();
  }, [dispatch, loggedInUserId]);

  const totalOf = (items, key) => {
    if (!items || !items.length) return 0;
    return items
      .reduce((total, item) => total + (item[key] || 0), 0)
      .toFixed(2);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const data = useMemo(() => {
    const getMonthlyTotal = (items, key, dateField) => {
      if (!items || !items.length) return {};
      return items.reduce((acc, item) => {
        const month = dayjs(item[dateField]).format("MMMM");
        const value = Number(item[key] || 0);
        acc[month] = Number(((acc[month] || 0) + value).toFixed(2));
        return acc;
      }, {});
    };

    const incomeMonthly = getMonthlyTotal(incomes, "income_amount", "received_on");
    const expenseMonthly = getMonthlyTotal(expenses, "amount", "expense_date");

    return months.map((month) => ({
      month,
      income_amount: incomeMonthly[month] || 0,
      amount: expenseMonthly[month] || 0,
    }));
  }, [incomes, expenses, months]);

  const calculatePerformanceRating = (incomes, expenses) => {
    const totalIncome = incomes.reduce((t, i) => t + (i.income_amount || 0), 0);
    const totalExpense = expenses.reduce((t, e) => t + (e.amount || 0), 0);


    if (totalIncome === 0) return 1; // no income, base rating

    const savings = totalIncome - totalExpense;

    // ratio of savings to income (in %)
    const savingPercent = (savings / totalIncome) * 100;

    
    if (savingPercent >= 40) return 5; // excellent
    if (savingPercent >= 25) return 4; // good
    if (savingPercent >= 10) return 3; // average
    if (savingPercent >= 0) return 2; // poor
    return 1; // negative savings (overspending)
  };
  const performanceRating = useMemo(() =>
    calculatePerformanceRating(incomes, expenses),
    [incomes, expenses]
  );


  return (
    <Main mainClassName="p-4 ">


      <div className="flex  justify-between">
        <h2 className="card-title">Dashboard</h2>
        <h3 className="text-xl font-bold flex items-center gap-1">
          <BiCalendar /> {dayjs().format("YYYY")}
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-4">
        <StatCard
          cardTitle="Total Income"

          loading={incomesLoading}
          cardContent={
            <span className="text-success text-2xl font-bold ">
              {formatCurrency(
                totalOf(incomes, "income_amount"),
                userCurrency
              )}
            </span>
          }
        />
        <StatCard
          cardTitle="Total Expense"
          loading={expensesLoading}
          cardContent={
            <span className="text-error text-2xl font-bold ">
              {formatCurrency(totalOf(expenses, "amount"), userCurrency)}
            </span>
          }
        />
        <StatCard
          cardTitle="Total Savings"
          loading={incomesLoading || expensesLoading}
          cardContent={
            <span className={` text-2xl font-bold ${totalOf(incomes, "income_amount") -
            totalOf(expenses, "amount") > 0 ? "text-success" : "text-error"}`}>
              {formatCurrency(
                totalOf(incomes, "income_amount") -
                totalOf(expenses, "amount"),
                userCurrency
              )}

            </span>
          }
        />
        <StatCard
          cardTitle="Total Liabilities (Debt)"
          loading={liabilitiesLoading}
          cardContent={
            <span className="text-warning text-2xl font-bold ">
              {formatCurrency(
                totalOf(liabilities, "remaining_amount"),
                userCurrency
              )}
            </span>
          }
        />
        <StatCard
          cardTitle="Total Investments"
          additionalClass=""
          loading={investmentsLoading}
          cardContent={
            <span className="text-primaryc text-2xl font-bold ">
              {formatCurrency(
                totalOf(investments, "invested_amount"),
                userCurrency
              )}
            </span>
          }
        />
        <StatCard
          cardTitle="Your Performance"
          loading={expensesLoading || incomesLoading}
          cardContent={
            <>
              <div className="tooltip   tooltip-bottom tooltip-primary flex items-center gap-2" data-tip="Performance based on your income and expenses">
                <div className="rating   ">
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
                <p className={`text-sm badge ${performanceRating >= 4 ? "badge-success" : performanceRating === 3 ? "badge-warning" : performanceRating === 2 ? "badge-error" : "badge-info"}`}>
                  {performanceRating >= 4
                    ? "Excellent money management!"
                    : performanceRating === 3
                      ? "Average — room to improve."
                      : performanceRating === 2
                        ? "Watch your expenses!"
                        : "Overspending detected!"}
                </p>
              </div>
            </>
          }
        />
      </div>


      <div className="card shadow-lg bg-base-200 mt-3 p-3">
        {
          expensesLoading || incomesLoading ? (
            <ChartSkeleton containerHeight={chartHeight} />
          ) : (
            <ResponsiveContainer width="100%" height={chartHeight}>
              <BarChart data={data}  >
                {/* <CartesianGrid strokeDasharray="3 3" /> */}
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip content={<CustomCommonTooltipForChart />} />
                <Legend />
                <Bar dataKey="income_amount" name="Income" fill="green" />
                <Bar dataKey="amount" name="Expense" fill="red" />
              </BarChart>
            </ResponsiveContainer>
          )
        }
      </div>


    </Main>
  );
};

export default Dashboard;
