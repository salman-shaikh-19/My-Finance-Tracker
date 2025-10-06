import React from "react";
import { Link } from "react-router-dom";

 const HeaderNav = ({ title = "default", redirectTo = "/", icon,isActive }) => {
  // console.log('logg from header nav');
  
  return (
    <Link to={redirectTo} className={`   hover:text-primary flex items-center gap-1 ${
         isActive
          ? "border-b text-primary"   // underline + text color
          : "border-transparent hover:border-gray-300 hover:text-gray-600"
      }`}
>
      {icon && icon}
      {title}
    </Link>
  );
};

export default React.memo(HeaderNav);