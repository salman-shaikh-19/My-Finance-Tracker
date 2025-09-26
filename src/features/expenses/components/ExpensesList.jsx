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
import { BiHome } from "react-icons/bi";
import ExpenseCard from "./ExpenseCard";

const ExpensesList = ({ userId }) => {
  const dispatch = useDispatch();
  const { expenses, loading, error } = useSelector((state) => state.expenses);
   const { userCurrency } = useSelector((state) => state.common);
   
   
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
          event: "*", // fetch all data on add/edit/deleet event
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
<div
  id="expenses-list"
  className="overflow-auto min-h-[70vh] max-h-[85vh] sm:h-[890px] scrollbar-hide"
>
      <CustomInfiniteScroll
        pageSize={20}
        data={expenses}
        scrollTargetId="expenses-list"
      >
        {(items) => (
          <div className="flex flex-wrap justify-center gap-2">
            {items.map((item) => {
              const category = getCategoryByName(
                expenseCategories,
                item.expense_category
              );
              const Icon = category.icon;

              return (
           
                <ExpenseCard 
                key={item.id}
                category={category.name}
                amount={item.amount}
                type={item.payment_method}
                date= {commonDate(item.expense_date)}
                bgColor={category.bg} 
                Icon={Icon} 
                userCurrency={userCurrency}
              />
              );
            })}
          </div>
        )}
      </CustomInfiniteScroll>

    </div>
  );
};

export default React.memo(ExpensesList);
