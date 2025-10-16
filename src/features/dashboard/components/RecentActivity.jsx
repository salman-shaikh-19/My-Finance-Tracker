import React from "react";
import dayjs from "dayjs";
import { formatCurrency } from "../../../utils/currencyUtils";

const RecentActivity = ({ expenses, incomes, userCurrency, loading }) => {
  const combinedData = [
    ...expenses.map((i) => ({ ...i, type: "expense", date: i.expense_date, amount: i.amount })),
    ...incomes.map((i) => ({ ...i, type: "income", date: i.received_on, amount: i.income_amount })),
  ]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 10);


    
  return (
    <div className="w-full h-[500px] p-4 bg-base-100 rounded-lg shadow-lg overflow-auto lg:col-span-1  scrollbar-hide">
      <h3 className="text-lg font-bold mb-3">Recent Income & Expense</h3>
        
      {loading ? (
        <ul className="space-y-2">
          {[...Array(8)].map((_, idx) => (
            <li key={idx} className="py-2 flex justify-between items-center animate-pulse">
              <div className="flex flex-col gap-1">
                <div className="h-4 w-20 bg-base-200 rounded"></div>
                <div className="h-3 w-16 bg-base-100 rounded"></div>
              </div>
              <div className="h-4 w-12 bg-base-200 rounded"></div>
            </li>
          ))}
        </ul>
      ) : (
        <ul className="divide-y divide-gray-200 dark:divide-gray-700 ">
          {combinedData.map((item) => (
            <li key={item.id} className="py-2 flex justify-between items-center">
              <div className="flex flex-col">
                <span className="font-medium">{item.type === "income" ? "Income" : "Expense"}</span>
                <span className="text-sm text-gray-500">
                  {dayjs(item.date).format("DD MMM, YYYY")}
                </span>
              </div>
              <span
                className={`font-bold ${item.type === "income" ? "text-success" : "text-error"}`}
              >
                {formatCurrency(item.amount, userCurrency)}
         
        
        
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default React.memo(RecentActivity);
