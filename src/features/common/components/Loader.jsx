import React from "react";

const Loader = ({ isTakeFullScreen = false }) => {
  return (
    <div
      className={`flex flex-col justify-center items-center ${
        isTakeFullScreen ? "min-h-screen" : "h-[300px]"
      }`}
    >
      <div className="relative flex items-center justify-center">
        {/* outer glowing ring */}
        <div className="absolute w-16 h-16 rounded-full border-4 border-primary opacity-30 animate-ping"></div>

        {/* main rotating ring */}
        <div className="w-14 h-14 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>

        {/* inner core pulse */}
        <div className="absolute w-5 h-5 bg-primary rounded-full animate-pulse shadow-lg shadow-primary/40"></div>
      </div>

      <p className="mt-5 text-base font-medium text-base-content opacity-80 tracking-wide">
        Loading, please wait...
      </p>
    </div>
  );
};

export default React.memo(Loader);
