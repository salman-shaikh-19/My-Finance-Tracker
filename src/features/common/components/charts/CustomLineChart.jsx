import React from "react";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from "recharts";
import CustomCommonTooltipForChart from "./CustomCommonTooltipForChart";


const CustomLineChart = React.memo(({ chartData, width = "100%", height = 400, isLegend = false, XAxisDataKey, LineDataKey = [], description = "default description of line chart" }) => (
    <div style={{ width, height }}>

        <ResponsiveContainer width={width} height={height}>
            <LineChart  data={chartData} >
                <XAxis dataKey={XAxisDataKey} />
                <YAxis />
                <Tooltip content={<CustomCommonTooltipForChart />} />
                {isLegend && <Legend verticalAlign="top" height={36} />}
                {LineDataKey.map((lineData, index) => (
                    <Line key={index}  dataKey={lineData.key} name={lineData.name} strokeWidth={2}
                        stroke="#FF4C4C" dot={{ fill: '#FF4C4C', r: 4 }} 
                        />
                ))}
            </LineChart>
        </ResponsiveContainer>
        {description && (
            <p className="text-sm mt-auto" style={{ textAlign: "center", marginBottom: "10px" }}>
                {description}
            </p>
        )}
    </div>
));


export default CustomLineChart