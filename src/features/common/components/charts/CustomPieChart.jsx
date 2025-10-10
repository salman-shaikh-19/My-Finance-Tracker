import React from "react";
import {
  Cell,
  ResponsiveContainer,
  Tooltip,
  PieChart,
  Pie,
  Legend,
} from "recharts";
// import randomColor from "../../../../utils/randomColorGenerate";
import CustomCommonTooltipForChart from "./CustomCommonTooltipForChart";
const COLORS = [
  "#3b82f6", // blue-500
  "#22c55e", // green-500
  "#eab308", // yellow-500
  "#ef4444", // red-500
  "#8b5cf6", // violet-500
  "#14b8a6", // teal-500
  "#f97316", // orange-500
];

const CustomPieChart = React.memo(
  ({
    chartData,
    width = "100%",
    height = 400,
    isLegend = true,
    pieDataKey,
    pieNameKey,
    description = "Default description of pie chart",
  }) => (
    <div style={{ width, height }} id="chart-container">
        {description && (  <p className="text-center mb-2 font-semibold">{description}</p>)}
     
      <ResponsiveContainer width={width} height={height}>
        <PieChart data={chartData}>
          {isLegend && <Legend />}
          <Tooltip content={<CustomCommonTooltipForChart />} />
          <Pie dataKey={pieDataKey} nameKey={pieNameKey} data={chartData} label>
            {chartData?.map?.((_, i) => (
              // <Cell key={i} fill={randomColor()} />
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      {/* {description && (
        <p
          className="text-sm  mt-auto"
          style={{ textAlign: "center", marginBottom: "10px" }}
        >
          {description}
        </p>
      )} */}
    </div>
  )
);

export default React.memo(CustomPieChart, (prevProps, nextProps) => {
  return (
    JSON.stringify(prevProps.chartData) === JSON.stringify(nextProps.chartData)
  );
});
