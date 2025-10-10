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
// import { BiBarChartAlt, BiLineChart, BiPieChartAlt2 } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";

import CustomLineChart from "../../common/components/charts/CustomLineChart";
import CustomBarChart from "../../common/components/charts/CustomBarChart";
import CustomPieChart from "../../common/components/charts/CustomPieChart";
import { getAllExpenses } from "../expensesSlice";
import PrevNextButton from "../../common/components/PrevNextButton";
import ChartMenu from "../../common/components/charts/ChartMenu";

import ExpenseTimeLine from "./ExpenseTimeLine";
import { refreshData } from "../../../utils/refreshData";
import { getWeeklyChartData } from "../../../utils/getWeeklyChartData";
import NoDataFound from "../../common/components/NoDataFound";
import { downloadAsImage } from "../../../utils/downloadAsImage";
import { getWeekLabel } from "../../../utils/dateUtils";
import CustomAreaChart from "../../common/components/charts/CustomAreaChart";
import CustomDoughnutChart from "../../common/components/charts/CustomDoughnutChart";
import CustomRadarChart from "../../common/components/charts/CustomRadarChart";
dayjs.extend(isoWeek);

const chartColor = "#f97316";
const ExpenseChart = () => {
  const dispatch = useDispatch();
  const { loggedInUserId, userCurrency, expenseLimit } = useSelector(
    (state) => state.common
  );
  const { expenses } = useSelector((state) => state.expenses);
  const [weekOffset, setWeekOffset] = useState(0); // 0 = current week
  const [currentChart, setCurrentChart] = useState("pie");

  const customWeakDate = dayjs().add(weekOffset, "week").toDate();

  useEffect(() => {
    if (!loggedInUserId) return;
    dispatch(getAllExpenses({ userId: loggedInUserId, customWeakDate }));
  }, [dispatch, loggedInUserId, weekOffset]);

  // transform expenses to chart data
  const chartData = React.useMemo(() => {
    return getWeeklyChartData({
      items: expenses,
      dateKey: "expense_date",
      valueKey: "amount",
      referenceDate: customWeakDate,
    });
  }, [expenses, customWeakDate]);

  // const refreshData=()=>{
  //   // console.log('called');
  //     if (!loggedInUserId) return;
  //   dispatch(getAllExpenses({ userId: loggedInUserId, customWeakDate }));
  //   setWeekOffset(0);
  // }
  const refreshExpenses = () => {
    refreshData({
      loggedInUserId,
      dispatch,
      action: getAllExpenses,
      params: { customWeakDate },
      resetOffset: setWeekOffset,
    });
  };

  const handleDownloadChart = () => {
    downloadAsImage({ currentChartFor: `expense` });
  };
  return (
    <div className="w-full mb-4 max-w-full h-[555px] md:h-[520px] lg:h-[520px] p-4 bg-base-100 rounded-lg   shadow">
      <PrevNextButton
        customLabelDate={customWeakDate}
        offset={weekOffset}
        setPrevOffset={() => setWeekOffset((prev) => prev - 1)}
        setNextOffset={() => setWeekOffset((prev) => prev + 1)}
        refreshData={refreshExpenses}
        getLabel={(date) => getWeekLabel(date)}
      />
      {!chartData.length ? (
        <NoDataFound NoDataFoundFor=" chart" />
      ) : (
        <>
        
          <ChartMenu
            currentChart={currentChart}
            setCurrentChart={setCurrentChart}
            downloadChart={handleDownloadChart}
            data={expenses}
            fileName={`Expenses-${dayjs(customWeakDate).format("YYYY-MMM-DD")}`}
            excludeKeys={["created_at","updated_at", "id", "user_id"]}
          />

          {currentChart === "bar" && (
            <CustomBarChart
              chartData={chartData}
              //  BarDataKey={"total"}
              XAxisDataKey="day"
              BarDataKey={[{ key: "total", name: "Total expenses" }]}
              isLegend={false}
              description="Total expenses of the week "
              height={300}
              barColor={chartColor}
            />
          )}

          {currentChart === "line" && (
            <CustomLineChart
              chartData={chartData}
              XAxisDataKey="day"
              LineDataKey={[{ key: "total", name: "Total expenses " }]}
              isLegend={false}
              description="Total expenses of the week "
              height={300}
              lineColor={chartColor}
              strokeColor={chartColor}
            />
          )}

          {currentChart === "pie" && (
            <CustomPieChart
              chartData={chartData}
              pieDataKey="total"
              pieNameKey="day"
              height={300}
              description="Total expenses of the week"
            />
          )}

          {currentChart === "area" && (
            <CustomAreaChart
              chartData={chartData}
              XAxisDataKey="day"
              AreaDataKey={[{ key: "total", name: "Total expenses" }]}
              description={`Total expenses of the week`}
              height={300}
              areaColor={chartColor}
            />
          )}

          {currentChart === "radar" && (
            <CustomRadarChart
              chartData={chartData}
              dataKey="total"
              nameKey="day"
              description={`Total expenses of the week`}
              height={300}
              color={chartColor}
            />
          )}

          {currentChart === "doughnut" && (
            <CustomDoughnutChart
              chartData={chartData}
              dataKey="total"
              nameKey="day"
              description={`Total expenses of the week`}
              height={300}
              colors={[chartColor, "#FBBF24", "#3B82F6", "#10B981", "#8B5CF6"]}
            />
          )}
          <ul className="steps w-full mt-10 scrollbar-hide  ">
            {chartData.map((dayData) => (
              <ExpenseTimeLine
                key={dayData.day}
                day={dayData.day}
                weekOffset={weekOffset}
                total={dayData.total}
                expenseLimit={expenseLimit}
                userCurrency={userCurrency}
              />
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default React.memo(ExpenseChart);
