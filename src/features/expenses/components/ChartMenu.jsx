import React from "react";
import { BiBarChartAlt, BiLineChart, BiPieChartAlt2 } from "react-icons/bi";

const ChartMenu=({currentChart,setCurrentChart})=>{
    return(
        <>
         <div className="flex flex-wrap mb-2">
                    <div className="flex ml-auto gap-1">
                      {["bar", "line", "pie"].map((type) => {
                        const Icon =
                          type === "bar"
                            ? BiBarChartAlt
                            : type === "line"
                            ? BiLineChart
                            : BiPieChartAlt2;
                        return (
                          <button
                          
                            key={type}
                            title={`${
                              type.charAt(0).toUpperCase() + type.slice(1)
                            } chart`}
                            className={`flex items-center gap-1 px-2 py-1 rounded-md ${
                              currentChart === type
                                ? "text-blue-600 font-semibold"
                                : "text-gray-500 hover:text-blue-500"
                            }`}
                            onClick={() => setCurrentChart(type)}
                          >
                            <Icon />
                          </button>
                        );
                      })}
                    </div>
                  </div>
        </>
    )
}

export default React.memo(ChartMenu);