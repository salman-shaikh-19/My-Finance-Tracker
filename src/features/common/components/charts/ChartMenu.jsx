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
import { exportToCsv, exportToExcel } from "../../../../utils/exportTo";
import { FaFileCsv, FaFileExcel } from "react-icons/fa";

// Map chart types to icons
const chartIcons = {
  bar: MdOutlineBarChart,
  line: MdShowChart,
  pie: MdOutlinePieChart,
  area: MdTimeline,
  radar: MdRadar,
  doughnut: MdDonutSmall,
};

const ChartMenu = ({
  currentChart,
  setCurrentChart,
  downloadChart,
  data,
  fileName = "data",
  excludeKeys = [],
}) => {
  const chartTypes = Object.keys(chartIcons);

  return (
    <div className="flex flex-wrap mb-2">
      <div className="flex flex-wrap flex-col  lg:flex-row gap-1 mb-2 justify-end  ">
        {chartTypes.map((type) => {
          const Icon = chartIcons[type];
          return (
            <div
              key={type}
              className="tooltip tooltip-bottom tooltip-primary "
              data-tip={`${type.charAt(0).toUpperCase() + type.slice(1)} chart`}
            >
              <button
                className={`flex items-center cursor-pointer gap-1 px-2 py-1 rounded-md ${
                  currentChart === type
                    ? "btn btn-primary btn-sm font-semibold"
                    : "btn btn-ghost btn-sm hover:text-primary"
                }`}
                onClick={() => setCurrentChart(type)}
              >
                <Icon size={22} />
              </button>
            </div>
          );
        })}

        <div
          className="tooltip tooltip-bottom tooltip-primary"
          data-tip="Export to Excel"
        >
          <button
            className="lex items-center cursor-pointer gap-1 px-2 py-1 rounded-md btn btn-ghost btn-sm hover:text-primary"
            onClick={() => exportToExcel(data, fileName, excludeKeys)}
          >
            <FaFileExcel size={20} />
          </button>
        </div>
        <div
          className="tooltip tooltip-left tooltip-primary "
          data-tip="Export to CSV"
        >
          <button
            className="lex items-center cursor-pointer gap-1 px-2 py-1 rounded-md btn btn-ghost btn-sm hover:text-primary"
            onClick={() => exportToCsv(data, fileName, excludeKeys)}
          >
            <FaFileCsv size={20} />
          </button>
        </div>
        <div
          className="tooltip tooltip-bottom tooltip-primary "
          data-tip={`Download ${currentChart} chart`}
        >
          <button
            className="flex items-center cursor-pointer gap-1 px-2 py-1 rounded-md btn btn-ghost btn-sm hover:text-primary"
            onClick={downloadChart}
          >
            <FiDownload size={22} />
          </button>
        </div>


      </div>
    </div>
  );
};

export default React.memo(ChartMenu);
