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
import { useRealtimeTable } from "../../../services/useRealtimeTable";

const ExpensesList = ({ userId,expenses }) => {
  const dispatch = useDispatch();

   const { userCurrency } = useSelector((state) => state.common);
   useEffect(() => {
    if (!userId) return;
    dispatch(getAllExpenses(userId));
  }, [dispatch, userId]);

 //custom hook 
    useRealtimeTable(
      "user_expenses", //pasing table name
      { column: "user_id", value: userId },
      () => dispatch(getAllExpenses(userId))
    );
  

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
