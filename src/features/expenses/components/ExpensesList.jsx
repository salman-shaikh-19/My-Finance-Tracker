import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllExpenses } from "../expensesSlice";
import CustomInfiniteScroll from "../../common/components/CustomInfiniteScroll";
import dayjs from "dayjs";
import { commonDate } from "../../../utils/dateUtils";

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
 <div id="expenses-list">
<CustomInfiniteScroll
  pageSize={10}
  data={expenses}
  scrollTargetId={"expenses-list"}
>
  {(items) => (
    <div className="d-flex flex-wrap justify-content-center">
      {items.map((item) => (
        <div key={item.id} className="m-2 p-2 border rounded w-60">
          <p><strong>Amount:</strong> {item.amount}</p>
          <p><strong>Description:</strong> {item.expense_category}</p>
         <p><strong>Date:</strong> {commonDate(item.expense_date)}</p>
        </div>
      ))}
    </div>
  )}
</CustomInfiniteScroll>

 </div>

 </>
   
  );
};

export default React.memo(ExpensesList);
