import React from "react";

const Loader=()=>{
    return(
        <>
        <div className="flex justify-center items-center h-[300px]">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        </>
    )
}

export default React.memo(Loader);