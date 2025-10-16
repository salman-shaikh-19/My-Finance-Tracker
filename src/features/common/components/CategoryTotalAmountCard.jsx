import React, { useMemo } from "react";
import { formatCurrency } from "../../../utils/currencyUtils";

const CategoryTotalAmountCard = ({
  name,
  totalAmount = 0,
  Icon,
  bg,
  userCurrency = "INR",
  loading = false,
}) => {
  const formattedCurrency = useMemo(
    () => formatCurrency(totalAmount, userCurrency),
    [totalAmount, userCurrency]
  );

  return loading ? (
   <div className="flex flex-col items-center gap-2 bg-base-200 card shadow-lg rounded-lg p-4 w-full animate-pulse">
      {/* Skeleton for avatar */}
      <div className={`avatar rounded-full p-4 flex justify-center items-center bg-base-100`}>
        <div className="h-16 w-16 bg-base-100 rounded-full"></div>
      </div>

      {/* Skeleton for title */}
      <div className="h-5 w-24 bg-base-100 rounded mt-3"></div>

      {/* Skeleton for amount */}
      <div className="h-4 w-16 bg-base-100 rounded mt-1"></div>
    </div>
  ) : (
    <div
      title={`You have spent ${formattedCurrency} on ${name}`}
      className="flex flex-col items-center gap-2 bg-base-100 card shadow-lg rounded-lg p-4 transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl w-full"
    >
      <div
        className={`avatar rounded-full p-4 flex justify-center items-center ${bg}`}
      >
        <Icon className="text-4xl text-white transition-transform duration-300 ease-in-out hover:scale-110" />
      </div>

      <p className="mt-3 text-lg font-semibold text-center">{name}</p>

      <span className="text-sm font-medium text-gray-500 text-center">
        {formattedCurrency}
      </span>
    </div>
  );
};

export default React.memo(CategoryTotalAmountCard);
