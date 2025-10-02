import { useSelector, useDispatch } from "react-redux";
import {  setUserCurrency } from "../commonSlice"
import React from "react";
import { currencySymbols } from "../../../utils/currencyUtils";


const SetUserCurrency = () => {
  const dispatch = useDispatch();
  const userCurrency = useSelector((state) => state.common.userCurrency);
 


  const handleChange = (e) => {
    dispatch(setUserCurrency(e.target.value));
  };

  return (
    <div className="">
      {/* <label className="label">
        <span className="label-text">Select Theme</span>
      </label> */}
    <select
    title="Set your Currency"
  className="select  "
  value={userCurrency}
  onChange={handleChange}
>
  {currencySymbols.map((c) => (
    <option key={c.code} value={c.code}>
      {c.code} ({c.symbol})
    </option>
  ))}
</select>
    </div>
  );
};

export default React.memo(SetUserCurrency);
