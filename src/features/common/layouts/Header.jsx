import { MdHome, MdOutlinePayment, MdOutlinePayments } from "react-icons/md";

import {
  FaChartLine,
  FaEllipsisV,
  FaMoneyBillWave,
  FaPiggyBank,
} from "react-icons/fa";

import HeaderNavMobile from "../components/HeaderNavMobile";
import HeaderNav from "../components/HeaderNav";
import SettingsMenu from "../components/SettingsMenu";
import { Link, useLocation } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { BiPlusCircle } from "react-icons/bi";
import { GrDashboard } from "react-icons/gr";
import { useEffect, useState } from "react";

const Header = () => {
   const [spinning, setSpinning] = useState(false);
   const location = useLocation(); // gives current URL
  const currentPath = location.pathname;
     const handleClick = () => {
    setSpinning(true);
    setTimeout(() => setSpinning(false), 500); // remove class after animation
  };

  // useEffect(()=>{
  //   console.log('logg');
    
  // },[])
  
  return (
    <>
      <nav className="hidden md:flex fixed top-0 w-full bg-base-100 text-base-content h-14 items-center gap-5 px-5  shadow-md z-50">
        <Link to={"/"} className="font-bold me-auto select-none ">
          My Finance Tracker
        </Link>
        <HeaderNav title="Home" redirectTo="/"  isActive={currentPath === "/"} />
        <HeaderNav title="Expenses" redirectTo='/expenses'  isActive={currentPath === "/expenses"} />
        <HeaderNav title="Incomes"  isActive={currentPath === "/incomes"} />
        <HeaderNav title="Investments"  isActive={currentPath === "/investments"} />
        <HeaderNav title="Savings"  isActive={currentPath === "/savings"} />
        {/* <ThemeToggle />
        <button onClick={handleLogout} className="btn btn-error">
          Logout
        </button> */}
        <SettingsMenu
          triggerIcon={
            <CgProfile
              className="text-2xl cursor-pointer hover:text-primary"
              title="profile"
            />
          }
        />
        {/* <HeaderNav title=""  icon={<FiSettings className="text-xl"  />} /> */}
      </nav>

      <nav className="md:hidden fixed bottom-4 left-1/2 transform -translate-x-1/2 w-11/12 bg-base-100 text-base-content shadow-lg rounded-2xl z-50">
        <div className="flex justify-around items-center h-16 px-4 relative">
          <HeaderNavMobile
            title="Expenses"
            redirectTo="/expenses"
            isActive={currentPath === "/expenses"}
            icon={<MdOutlinePayments className="" />}
          />
          <HeaderNavMobile
            title="Incomes"
            isActive={currentPath === "/incomes"}
            icon={<FaMoneyBillWave className="" />}
          />
          <SettingsMenu
            isMobile={true}
            triggerIcon={
               <BiPlusCircle
              className={`text-5xl cursor-pointer hover:text-primary ${spinning ? "animate-spin" : ""}`}
              title="More"
              onClick={handleClick}
            />
            }
          >
            <li>
              <Link to="/" className={` ${currentPath==='/' ? "bg-primary text-white" : "hover:bg-base-200"}`}>
                <GrDashboard /> Dashboard
              </Link>
            </li>
          </SettingsMenu>
          <HeaderNavMobile
            title="Investments"
            isActive={currentPath === "/investments"}
            icon={<FaChartLine className="" />}
          />
          <HeaderNavMobile
            title="Savings"
            isActive={currentPath === "/savings"}
            icon={<FaPiggyBank className="" />}
          />
        </div>
      </nav>
    </>
  );
};

export default Header;
