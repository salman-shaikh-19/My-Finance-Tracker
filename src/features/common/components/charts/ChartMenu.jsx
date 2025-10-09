import React from "react";
import { FiDownload } from "react-icons/fi";
import {
  MdBarChart,
  MdOutlineBarChart,
  MdOutlinePieChart,
  MdShowChart,
} from "react-icons/md";

const ChartMenu = ({ currentChart, setCurrentChart, downloadChart }) => {
  // console.log('logg from chart menu');

  return (
    <>
      <div className="flex flex-wrap mb-2 ">
        <div className="flex ml-auto gap-1">
          {["bar", "line", "pie"].map((type) => {
            const Icon =
              type === "bar"
                ? MdOutlineBarChart
                : type === "line"
                ? MdShowChart
                : MdOutlinePieChart;
            return (
              <button
                key={type}
                title={`${type.charAt(0).toUpperCase() + type.slice(1)} chart`}
                className={`flex items-center cursor-pointer gap-1 px-2 py-1 rounded-md ${
                  currentChart === type
                    ? "btn btn-primary btn-sm font-semibold"
                    : "btn btn-ghost btn-sm hover:text-primary"
                }`}
                onClick={() => setCurrentChart(type)}
              >
                <Icon size={22} />
              </button>
            );
          })}
          <button
            title={`download ${currentChart} chart`}
            className={` flex items-center cursor-pointer gap-1 px-2 py-1 rounded-md 
                 btn btn-ghost btn-sm hover:text-primary
                   
                `}
            onClick={downloadChart}
          >
            <FiDownload size={22} />
          </button>
        </div>
      </div>
    </>
  );
};

export default React.memo(ChartMenu);
