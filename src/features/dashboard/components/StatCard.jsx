import React from "react";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';
const StatCard = ({ cardTitle, cardTotal, loading,additionalClass='' }) => {
  return (
    <>
      {loading ? <div className={`card w-full bg-base-200 shadow-xl ${additionalClass}`}>
        <div className="card-body flex flex-col items-center justify-center gap-4">
          <div className="flex items-center gap-4 w-full">
            <div className="flex flex-col gap-2 flex-1">
              <div className="skeleton h-4 w-45 rounded bg-base-100"></div>
              <div className="skeleton h-4 w-auto rounded bg-base-100"></div>
            </div>
          </div>
        </div>
      </div> : (
        <div className={`card w-full bg-base-200 shadow-xl ${additionalClass}`}>
          <div className="card-body">
            <h2 className="card-title">{cardTitle}</h2>
            <p className="text-2xl font-bold ">{cardTotal}</p>
          </div>
        </div>
      )}
    </>
  )
}
export default React.memo(StatCard);
