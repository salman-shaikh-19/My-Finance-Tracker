import React from "react";
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
  Legend,
} from "recharts";
import CustomCommonTooltipForChart from "./CustomCommonTooltipForChart";

const CustomRadarChart = ({
  chartData,
  dataKey,
  nameKey,
  description,
  width = "100%",
    height = 400,
  color = "#f97316",
}) => {
  return (
    <div  style={{ width, height }} id="chart-container">
      <p className="text-center mb-2 font-semibold">{description}</p>
      <ResponsiveContainer width="100%" height={height}>
        <RadarChart data={chartData}>
          <PolarGrid />
          <PolarAngleAxis dataKey={nameKey} />
          <PolarRadiusAxis />
          <Radar name={dataKey} dataKey={dataKey} stroke={color} fill={color} fillOpacity={0.6} />
          <Tooltip content={<CustomCommonTooltipForChart />} />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomRadarChart;
