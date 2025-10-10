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

const CustomRadarChart = ({
  chartData,
  dataKey,
  nameKey,
  description,
  width = "100%",
    height = 400,
  color = "#8884d8",
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
          <Tooltip />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomRadarChart;
