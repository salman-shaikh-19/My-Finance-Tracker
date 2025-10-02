import React, { useMemo } from "react";
import { formatCurrency } from "../../../utils/currencyUtils";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
dayjs.extend(isoWeek);

const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const ExpenseTimeLine = ({
  day,
  total,
  expenseLimit,
  userCurrency,
  weekOffset = 0,
}) => {
  const today = dayjs();

  // convert day name to actual date of current week
  //for fill with color means that day is passed or today
  const stepDate = dayjs()
    .add(weekOffset, "week")
    .startOf("isoWeek")
    .add(dayNames.indexOf(day), "day");

  const isActive =
    stepDate.isBefore(today, "day") || stepDate.isSame(today, "day");
  const isOverLimit = total > expenseLimit;

  const { formattedCurrency, title } = useMemo(() => {
    const formattedCurrency = formatCurrency(total, userCurrency);
    const title = isOverLimit
      ? `${day}: ${formattedCurrency} – Exceeded limit of ${formatCurrency(
          expenseLimit,
          userCurrency
        )}!`
      : `${day}: ${formattedCurrency}`;
    return { formattedCurrency, title };
  }, [total, expenseLimit, userCurrency, day, isOverLimit]);

  return (
    
    <li className={`step ${isActive ? "step-primary" : ""}`} title={title}>
      <span
        className={`step-icon !w-6 !h-6  text-xs transition-all duration-500 ease-in-out  ${
          isOverLimit ? "!bg-red-500 text-white" :  ''
        }
        
         transform hover:scale-125 hover:shadow-xl
        `}
      >
        {day}
      </span>
      <span
        className={`text-xs ${
          isOverLimit ? "!text-red-500 font-semibold" : ""
        }`}
      >
        {formattedCurrency}
      </span>
    </li>
  );
};

export default React.memo(ExpenseTimeLine);
