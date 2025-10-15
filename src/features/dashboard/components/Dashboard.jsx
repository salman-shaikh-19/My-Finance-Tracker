import { Link } from "react-router-dom";
import Main from "../../common/layouts/Main";
import { useDispatch, useSelector } from "react-redux";
import { getAllExpenses } from "../../expenses/expensesSlice";
import { getAllIncomes } from "../../income/incomeSlice";
import { getAllInvestments } from "../../investments/investmentsSlice";
import { getAllLiabilities } from "../../liabilities/liabilitySlice";
import { useEffect } from "react";
import { formatCurrency } from "../../../utils/currencyUtils";
import dayjs from "dayjs";
import { BiCalendar } from "react-icons/bi";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';
import TotalOfCard from "./TotalOfCard";

const Dashboard = () => {
  const { expenses, loading: expensesLoading } = useSelector((state) => state.expenses);
  const { incomes, loading: incomesLoading } = useSelector((state) => state.income);
  const { investments, loading: investmentsLoading } = useSelector((state) => state.investments);
  const { liabilities, loading: liabilitiesLoading } = useSelector((state) => state.liabilities);
  const { loggedInUserId, userCurrency } = useSelector((state) => state.common);
  const dispatch = useDispatch();

  const init = () => {
    if (!loggedInUserId) return;
    dispatch(getAllExpenses({ userId: loggedInUserId, wise: 'year' }));
    dispatch(getAllIncomes({ userId: loggedInUserId, wise: 'year' }));
    dispatch(getAllInvestments({ userId: loggedInUserId }));
    dispatch(getAllLiabilities({ userId: loggedInUserId }));
  };

  useEffect(() => {
    init();
  }, [dispatch, loggedInUserId]);

  const totalOf = (items, key) => {
    if (!items || !items.length) return 0;
    return items.reduce((total, item) => total + (item[key] || 0), 0).toFixed(2);
  };

  const loading = expensesLoading || incomesLoading || investmentsLoading || liabilitiesLoading;

  const cards = [
    { title: "Total Income", value: formatCurrency(totalOf(incomes, 'income_amount'), userCurrency), color: "text-success" },
    { title: "Total Expense", value: formatCurrency(totalOf(expenses, 'amount'), userCurrency), color: "text-error" },
    { title: "Total Liabilities", value: formatCurrency(totalOf(liabilities, 'remaining_amount'), userCurrency), color: "text-warning" },
    { title: "Total Investments", value: formatCurrency(totalOf(investments, 'invested_amount'), userCurrency), color: "text-primary" },
    { title: "Total Savings", value: formatCurrency(totalOf(incomes, 'income_amount') - totalOf(expenses, 'amount'), userCurrency), color: "text-info" },
  ];

  return (
    <Main>
      <div className="text-center flex flex-col items-center justify-center gap-4">
        <div className="card w-full bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex justify-between">
              <h2 className="card-title">Dashboard</h2>
              <h3 className="text-xl font-bold flex items-center gap-1">
                <BiCalendar /> {dayjs().format("YYYY")}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
  <TotalOfCard
    cardTitle="Total Income"
    loading={incomesLoading}
    cardTotal={ <span className="text-success">{formatCurrency(totalOf(incomes, 'income_amount'), userCurrency)}</span>}
  />
  <TotalOfCard
    cardTitle="Total Expense"
    loading={expensesLoading}
    cardTotal={ <span className="text-error">{formatCurrency(totalOf(expenses, 'amount'), userCurrency)}</span>}
  />
  <TotalOfCard
    cardTitle="Total Liabilities"
    loading={liabilitiesLoading}
    cardTotal={<span className="text-warning">{formatCurrency(totalOf(liabilities, 'remaining_amount'), userCurrency)}</span>}
  />
  <TotalOfCard
    cardTitle="Total Investments"
    loading={investmentsLoading}
    cardTotal={ <span className="text-primary">{formatCurrency(totalOf(investments, 'invested_amount'), userCurrency)}</span>}
  />
  <TotalOfCard
    cardTitle="Total Savings"
    loading={incomesLoading || expensesLoading}
    cardTotal={ <span className="text-info">{formatCurrency(totalOf(incomes, 'income_amount') - totalOf(expenses, 'amount'), userCurrency)}</span>}
  />
</div>

          </div>
        </div>
      </div>
    </Main>
  );
};

export default Dashboard;
