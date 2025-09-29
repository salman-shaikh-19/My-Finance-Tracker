import React from "react";
import {  useSelector } from "react-redux";
import CustomInfiniteScroll from "../../common/components/CustomInfiniteScroll";
import { commonDate } from "../../../utils/dateUtils";
import {
  expenseCategories,
  getCategoryByName,
} from "../../../utils/Categories"; 
import ExpenseCard from "./ExpenseCard";
import ExpenseChart from "./ExpenseChart";
// import { useRealtimeTable } from "../../../services/useRealtimeTable";

const ExpensesList = ({  expenses }) => {
  const { userCurrency,theme } = useSelector((state) => state.common);
  return (
    <>
    <div
      id="expenses-list"
      className="overflow-auto min-h-[70vh] max-h-[85vh] sm:h-[890px] scrollbar-hide mx-5"
    >
      <ExpenseChart expenses={expenses} />
         
      <CustomInfiniteScroll
        pageSize={20}
        data={expenses}
        scrollTargetId="expenses-list"
      >
        {(items) => (
          <div className="flex flex-wrap gap-1 lg:pl-4">
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
                  theme={theme}
                  type={item.payment_method}
                  date={commonDate({date:item.expense_date})}
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
              </>
  );
};

export default React.memo(ExpensesList);
