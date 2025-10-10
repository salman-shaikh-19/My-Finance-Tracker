import React, { useCallback, useMemo, useRef } from "react";
import { debounce } from "lodash";
import { BiChevronLeft, BiChevronRight, BiRefresh } from "react-icons/bi";


const PrevNextButton = ({
  customLabelDate,
  refreshData,
  offset,
  setPrevOffset,
  setNextOffset,
  getLabel = (date) => date.toDateString(),
  disableNext = false,
}) => {
  const label = useMemo(() => getLabel(customLabelDate), [customLabelDate, getLabel]);

  const debouncedRefreshRef = useRef(
    debounce(() => {
      refreshData?.();
    }, 500, { leading: true, trailing: false })
  );

  const handleRefresh = useCallback(() => {
    debouncedRefreshRef.current();
  }, []);

  return (
    <div className="flex justify-between items-center mb-2">
      <div className="flex gap-2">
        <button
          title="Previous"
          className="btn btn-primary btn-outline btn-sm"
          onClick={setPrevOffset}
        >
          <BiChevronLeft size={20} />
        </button>
        <button
          title="Next"
          className="btn btn-primary btn-outline btn-sm disabled:cursor-not-allowed"
          onClick={setNextOffset}
          disabled={disableNext || offset === 0}
        >
          <BiChevronRight size={20} />
        </button>
        <button
          title={`Refresh ${label}`}
          className="btn btn-info btn-outline btn-sm"
          onClick={handleRefresh}
        >
          <BiRefresh size={20} />
        </button>
      </div>
      <span className="font-semibold">{label}</span>
    </div>
  );
};

export default React.memo(
  PrevNextButton,
  (prevProps, nextProps) =>
    prevProps.customLabelDate === nextProps.customLabelDate &&
    prevProps.offset === nextProps.offset
);
