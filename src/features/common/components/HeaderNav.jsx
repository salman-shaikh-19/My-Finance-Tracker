import { Link } from "react-router-dom";

 const HeaderNav = ({ title = "default", redirectTo = "/", icon }) => {
  return (
    <Link to={redirectTo} className="px-4 hover:text-primary flex items-center gap-1">
      {icon && icon}
      {title}
    </Link>
  );
};

export default HeaderNav;