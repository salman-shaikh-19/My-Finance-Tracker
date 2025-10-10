import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const CustomDoughnutChart = ({
  chartData,
  dataKey,
  nameKey,
  description,
   width = "100%",
    height = 400,
  colors = ["#8884d8", "#82ca9d", "#ffc658"],
}) => {
  return (
    <div  style={{ width, height }} id="chart-container">
      <p className="text-center mb-2 font-semibold">{description}</p>
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey={dataKey}
            nameKey={nameKey}
            cx="50%"
            cy="50%"
            innerRadius={70} // makes it a doughnut
            outerRadius={100}
            paddingAngle={5}
            label
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomDoughnutChart;
