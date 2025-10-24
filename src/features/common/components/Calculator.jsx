import React, { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { BiX } from "react-icons/bi";
import { BsDot } from "react-icons/bs";
import { FaEquals } from "react-icons/fa6";
import { MdBackspace } from "react-icons/md";
import { TbDivide, TbPercentage } from "react-icons/tb";
import { clearCalculator, setInput, setJustCalculated, setResult } from "../commonSlice";
import { useDispatch, useSelector } from "react-redux";

const Calculator = () => {
  // const [input, setInput] = useState("");
  // const [result, setResult] = useState("");
  // const [justCalculated, setJustCalculated] = useState(false);
  const { input, result, justCalculated } = useSelector((state) => state.common);
  const dispatch = useDispatch();
  const operatorIcons = {
    "+": <AiOutlinePlus />,
    "-": <AiOutlineMinus />,
    "*": <BiX />,
    "/": <TbDivide />,
    "%": <TbPercentage />,
    ".": <BsDot />,
  };

  const handleClick = (value) => {
    if (justCalculated) {
      if ("0123456789.".includes(value)) {
        dispatch(setInput(value));
      } else {
        dispatch(setInput(result + value));
      }
      dispatch(setResult(""));
      dispatch(setJustCalculated(false));
    } else {
      dispatch(setInput(input + value));
    }
  };
  
  const handleBackspace = () => {
    dispatch(setInput(input.slice(0, -1)));
    dispatch(setJustCalculated(false));
  };
  

  const handleClear = () => {
  
    dispatch(clearCalculator());
  };



  const handleCalculate = () => {
    try {
      // replace % with /100
      const sanitized = input.replace(/%/g, "/100");
      const evalResult = Function(`"use strict"; return (${sanitized})`)();
      dispatch(setResult(evalResult));
      dispatch(setJustCalculated(true));
    } catch {
      dispatch(setResult("Error"));
      dispatch(setJustCalculated(true));
    }
  };

  return (
    <div className="p-5 bg-base-100 rounded-2xl shadow-lg w-full   border border-base-200 scrollbar-hide   overflow-auto">
      

      {/* display */}
      <div className="bg-base-200 text-right p-3 rounded-lg text-lg font-mono h-20 flex flex-col justify-center shadow-inner overflow-x-auto">
        <span className="text-gray-500 text-sm">{input || "0"}</span>
        {result && <span className="font-bold text-xl text-neutral">{result}</span>}
      </div>

      {/* btns */}
      <div className="grid grid-cols-4 gap-2 mt-4">
        {[
          "7",
          "8",
          "9",
          "/",
          "4",
          "5",
          "6",
          "*",
          "1",
          "2",
          "3",
          "-",
          "0",
          ".",
          "%",
          "+",
        ].map((btn) => (
          <button
            key={btn}
            onClick={() => handleClick(btn)}
            className="btn btn-sm bg-base-300 hover:bg-base-200 text-lg font-semibold rounded-lg"
          >
            {operatorIcons[btn] || btn}
          </button>
        ))}

     
        <button
          onClick={handleClear}
          className="btn btn-sm bg-error rounded-lg text-white font-bold col-span-2 "
      
      >
          C
        </button>

        <button
          onClick={handleBackspace}
          className="btn btn-sm bg-warning rounded-lg text-white font-bold"
        >
          <MdBackspace />
        </button>
        <button
          onClick={handleCalculate}
          className="btn btn-sm bg-success rounded-lg text-white font-bold"
        >
          <FaEquals />
        </button>
      </div>
    </div>
  );
};

export default React.memo(Calculator);
