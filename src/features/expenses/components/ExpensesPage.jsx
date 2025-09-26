import React from "react";
import Main from "../../common/layouts/Main";
import ExpensesList from "./ExpensesList";
import { useSelector } from "react-redux";

const ExpensesPage=()=>{
      const {loggedInUserId}=useSelector(state=>state.common);
    return (
        <>
        <Main>
            <ExpensesList userId={loggedInUserId} />
        </Main>
        </>
    )

}

export default React.memo(ExpensesPage);