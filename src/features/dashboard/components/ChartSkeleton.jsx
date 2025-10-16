import React from "react";

const ChartSkeleton = ({ containerHeight = 500, barCount = 12 }) => {
  const bars = Array.from({ length: barCount });

  return (
    <div
      className="w-full bg-base-200 rounded-lg p-4"
      style={{ height: `${containerHeight}px` }}
    >
      <div className="h-full flex items-end gap-2">
        {bars.map((_, idx) => {
          const height = Math.random() * (containerHeight * 0.7) + containerHeight * 0.1; // random heights
          return (
            <div
              key={idx}
              className="bg-base-100 rounded-b-md animate-pulse"
              style={{
                height: `${height}px`,
                flex: 1,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default React.memo(ChartSkeleton);
