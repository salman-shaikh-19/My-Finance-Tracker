import React from "react";
import { Link } from "react-router-dom";

 const HeaderNavMobile = ({ title = "default", redirectTo = "/", icon,isActive }) => {
  return (
    <Link
      to={redirectTo}
      className={`flex flex-col items-center justify-center hover:text-primary  group ${
        isActive
          ? " text-primary"  
          : "border-transparent hover:border-gray-300 hover:text-gray-600"
      }`}

    >
      {icon && icon}
      <span className="text-xs">{title}</span>
      <span className={`${  isActive ? 'block':'hidden'} w-5 h-1 rounded-full bg-primary  group-hover:block `}></span>
    </Link>
  );
};

export default  React.memo(HeaderNavMobile);