import React from "react";

const Loader=({isTakeFullScreen=false})=>{
    return(
        <>
        <div className={`flex justify-center items-center ${isTakeFullScreen ? 'min-h-screen' :'h-[300px]'}`}>
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        </>
    )
}

export default React.memo(Loader);