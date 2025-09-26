import React from "react";
import Main from "../../common/layouts/Main";
import ExpensesList from "./ExpensesList";
import { useSelector } from "react-redux";

const ExpensesPage = () => {
  const { loggedInUserId } = useSelector((state) => state.common);
  const { expenses } = useSelector((state) => state.expenses);
  return (
    <>
      <Main>
        <ExpensesList userId={loggedInUserId} expenses={expenses} />
      </Main>
    </>
  );
};

export default React.memo(ExpensesPage);
