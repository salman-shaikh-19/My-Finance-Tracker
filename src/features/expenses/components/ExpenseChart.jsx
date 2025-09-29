// import React, { useMemo, useState } from "react";
// import dayjs from "dayjs";
// import isoWeek from "dayjs/plugin/isoWeek";
// import isBetween from "dayjs/plugin/isBetween";
// import { BiBarChartAlt, BiLineChart, BiPieChartAlt2 } from "react-icons/bi";
// import CustomLineChart from "../../common/components/charts/CustomLineChart";
// import CustomBarChart from "../../common/components/charts/CustomBarChart";
// import CustomPieChart from "../../common/components/charts/CustomPieChart";

// dayjs.extend(isoWeek);
// dayjs.extend(isBetween);

// const ExpenseChart = ({ expenses = [] }) => {
//   const [currentChart, setCurrentChart] = useState("bar");
//   const [weekOffset, setWeekOffset] = useState(0); // 0 mean current week, -1 mean prev week, +1 mean next week

//   const chartData = useMemo(() => {
//     if (!expenses || !Array.isArray(expenses) || expenses.length === 0)
//       return [];

//     const startOfWeek = dayjs().add(weekOffset, "week").startOf("isoWeek");
//     const endOfWeek = dayjs().add(weekOffset, "week").endOf("isoWeek");

//     // init week days
//     const weekDays = {};
//     for (let i = 0; i < 7; i++) {
//       const day = startOfWeek.add(i, "day");
//       weekDays[day.format("ddd")] = 0;
//     }

//     // expenses by day
//     expenses.forEach((exp) => {
//       if (!exp?.expense_date) return;
//       const date = dayjs(exp.expense_date);
//       if (date.isBetween(startOfWeek, endOfWeek, "day", "[]")) {
//         const dayLabel = date.format("ddd");
//         const amount = parseFloat(exp.amount) || 0;
//         weekDays[dayLabel] += amount;
//       }
//     });

//     // convert to array
//     return Object.keys(weekDays).map((day) => ({
//       day,
//       total: weekDays[day],
//     }));
//   }, [expenses, weekOffset]);

//   if (!chartData.length) {
//     return (
//       <div className="w-full h-[400px] flex items-center justify-center bg-base-100 rounded-lg shadow p-4">
//         <p>No expense data available</p>
//       </div>
//     );
//   }

//   const weekLabel = () => {
//     const start = dayjs()
//       .add(weekOffset, "week")
//       .startOf("isoWeek")
//       .format("DD MMM");
//     const end = dayjs()
//       .add(weekOffset, "week")
//       .endOf("isoWeek")
//       .format("DD MMM");
//     return `${start} - ${end}`;
//   };

//   return (
//     <div className="w-full mb-4 max-w-full h-[400px] p-4 bg-base-100 rounded-lg shadow">
//       <div className="flex justify-between items-center mb-2">
//         <div className="flex gap-2">
//           <button
//             className="btn btn-sm"
//             onClick={() => setWeekOffset((prev) => prev - 1)}
//           >
//             Prev Week
//           </button>
//           <button
//             className="btn btn-sm"
//             onClick={() => setWeekOffset((prev) => prev + 1)}
//             disabled={weekOffset === 0} // disable future weeks
//           >
//             Next Week
//           </button>
//         </div>
//         <span className="font-semibold">{weekLabel()}</span>
//       </div>

//       <div className="flex flex-wrap mb-2">
//         <div className="flex ml-auto gap-1">
//           <button
//             title="Bar chart"
//             className={`flex items-center gap-1 px-2 py-1 rounded-md ${
//               currentChart === "bar"
//                 ? "text-blue-600 font-semibold"
//                 : "text-gray-500 hover:text-blue-500"
//             }`}
//             onClick={() => setCurrentChart("bar")}
//           >
//             <BiBarChartAlt />
//           </button>
//           <button
//             title="Line chart"
//             className={`flex items-center gap-1 px-2 py-1 rounded-md ${
//               currentChart === "line"
//                 ? "text-blue-600 font-semibold"
//                 : "text-gray-500 hover:text-blue-500"
//             }`}
//             onClick={() => setCurrentChart("line")}
//           >
//             <BiLineChart />
//           </button>
//           <button
//             title="Pie chart"
//             className={`flex items-center gap-1 px-2 py-1 rounded-md ${
//               currentChart === "pie"
//                 ? "text-blue-600 font-semibold"
//                 : "text-gray-500 hover:text-blue-500"
//             }`}
//             onClick={() => setCurrentChart("pie")}
//           >
//             <BiPieChartAlt2 />
//           </button>
//         </div>
//       </div>

//       {currentChart === "bar" && (
//         <CustomBarChart
//           chartData={chartData}
//           XAxisDataKey="day"
//           BarDataKey={[{ key: "total", name: "Total expenses" }]}
//           isLegend={false}
//           description="Total expenses of the week"
//           height={280}
//         />
//       )}

