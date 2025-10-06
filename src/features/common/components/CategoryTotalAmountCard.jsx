import React, { useMemo } from "react";
import { formatCurrency } from "../../../utils/currencyUtils";

const CategoryTotalAmountCard = ({
  name,
  totalAmount = 0,
  Icon,
  bg,
  userCurrency = "INR",
}) => {
  const formattedCurrency = useMemo(
    () => formatCurrency(totalAmount, userCurrency),
    [totalAmount, userCurrency]
  );
  // console.log('logg from category total amount card');
  
  return (
    <div
      title={`You have spent ${formattedCurrency} on ${name} `}
      className="flex w-40 items-center bg-base-100  transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl flex-col gap-2 card shadow-lg rounded-lg p-4 "
    >
      <div
        className={`avatar rounded-full p-4 flex justify-center items-center  ${bg}`}
      >
        <Icon
          className={`text-4xl duration-300 ease-in-out hover:scale-120  text-white`}
        />
      </div>
      <p className="mt-3 text-lg font-semibold  text-center  ">{name}</p>

      <span className="text-sm font-medium text-gray-500 ">
        {formattedCurrency}
      </span>
    </div>
  );
};
export default React.memo(CategoryTotalAmountCard);
