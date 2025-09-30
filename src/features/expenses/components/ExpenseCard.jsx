import React, { useState } from "react";
import { BiHome } from "react-icons/bi";
import { formatCurrency } from "../../../utils/currencyUtils";
import dayjs from "dayjs";
import { MdDeleteForever, MdFiberNew } from "react-icons/md";

const ExpenseCard = ({
  theme,
  userCurrency = "INR",
  deleteExpense,
  category,
  amount,
  type,
  date,
  bgColor = "bg-red-500",
  createdAt,
  note = "",

  Icon = BiHome,
}) => {
    const [showNote, setShowNote] = useState(false);
    
  // console.log('render');
  const isNew = createdAt
    ? dayjs().diff(dayjs(createdAt), "minute") <= 5
    : false;
  return (
    <div
   
      className={`card ${note ? 'cursor-pointer':''} w-102 bg-base-100 shadow-md hover:shadow-xl transition-shadow rounded-xl overflow-hidden`}
      onClick={() =>  setShowNote(!showNote)}
      title={note ? 'Click to ' + (showNote ? 'close' : 'show') + ' note' : ''}

    >
      <div className="flex items-center p-4 gap-4">
        <div
          className={`avatar rounded-full p-4 flex justify-center items-center ${bgColor}`}
        >
          <Icon
            className={`  text-4xl 
            duration-300 
            ease-in-out    hover:scale-120 
            ${theme == "luxury" ? "text-black" : "text-white"}`}
          />
        </div>
        <div className="flex flex-col justify-between flex-1">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold text-lg">{category}</span>
            <span className="font-bold text-lg">
              {" "}
              {formatCurrency(amount, userCurrency)}
            </span>
          </div>

          <div className="flex justify-between items-center text-sm text-gray-500">
            <span>{type}</span>
            <span>{date}</span>
          </div>
        </div>
      </div>
      {isNew && (
        <div className="absolute z-10 -top-1  right-0 text-primary  text-xs font-bold px-2 py-1 rounded-full">
          <MdFiberNew size={30} />
        </div>
      )}
      { showNote && (
        
        <div className="absolute inset-0 bg-base-100 bg-opacity-90 rounded-xl p-4 overflow-auto z-10">
          <div className="max-h-full overflow-auto">
            <p className="text-sm leading-relaxed whitespace-pre-wrap">
              {
                note ?
                (
                 <>
                  <strong>Note:</strong> {note}
                 </>
                ):''
              }
            
            </p>
          </div>
          <button 
          title="Delete expense"
          onClick={deleteExpense}
          className="btn btn-error btn-sm"><MdDeleteForever size={25} /></button>
        </div>
      )}
    </div>
  );
};

export default React.memo(ExpenseCard, (prevProps, nextProps) => {
  if (prevProps.theme !== nextProps.theme && nextProps.theme === "luxury") {
    //this will ignore theme, so changing theme never triggers a re-render.
    return false; // trigger rerender
  }
  return (
   
    prevProps.category === nextProps.category &&
    prevProps.amount === nextProps.amount &&
    prevProps.type === nextProps.type &&
    prevProps.date === nextProps.date &&
    prevProps.bgColor === nextProps.bgColor &&
    prevProps.userCurrency === nextProps.userCurrency &&
    prevProps.Icon === nextProps.Icon &&
    prevProps.note === nextProps.note 
  );
});
