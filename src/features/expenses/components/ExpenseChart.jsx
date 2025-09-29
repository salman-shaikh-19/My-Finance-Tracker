import React, { useMemo, useState } from "react";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import isBetween from "dayjs/plugin/isBetween";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import CustomLineChart from "../../common/components/charts/CustomLineChart";
import CustomBarChart from "../../common/components/charts/CustomBarChart";
import CustomPieChart from "../../common/components/charts/CustomPieChart";
import {
  BiBarChartAlt,
  BiLineChart,
  BiPieChart,
  BiPieChartAlt2,
} from "react-icons/bi";
import { Link } from "react-router-dom";
dayjs.extend(isoWeek);
dayjs.extend(isBetween);
const ExpenseChart = ({ expenses = [] }) => {
  const [currentChart, setCurrentChart] = useState("bar");
  // Process weekly chart data
  const chartData = useMemo(() => {
    if (!expenses || !Array.isArray(expenses) || expenses.length === 0)
      return [];

    // Get start and end of current week (Mon - Sun)
    const startOfWeek = dayjs().startOf("week"); // Sunday as start (default)
    const endOfWeek = dayjs().endOf("week");

    // If you want Monday as start of week instead:
    // const startOfWeek = dayjs().startOf("isoWeek");
    // const endOfWeek = dayjs().endOf("isoWeek");

    // Initialize week days with 0
    const weekDays = {};
    for (let i = 0; i < 7; i++) {
      const day = startOfWeek.add(i, "day");
      weekDays[day.format("ddd")] = 0;
    }

    // Sum expenses by day
    expenses.forEach((exp) => {
      if (!exp?.expense_date) return;
      const date = dayjs(exp.expense_date);

      if (date.isBetween(startOfWeek, endOfWeek, "day", "[]")) {
        const dayLabel = date.format("ddd"); // e.g., Mon, Tue
        const amount = parseFloat(exp.amount) || 0;
        weekDays[dayLabel] += amount;
      }
    });

    // Convert to recharts array format
    return Object.keys(weekDays).map((day) => ({
      day,
      total: weekDays[day],
    }));
  }, [expenses]);

  if (!chartData.length) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center bg-base-100 rounded-lg shadow p-4">
        <p className="">No expense data available</p>
      </div>
    );
  }

  return (
    <div className="w-full mb-4 max-w-full h-[400px] p-4 bg-base-100 rounded-lg shadow ">
      <h2 className="text-xl font-semibold mb-4 px-2">Current Week Expenses</h2>
      <div className="flex flex-wrap">
        <div className="flex ml-auto ">
          <button
          title="Bar chart"
            className={`flex items-center gap-1 px-2 py-1 rounded-md transition-colors ${
              currentChart === "bar"
                ? "text-blue-600 font-semibold"
                : "text-gray-500 hover:text-blue-500"
            }`}
            onClick={() => setCurrentChart("bar")}
          >
            <BiBarChartAlt /> 
          </button>

          <button
          title="Line chart"
            className={`flex items-center gap-1 px-2 py-1 rounded-md transition-colors ${
              currentChart === "line"
                ? "text-blue-600 font-semibold"
                : "text-gray-500 hover:text-blue-500"
            }`}
            onClick={() => setCurrentChart("line")}
          >
            <BiLineChart /> 
          </button>

          <button
          title="Pie chart"
            className={`flex items-center gap-1 px-2 py-1 rounded-md transition-colors ${
              currentChart === "pie"
                ? "text-blue-600 font-semibold"
                : "text-gray-500 hover:text-blue-500"
            }`}
            onClick={() => setCurrentChart("pie")}
          >
            <BiPieChartAlt2 /> 
          </button>
        </div>
      </div>

      {currentChart == "bar" && (
        <CustomBarChart
          chartData={chartData}
          XAxisDataKey="day"
          BarDataKey={[{ key: "total", name: "Total expenses" }]}
          isLegend={false}
          description={`Total expenses of current weak`}
          height={250}
        />
      )}

      {currentChart == "line" && (
        <CustomLineChart
          chartData={chartData}
          XAxisDataKey="day"
          LineDataKey={[{ key: "total", name: "Total expenses" }]}
          isLegend={false}
          description="Total expenses of current weak"
          height={250}
        />
      )}

      {currentChart == "pie" && (
        <CustomPieChart
          chartData={chartData}
          pieDataKey="total"
          pieNameKey="day"
          // height={250}
          height={250}
          description="Total expenses of current weak"
        />
      )}
    </div>
  );
};

export default React.memo(ExpenseChart);
