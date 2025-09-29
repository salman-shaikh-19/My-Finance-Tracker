import React from "react";

const PrevNextButton = ({ weekOffset, setPrevWeekOffset,setNextWeekOffset, weekLabel }) => {
  return (
    <>
      <div className="flex justify-between items-center mb-2">
        <div className="flex gap-2">
          <button className="btn btn-sm" onClick={setPrevWeekOffset}>
            Prev Week
          </button>
          <button
            className="btn btn-sm"
            onClick={setNextWeekOffset}
            disabled={weekOffset === 0} // disable future weeks
          >
            Next Week
          </button>
        </div>
        <span className="font-semibold">{weekLabel}</span>
      </div>
    </>
  );
};

export default React.memo(PrevNextButton);
