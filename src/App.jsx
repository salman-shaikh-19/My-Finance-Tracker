import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import AppRoutes from "./routes";
import NetworkStatus from "./features/common/components/NetworkStatus";
import { clearCalculator } from "./features/common/commonSlice";


function App() {
  const { theme } = useSelector((state) => state.common);
  const dispatch = useDispatch();
  const [lang, setLang] = useState(localStorage.getItem("appLang") || "en");

  useEffect(() => {
    dispatch(clearCalculator());
  }, [dispatch]);


  
  return (
  
      <div
        data-theme={theme}
        className="bg-base-200 select-none lg:select-text transition-colors duration-300 min-h-screen"
      >
       
        <AppRoutes />
        <NetworkStatus />
      </div>
    
  );
}


export default App;
