import React from "react";


const DashBoardCardSkeleton = ({ additionalClass = "" }) => {
  return (
    <div className={`card w-full bg-base-200 shadow-lg animate-pulse ${additionalClass}`}>
      <div className="card-body flex flex-col items-center justify-center gap-4">
        <div className="flex items-center gap-4 w-full">
          <div className="flex flex-col gap-2 flex-1">
     
            <div className="skeleton h-4 w-1/2 rounded bg-base-100"></div>
       
            <div className="skeleton h-6 w-3/4 rounded bg-base-100"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(DashBoardCardSkeleton);
