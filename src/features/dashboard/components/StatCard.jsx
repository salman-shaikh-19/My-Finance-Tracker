import React from "react";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';
import CardSkeleton from "../../common/components/CardSkeleton";
const StatCard = ({ cardTitle, cardContent, loading,additionalClass='' }) => {
  return (
    <>
      {loading ? <CardSkeleton additionalClass={additionalClass} /> : (
        <div className={`card w-full bg-base-200 shadow-xl h-36 ${additionalClass}`}>
          <div className="card-body">
            <h2 className="card-title">{cardTitle}</h2>
            {cardContent}
          </div>
        </div>
      )}
    </>
  )
}
export default React.memo(StatCard);
