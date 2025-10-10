import React from "react";
import { FiDownload } from "react-icons/fi";
import {
  MdOutlineBarChart,
  MdShowChart,
  MdOutlinePieChart,
  MdTimeline, // for area chart
  MdRadar, // radar chart (no default icon in material, we’ll simulate)
  MdDonutSmall, // doughnut chart
} from "react-icons/md";

// Map chart types to icons
const chartIcons = {
  bar: MdOutlineBarChart,
  line: MdShowChart,
  pie: MdOutlinePieChart,
  area: MdTimeline,
  radar: MdRadar,
  doughnut: MdDonutSmall,
};

const ChartMenu = ({ currentChart, setCurrentChart, downloadChart }) => {
  const chartTypes = Object.keys(chartIcons);

  return (
    <div className="flex flex-wrap mb-2">
      <div className="flex ml-auto gap-1">
        {chartTypes.map((type) => {
          const Icon = chartIcons[type];
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
          title={`Download ${currentChart} chart`}
          className="flex items-center cursor-pointer gap-1 px-2 py-1 rounded-md btn btn-ghost btn-sm hover:text-primary"
          onClick={downloadChart}
        >
          <FiDownload size={22} />
        </button>
      </div>
    </div>
  );
};

export default React.memo(ChartMenu);
