import { Link } from "react-router-dom";

 const HeaderNavMobile = ({ title = "default", redirectTo = "/", icon }) => {
  return (
    <Link
      to={redirectTo}
      className="flex flex-col items-center justify-center hover:text-primary group"
    >
      {icon && icon}
      <span className="text-xs">{title}</span>
      <span className="block w-5 h-1 rounded-full bg-primary hidden group-hover:block"></span>
    </Link>
  );
};

export default  HeaderNavMobile;