import React from "react";

const NoDataFound = ({NoDataFoundFor="Default"}) => {
  return (
      <div className="flex flex-wrap gap-1 lg:pl-4 justify-center items-center h-40">
              <span className="alert alert-info alert-soft ">
                No {NoDataFoundFor} data found
              </span>
            </div>
  )
}

export default React.memo(NoDataFound);