import React from "react";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';
const TotalOfCard = ({ cardTitle, cardTotal, loading }) => {
  return (
    <>
      {loading ? <div className="card w-full bg-base-300 shadow-xl">
        <div className="card-body flex flex-col items-center justify-center gap-4">
          <div className="flex items-center gap-4 w-full">
            <div className="flex flex-col gap-2 flex-1">
              <div className="skeleton h-4 w-auto rounded bg-base-200"></div>
              <div className="skeleton h-4 w-auto rounded bg-base-200"></div>
            </div>
          </div>
        </div>
      </div> : (
        <div className="card w-full bg-base-300 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">{cardTitle}</h2>
            <p className="text-2xl font-bold text-error">{cardTotal}</p>
          </div>
        </div>
      )}
    </>
  )
}
export default React.memo(TotalOfCard);
