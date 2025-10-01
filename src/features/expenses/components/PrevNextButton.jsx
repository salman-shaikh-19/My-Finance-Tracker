import React from "react";
// import dayjs from "dayjs";
import { getWeekLabel } from "../../../utils/dateUtils";

import { MdRefresh } from "react-icons/md";
import { FcNext, FcPrevious } from "react-icons/fc";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

const PrevNextButton = ({customWeakDate,refreshData, weekOffset, setPrevWeekOffset, setNextWeekOffset }) => {

  const weekLabel = React.useMemo(() => {
    // const customWeakDate = dayjs().add(weekOffset, "week").toDate();
    return getWeekLabel(customWeakDate);
  }, [weekOffset]);

  return (
    <div className="flex justify-between items-center mb-2">
      <div className="flex gap-2">
        <button 
        title="Previous weak"
        className="btn btn-primary btn-sm" onClick={setPrevWeekOffset}>
        <BiChevronLeft size={20} />
        </button>
        <button
        title="Next weak"
          className="btn btn-primary btn-sm disabled:cursor-not-allowed"
          onClick={setNextWeekOffset}
          disabled={weekOffset === 0} // disable future weeks
        >
         <BiChevronRight size={20}  />
        </button>
         <button
        title={`Refresh ${weekLabel} data `}
          className="btn btn-success btn-sm disabled:cursor-not-allowed"
          onClick={refreshData}
          // disabled={} // disable 
        >
         <MdRefresh size={20}  /> 
        </button>
      </div>
      <span className="font-semibold" >{weekLabel}</span>
    </div>
  );
};

export default React.memo(PrevNextButton);
