import React, { useEffect } from "react";
import Main from "../../common/layouts/Main";
import ExpensesList from "./ExpensesList";
import { useDispatch, useSelector } from "react-redux";
import { useRealtimeTable } from "../../../services/useRealtimeTable";
import { getAllExpenses } from "../expensesSlice";
import ExpenseChart from "./ExpenseChart";

const ExpensesPage = () => {
  const { loggedInUserId } = useSelector((state) => state.common);
  const { expenses } = useSelector((state) => state.expenses);
    const dispatch = useDispatch();

  useEffect(() => {
    if (!loggedInUserId) return;
    dispatch(getAllExpenses(loggedInUserId));
  }, [dispatch, loggedInUserId]);

  //custom hook
  useRealtimeTable(
    "user_expenses", //pasing table name
    { column: "user_id", value: loggedInUserId },
    () => dispatch(getAllExpenses(loggedInUserId))
  );
  return (
    <>
      <Main>
     
        <ExpensesList userId={loggedInUserId} expenses={expenses} />
      </Main>
    </>
  );
};

export default React.memo(ExpensesPage);
