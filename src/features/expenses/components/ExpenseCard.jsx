import React from "react";
import { BiHome } from "react-icons/bi";

const ExpenseCard = ({cardKey, category, amount, type, date, bgColor = "bg-red-500", Icon = BiHome }) => {
  return (
    <div key={cardKey} className="card w-96 bg-base-100 shadow-md hover:shadow-xl transition-shadow rounded-xl overflow-hidden">
      <div className="flex items-center p-4 gap-4">
    
        <div className={`avatar rounded-full p-4 flex justify-center items-center ${bgColor}`}>
          <Icon className="text-4xl text-white" />
        </div>

   
        <div className="flex flex-col justify-between flex-1">
       
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold text-lg">{category}</span>
            <span className="font-bold text-lg">{amount} ₹</span>
          </div>

          <div className="flex justify-between items-center text-sm text-gray-500">
            <span>{type}</span>
            <span>{date}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ExpenseCard);
