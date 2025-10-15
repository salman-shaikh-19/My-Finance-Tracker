import React from "react";

const ChartSkeleton = ({ containerHeight = 400 }) => {

  const barValues = [60, 120, 90, 130, 150, 140, 100, 80, 150, 90, 110, 140, 160, 145, 110, 90, 60];


  const maxValue = Math.max(...barValues);
  const barHeights = barValues.map(value => (value / maxValue) * containerHeight);

  return (
    <div className="card w-full bg-base-200 shadow-xl p-4">
      <div className={`animate-pulse flex items-end gap-2`} style={{ height: `${containerHeight}px` }}>
        {barHeights.map((height, index) => (
          <div
            key={index}
            className="flex-1 bg-base-100 rounded-b-md"
            style={{ height: `${height}px` }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(ChartSkeleton);
