import { useDispatch } from "react-redux";
import { logoutUser } from "../../auth/authSlice";
import ThemeToggle from "../components/ThemeToggle";
import { MdHome, MdOutlinePayment, MdOutlinePayments } from "react-icons/md";
import { BiSearch } from "react-icons/bi";
import supabase from "../../../services/supabaseClient";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { BsThreeDots } from "react-icons/bs";
import { FaChartLine, FaMoneyBillWave, FaPiggyBank } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";

const Header = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        // console.warn("No active session, skipping logout");
        navigate("/login");
        return;
      }

      await dispatch(logoutUser()).unwrap();
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  // close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
   
      <nav className="hidden md:flex fixed top-0 w-full bg-base-100 text-base-content h-16 items-center justify-around shadow-md">
        <HeaderNav title="Expanses" icon={<MdOutlinePayments className="text-xl" />} />
        <HeaderNav title="Incomes" icon={<FaMoneyBillWave className="text-xl" />} />
        <HeaderNav title="Investments" icon={<FaChartLine className="text-xl"  />} />
        <HeaderNav title="Savings" icon={<FaPiggyBank className="text-xl"  />} />
        <HeaderNav title="" icon={<FiSettings className="text-xl"  />} />
        <ThemeToggle />
        <button onClick={handleLogout} className="btn btn-primary">
          Logout
        </button>
      </nav>

 
      <nav className="md:hidden fixed bottom-4 left-1/2 transform -translate-x-1/2 w-11/12 bg-base-100 text-base-content shadow-lg rounded-2xl">
        <div className="flex justify-around items-center h-16 px-4 relative">
          <HeaderNavMobile title="Expanses" icon={<MdOutlinePayments className="" />} />
          <HeaderNavMobile
            title="Incomes"
            icon={<FaMoneyBillWave className="" />}
          />
          <HeaderNavMobile title="Investments" icon={<FaChartLine className="" />} />
          <HeaderNavMobile title="Savings" icon={<FaPiggyBank className=""  />} />

  
          <div ref={menuRef}>
            <button
              onClick={() => setOpen(!open)}
              className="flex flex-col items-center justify-center hover:text-primary relative"
            >
              <BsThreeDots className="text-xl" />
              <span className="text-xs">More</span>
            </button>

            {open && (
              <div className="absolute bottom-20 right-4 w-44 bg-base-100 shadow-lg rounded-xl border p-3 z-50">
                <ul className="menu menu-compact">
                  <li>
                    <Link to="/profile"><CgProfile  />Profile</Link>
                  </li>
                  <li>
                    <Link to="/settings"><FiSettings  />Settings</Link>
                  </li>
                  
                </ul>

                <div className="mt-3 border-t pt-2">
                  <ThemeToggle />
                </div>

                <button
                  onClick={handleLogout}
                  className="btn btn-sm btn-error mt-3 w-full"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};


export const HeaderNav = ({ title = "default", redirectTo = "/", icon }) => {
  return (
    <Link to={redirectTo} className="px-4 hover:text-primary flex items-center gap-1">
      {icon && icon}
      {title}
    </Link>
  );
};

export const HeaderNavMobile = ({ title = "default", redirectTo = "/", icon }) => {
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

export default Header;
