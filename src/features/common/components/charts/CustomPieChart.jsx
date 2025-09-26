import React from "react";
import { Cell, ResponsiveContainer, Tooltip, PieChart, Pie, Legend } from "recharts";
import randomColor from "../../../../utils/randomColorGenerate";
import CustomCommonTooltipForChart from "./CustomCommonTooltipForChart";
const CustomPieChart = React.memo(({ chartData, width = "100%", height = 400, isLegend = true, pieDataKey, pieNameKey, description = "Default description of pie chart" }) => (
    <div style={{ width, height }}>

        <ResponsiveContainer width={width} height={height}>
            <PieChart data={chartData}>
                {isLegend && <Legend />}
                <Tooltip content={<CustomCommonTooltipForChart />} />
                <Pie dataKey={pieDataKey}
                    nameKey={pieNameKey} data={chartData} label  >
                    {
                        chartData?.map?.((_, i) => (
                            <Cell key={i} fill={randomColor()} />
                        ))
                    }
                </Pie>
            </PieChart>
        </ResponsiveContainer>
        {description && (
            <p className="  mt-auto" style={{ textAlign: "center", marginBottom: "10px" }}>
                {description}
            </p>
        )}
    </div>
));


export default CustomPieChart