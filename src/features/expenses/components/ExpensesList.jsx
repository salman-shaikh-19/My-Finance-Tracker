import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllExpenses } from "../expensesSlice";

const ExpensesList = ({ userId }) => {
  const dispatch = useDispatch();

  const { expenses, loading, error } = useSelector((state) => state.expenses);

  useEffect(() => {
    if (userId) dispatch(getAllExpenses(userId));
  }, [dispatch, userId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
 <>
 
 {expenses.map((exp) => (
   <li key={exp.id}>
     {exp.amount} - {exp.expense_category} - {exp.expense_date} -{exp.payment_method}
   </li>
 ))}

 </>
   
  );
};

export default React.memo(ExpensesList);
