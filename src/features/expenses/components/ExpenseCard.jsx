import React from "react";
import { BiHome } from "react-icons/bi";
import { formatCurrency } from "../../../utils/currencyUtils";


const ExpenseCard = ({theme,userCurrency='INR', category, amount, type, date, bgColor = "bg-red-500", Icon = BiHome }) => {
  console.log('called');
  
  return (
    <div  className="card w-102 bg-base-100 shadow-md hover:shadow-xl transition-shadow rounded-xl overflow-hidden">
      <div className="flex items-center p-4 gap-4">
    
        <div className={`avatar rounded-full p-4 flex justify-center items-center ${bgColor}`}>
          <Icon className={`text-4xl  ${theme=='luxury' ? 'text-black':'text-white'}`} />
        </div>
        <div className="flex flex-col justify-between flex-1">
       
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold text-lg">{category}</span>
            <span className="font-bold text-lg">  {formatCurrency(amount, userCurrency)}</span>
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


export default React.memo(ExpenseCard, (prevProps, nextProps) => {
  if (prevProps.theme !== nextProps.theme && nextProps.theme === "luxury") { //this will ignore theme, so changing theme never triggers a re-render.
    return false; // trigger rerender 
    }
  return (
    prevProps.category === nextProps.category &&
    prevProps.amount === nextProps.amount &&
    prevProps.type === nextProps.type &&
    prevProps.date === nextProps.date &&
    prevProps.bgColor === nextProps.bgColor &&
    prevProps.userCurrency === nextProps.userCurrency &&
    prevProps.Icon === nextProps.Icon

  );
});

