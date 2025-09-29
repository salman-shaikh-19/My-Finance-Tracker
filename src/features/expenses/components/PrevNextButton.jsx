import React from "react";
// import dayjs from "dayjs";
import { getWeekLabel } from "../../../utils/dateUtils";

const PrevNextButton = ({referenceDate, weekOffset, setPrevWeekOffset, setNextWeekOffset }) => {

  const weekLabel = React.useMemo(() => {
    // const referenceDate = dayjs().add(weekOffset, "week").toDate();
    return getWeekLabel(referenceDate);
  }, [weekOffset]);

  return (
    <div className="flex justify-between items-center mb-2">
      <div className="flex gap-2">
        <button 
        title="Previous weak"
        className="btn btn-primary btn-sm" onClick={setPrevWeekOffset}>
          Prev Week
        </button>
        <button
        title="Next weak"
          className="btn btn-primary btn-sm disabled:cursor-not-allowed"
          onClick={setNextWeekOffset}
          disabled={weekOffset === 0} // disable future weeks
        >
          Next Week
        </button>
      </div>
      <span className="font-semibold" >{weekLabel}</span>
    </div>
  );
};

export default React.memo(PrevNextButton);
