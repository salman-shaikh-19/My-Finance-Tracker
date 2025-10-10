import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import CustomCommonTooltipForChart from "./CustomCommonTooltipForChart";

const CustomAreaChart = ({
  chartData,
  XAxisDataKey,
  AreaDataKey,
    width = "100%",
    height = 400,
  description,

  areaColor = "#8884d8",
  isLegend = false,
}) => {
  return (
    <div   style={{ width, height }} id="chart-container">
      <p className="text-center mb-2 font-semibold">{description}</p>
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart data={chartData} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis dataKey={XAxisDataKey} />
          <YAxis />
           <Tooltip content={<CustomCommonTooltipForChart />} />
          {isLegend && <Legend />}
          {AreaDataKey.map((item) => (
            <Area
              key={item.key}
              type="monotone"
              dataKey={item.key}
              name={item.name}
              stroke={areaColor}
              fill={areaColor}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default React.memo(CustomAreaChart, (prevProps, nextProps) => {
  return (
    JSON.stringify(prevProps.chartData) === JSON.stringify(nextProps.chartData)
  );
});
