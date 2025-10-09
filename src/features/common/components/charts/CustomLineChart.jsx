import React from "react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";
import CustomCommonTooltipForChart from "./CustomCommonTooltipForChart";

const CustomLineChart = React.memo(
  ({
    chartData,
    lineColor = "teal",
    strokeColor = "teal",
    width = "100%",
    height = 400,
    isLegend = false,
    XAxisDataKey,
    LineDataKey = [],
    description = "default description of line chart",
  }) => {
    // console.log('hii from line chart');

    return (
      <div style={{ width, height }} id="chart-container">
        <ResponsiveContainer width={width} height={height}>
          <LineChart data={chartData}>
            <XAxis dataKey={XAxisDataKey} />
            <YAxis />
            <Tooltip content={<CustomCommonTooltipForChart />} />
            {isLegend && <Legend verticalAlign="top" height={36} />}
            {LineDataKey.map((lineData, index) => (
              <Line
                key={index}
                dataKey={lineData.key}
                name={lineData.name}
                strokeWidth={2}
                stroke={strokeColor}
                dot={{ fill: lineColor, r: 4 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
        {description && (
          <p
            className="text-sm mt-auto"
            style={{ textAlign: "center", marginBottom: "10px" }}
          >
            {description}
          </p>
        )}
      </div>
    );
  }
);

export default React.memo(CustomLineChart, (prevProps, nextProps) => {
  return (
    JSON.stringify(prevProps.chartData) === JSON.stringify(nextProps.chartData)
  );
});
