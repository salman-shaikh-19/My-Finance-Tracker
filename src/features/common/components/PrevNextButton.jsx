import React, { useCallback, useMemo, useRef } from "react";
// import dayjs from "dayjs";
import { getWeekLabel } from "../../../utils/dateUtils";
import { debounce } from "lodash";
import { BiChevronLeft, BiChevronRight, BiRefresh } from "react-icons/bi";

const PrevNextButton = ({
  customWeakDate,
  refreshData,
  weekOffset,
  setPrevWeekOffset,
  setNextWeekOffset,
}) => {
  const weekLabel = useMemo(() => {
    // const customWeakDate = dayjs().add(weekOffset, "week").toDate();
    return getWeekLabel(customWeakDate);
  }, [weekOffset]);

  const debouncedRefreshRef = useRef(
    debounce(
      () => {
        refreshData();
      },
      1000,
      { leading: true, trailing: false }
    )
  );

  const handleRefresh = useCallback(() => {
    debouncedRefreshRef.current();
  }, []);

  return (
    <div className="flex justify-between items-center mb-2 ">
      <div className="flex gap-2 ">
        <button
          title="Previous week "
          className="btn btn-primary btn-outline  btn-sm"
          onClick={setPrevWeekOffset}
        >
          <BiChevronLeft size={20} />
        </button>
        <button
          title="Next week"
          className="btn btn-primary btn-outline btn-sm disabled:cursor-not-allowed "
          onClick={setNextWeekOffset}
          disabled={weekOffset === 0} // disable future weeks
        >
          <BiChevronRight size={20} />
        </button>
        <button
          title={`Refresh data of ${weekLabel} `}
          className="btn btn-accent btn-outline btn-sm disabled:cursor-not-allowed "
          onClick={handleRefresh}
          // disabled={} // disable
        >
          <BiRefresh size={20} />
        </button>
      </div>
      <span className="font-semibold ">{weekLabel}</span>
    </div>
  );
};

export default React.memo(PrevNextButton);
