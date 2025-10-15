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
import { BiCalendar } from "react-icons/bi";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import TotalOfCard from "./TotalOfCard";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import CustomCommonTooltipForChart from "../../common/components/charts/CustomCommonTooltipForChart";

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



  return (
    <Main>
   
        
            <div className="flex  justify-between">
              <h2 className="card-title">Dashboard</h2>
              <h3 className="text-xl font-bold flex items-center gap-1">
                <BiCalendar /> {dayjs().format("YYYY")}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 mt-4">
              <TotalOfCard
                cardTitle="Total Income"
                loading={incomesLoading}
                cardTotal={
                  <span className="text-success">
                    {formatCurrency(
                      totalOf(incomes, "income_amount"),
                      userCurrency
                    )}
                  </span>
                }
              />
              <TotalOfCard
                cardTitle="Total Expense"
                loading={expensesLoading}
                cardTotal={
                  <span className="text-error">
                    {formatCurrency(totalOf(expenses, "amount"), userCurrency)}
                  </span>
                }
              />
              <TotalOfCard
                cardTitle="Total Liabilities"
                loading={liabilitiesLoading}
                cardTotal={
                  <span className="text-warning">
                    {formatCurrency(
                      totalOf(liabilities, "remaining_amount"),
                      userCurrency
                    )}
                  </span>
                }
              />
              <TotalOfCard
                cardTitle="Total Investments"
                loading={investmentsLoading}
                cardTotal={
                  <span className="text-primary">
                    {formatCurrency(
                      totalOf(investments, "invested_amount"),
                      userCurrency
                    )}
                  </span>
                }
              />
              <TotalOfCard
                cardTitle="Total Savings"
                loading={incomesLoading || expensesLoading}
                cardTotal={
                  <span className="text-info">
                    {formatCurrency(
                      totalOf(incomes, "income_amount") -
                      totalOf(expenses, "amount"),
                      userCurrency
                    )}
                  </span>
                }
              />
            </div>
            <div>
              {/* display income vs expense data in bar chart with line  chart */}
            </div>
              <div className="card shadow-lg bg-base-200 mt-3 p-3">
                <ResponsiveContainer  width="100%" height={300}>
                  <BarChart data={data}>
                    {/* <CartesianGrid strokeDasharray="3 3" /> */}
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip content={<CustomCommonTooltipForChart />} />
                    <Legend />
                    <Bar dataKey="income_amount" fill="green" />
                    <Bar dataKey="amount" fill="red" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
       
       
    </Main>
  );
};

export default Dashboard;
