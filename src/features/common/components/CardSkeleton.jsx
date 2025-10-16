import React from "react";

const CardSkeleton = ({additionalClass=''}) => {
return (
  <>
  <div className={`card w-half bg-base-100 shadow-md rounded-xl p-4 animate-pulse ${additionalClass}`}>
  <div className="flex items-center gap-4">
    {/* Avatar skeleton */}
    <div className={`avatar rounded-full p-4 flex justify-center items-center bg-base-200`}>
      <div className="h-16 w-16 rounded-full bg-base-300"></div>
    </div>

    <div className="flex flex-col flex-1 gap-3">
      {/* Category skeleton */}
      <div className="h-5 w-full bg-base-200 rounded"></div>
      {/* Amount skeleton */}
      <div className="h-5 w-full bg-base-200 rounded"></div>
      {/* <div className="h-5 w-full bg-base-200 rounded"></div> */}

      {/* Type and date skeleton */}
      {/* <div className="flex justify-between gap-2 mt-2">
        <div className="h-4 w-full bg-base-200 rounded"></div>
        <div className="h-4 w-full bg-base-200 rounded"></div>
      </div> */}
    </div>
  </div>

  {/* Note skeleton */}
  {/* <div className="mt-4 h-4 w-full bg-base-200 rounded"></div> */}
</div>

  </>
)
}
export default React.memo(CardSkeleton);

