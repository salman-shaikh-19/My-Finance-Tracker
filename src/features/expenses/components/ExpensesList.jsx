import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllExpenses } from "../expensesSlice";
import CustomInfiniteScroll from "../../common/components/CustomInfiniteScroll";
import { commonDate } from "../../../utils/dateUtils";
import {
  expenseCategories,
  getCategoryByName,
} from "../../../utils/Categories"; // import categories
import supabase from "../../../services/supabaseClient";

const ExpensesList = ({ userId }) => {
  const dispatch = useDispatch();
  const { expenses, loading, error } = useSelector((state) => state.expenses);

  // useEffect(() => {
  //   if (userId) dispatch(getAllExpenses(userId));
  // }, [dispatch, userId]);
   useEffect(() => {
    if (!userId) return;


    dispatch(getAllExpenses(userId));


    const channel = supabase
      .channel("expenses-realtime")
      .on(
        "postgres_changes",
        {
          event: "*", // add/edit/deleet
          schema: "public",
          table: "user_expenses",
          filter: `user_id=eq.${userId}`,
        },
        () => {
        
          dispatch(getAllExpenses(userId));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel); 
    };
  }, [dispatch, userId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div id="expenses-list">
      <CustomInfiniteScroll
        pageSize={10}
        data={expenses}
        scrollTargetId={"expenses-list"}
      >
        {(items) => (
          <div className="flex flex-wrap justify-center">
            {items.map((item) => {
              const category = getCategoryByName(
                expenseCategories,
                item.expense_category
              );
              const Icon = category.icon;

              return (
                <div
                  key={item.id}
                  className="m-2 p-2 border rounded w-60 flex flex-col gap-1"
                >
                  <div className="flex items-center gap-2">
                    <Icon className="text-6xl" />
                    <span className="font-semibold">{category.name}</span>
                  </div>
                  <p>
                    <strong>Amount:</strong> {item.amount}
                  </p>
                  <p>
                    <strong>Date:</strong> {commonDate(item.expense_date)}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </CustomInfiniteScroll>
    </div>
  );
};

export default React.memo(ExpensesList);
