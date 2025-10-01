import React from "react";

const ExpenseCategoryCountCard=({ 
  name, 
  count = 0, 
  Icon, 
  bg, 
  theme 
})=>{
   
  return (
    <div
      title={`${name} has ${count} ${count === 1 ? "expense" : "expenses"}`}
      className="flex w-50 items-center bg-base-100  transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl flex-col gap-2 card shadow-lg rounded-lg p-4"
    >
      <div
        className={`avatar rounded-full p-4 flex justify-center items-center ${bg}`}
      >
        <Icon
          className={`text-4xl duration-300 ease-in-out hover:scale-120 ${
            theme === "luxury" ? "text-black" : "text-white"
          }`}
        />
      </div>
         <p className="mt-3 text-lg font-semibold  text-center">
        {name}
      </p>

      {/* Expense Count */}
      <span className="text-sm font-medium text-gray-500 ">
        {count} {count === 1  ? "expense" : "expenses"}
      </span>
    </div>
  );



}
export default React.memo(ExpenseCategoryCountCard);