//       {currentChart === "line" && (
//         <CustomLineChart
//           chartData={chartData}
//           XAxisDataKey="day"
//           LineDataKey={[{ key: "total", name: "Total expenses" }]}
//           isLegend={false}
//           description="Total expenses of the week"
//           height={280}
//         />
//       )}

//       {currentChart === "pie" && (
//         <CustomPieChart
//           chartData={chartData}
//           pieDataKey="total"
//           pieNameKey="day"
//           height={280}
//           description="Total expenses of the week"
//         />
//       )}
//     </div>
//   );
// };

// export default React.memo(ExpenseChart);
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import { BiBarChartAlt, BiLineChart, BiPieChartAlt2 } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";

import CustomLineChart from "../../common/components/charts/CustomLineChart";
import CustomBarChart from "../../common/components/charts/CustomBarChart";
import CustomPieChart from "../../common/components/charts/CustomPieChart";
import { getAllExpenses } from "../expensesSlice";
import PrevNextButton from "./PrevNextButton";

dayjs.extend(isoWeek);

const ExpenseChart = () => {
  const dispatch = useDispatch();
  const { loggedInUserId } = useSelector((state) => state.common);
  const { expenses } = useSelector((state) => state.expenses);

  const [currentChart, setCurrentChart] = useState("bar");
  const [weekOffset, setWeekOffset] = useState(0); // 0 = current week

  const referenceDate = dayjs().add(weekOffset, "week").toDate();

  useEffect(() => {
    if (!loggedInUserId) return;
    dispatch(getAllExpenses({ userId: loggedInUserId, referenceDate }));
  }, [dispatch, loggedInUserId, weekOffset]);

  // transform expenses to chart data
  const chartData = React.useMemo(() => {
    if (!expenses || !expenses.length) return [];

    const startOfWeek = dayjs(referenceDate).startOf("isoWeek");
    const weekDays = {};

    for (let i = 0; i < 7; i++) {
      const day = startOfWeek.add(i, "day");
      weekDays[day.format("ddd")] = 0;
    }

    expenses.forEach((exp) => {
      if (!exp?.expense_date) return;
      const date = dayjs(exp.expense_date);
      const dayLabel = date.format("ddd");
      if (dayLabel in weekDays) {
        weekDays[dayLabel] += parseFloat(exp.amount) || 0;
      }
    });

    return Object.keys(weekDays).map((day) => ({
      day,
      total: weekDays[day],
    }));
  }, [expenses, referenceDate]);

  return (
    <div className="w-full mb-4 max-w-full h-[400px] p-4 bg-base-100 rounded-lg shadow">
      <PrevNextButton
        setPrevWeekOffset={() => setWeekOffset((prev) => prev - 1)}
        setNextWeekOffset={() => setWeekOffset((prev) => prev + 1)}
        // weekLabel={weekLabel()}
        weekOffset={weekOffset}
      />

      {!chartData.length ? (
        <div className="flex justify-center items-center h-full">
          <p>No expense data available</p>
        </div>
      ) : (
        <>
          <div className="flex flex-wrap mb-2">
            <div className="flex ml-auto gap-1">
              {["bar", "line", "pie"].map((type) => {
                const Icon =
                  type === "bar"
                    ? BiBarChartAlt
                    : type === "line"
                    ? BiLineChart
                    : BiPieChartAlt2;
                return (
                  <button
                    key={type}
                    title={`${
                      type.charAt(0).toUpperCase() + type.slice(1)
                    } chart`}
                    className={`flex items-center gap-1 px-2 py-1 rounded-md ${
                      currentChart === type
                        ? "text-blue-600 font-semibold"
                        : "text-gray-500 hover:text-blue-500"
                    }`}
                    onClick={() => setCurrentChart(type)}
                  >
                    <Icon />
                  </button>
                );
              })}
            </div>
          </div>
          {currentChart === "bar" && (
            <CustomBarChart
              chartData={chartData}
              XAxisDataKey="day"
              BarDataKey={[{ key: "total", name: "Total expenses" }]}
              isLegend={false}
              description="Total expenses of the week"
              height={275}
            />
          )}

          {currentChart === "line" && (
            <CustomLineChart
              chartData={chartData}
              XAxisDataKey="day"
              LineDataKey={[{ key: "total", name: "Total expenses" }]}
              isLegend={false}
              description="Total expenses of the week"
              height={275}
            />
          )}

          {currentChart === "pie" && (
            <CustomPieChart
              chartData={chartData}
              pieDataKey="total"
              pieNameKey="day"
              height={275}
              description="Total expenses of the week"
            />
          )}
        </>
      )}
    </div>
  );
};

export default React.memo(ExpenseChart);
