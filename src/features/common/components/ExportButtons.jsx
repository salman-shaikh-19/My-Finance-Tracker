import React from "react";
import { exportToCsv, exportToExcel } from "../../../utils/exportTo";
import { FaFileExcel } from "react-icons/fa6";
import { FaFileCsv } from "react-icons/fa";


const ExportButtons = ({ data, fileName = "data", excludeKeys = [] }) => {
  if (!data || !data.length) return null;

  return (
    <div className="flex justify-end space-x-2  mt-4 mb-4">
      <div className="tooltip tooltip-bottom tooltip-primary" data-tip="Export to Excel">

      <button
       
        className="text-primary btn-sm"
        onClick={() => exportToExcel(data, fileName, excludeKeys)}
      >
       <FaFileExcel size={20} />
      </button>
      </div>
      <div className="tooltip tooltip-bottom tooltip-info " data-tip="Export to CSV">
        
      <button
        className="text-info btn-sm"
        onClick={() => exportToCsv(data, fileName, excludeKeys)}
      >
      <FaFileCsv size={20} />
      </button>
      </div>
    </div>
  );
};

export default React.memo(ExportButtons);
