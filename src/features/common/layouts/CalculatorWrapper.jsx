import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Rnd } from "react-rnd";
import Calculator from "../components/Calculator";

const CalculatorWrapper = () => {
  const { isCalculatorOpen } = useSelector((state) => state.common);
  const [isMobile, setIsMobile] = useState(false);

  // detect screen size
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768); // md breakpoint
    handleResize(); // set initial value
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isCalculatorOpen) return null;

  return (
    <>
      {isMobile ? (

        <div className="fixed top-50 right-2 z-50 w-60">
          <Calculator />
        </div>
      ) : (

        <Rnd
          style={{ zIndex: 9999 }}
          defaultSize={{ width: 320, height: "auto" }}
          enableResizing={true}
          enableDragging={true}
          bounds="window"
          default={{ x: window.innerWidth - 350, y: 30 }}
        >
          <Calculator />
        </Rnd>
      )}
    </>
  );
};

export default CalculatorWrapper;
