import React from "react";
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import CustomCommonTooltipForChart from "./CustomCommonTooltipForChart";

const CustomBarChart = React.memo(({ chartData, width = "100%", height = 400, isLegend = false, XAxisDataKey, BarDataKey = [], description = "Bar Chart Deafult description" }) => {
    // const colors = useMemo(() => BarDataKey.map(() => randomColor()), [BarDataKey]);
    return (
        <div style={{width,height}}>
          
            <ResponsiveContainer width={width} height={height}>
                
                <BarChart data={chartData} >
                    <XAxis dataKey={XAxisDataKey} />
                    <YAxis />
                    <Tooltip content={<CustomCommonTooltipForChart />} />
                    {isLegend && <Legend verticalAlign="top" height={36} />}
                    {BarDataKey.map((bar, i) => (
                        <Bar
                            key={i}
                            dataKey={bar.key}
                            name={bar.name || bar.key}
                            fill="#DE1010"

                        />
                    ))

                    }
                </BarChart>
            </ResponsiveContainer>
            {description && (
                <p className="text-sm mt-auto" style={{ textAlign: "center", marginBottom: "10px" }}>
                    {description}
                </p>
            )}
        </div>

    )
})


export default CustomBarChart