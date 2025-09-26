
import { MdHome, MdOutlinePayment, MdOutlinePayments } from "react-icons/md";

import { FaChartLine, FaEllipsisV, FaMoneyBillWave, FaPiggyBank } from "react-icons/fa";

import HeaderNavMobile from "../components/HeaderNavMobile";
import HeaderNav from "../components/HeaderNav";
import SettingsMenu from "../components/SettingsMenu";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";

const Header = () => {





  return (
    <>
   
      <nav className="hidden md:flex fixed top-0 w-full bg-base-100 text-base-content h-14 items-center gap-5 px-5  shadow-md">
        {/* <HeaderNav title="My Finance Tracker"   /> */}
        <Link to={"/"} className="font-bold me-auto ">My Finance Tracker</Link>
        <HeaderNav title="Expanses"  />
        <HeaderNav title="Incomes"  />
        <HeaderNav title="Investments"  />
        <HeaderNav title="Savings"  />
        {/* <ThemeToggle />
        <button onClick={handleLogout} className="btn btn-error">
          Logout
        </button> */}
        <SettingsMenu triggerIcon={<CgProfile className="text-2xl cursor-pointer" title="profile"  />}  />
        {/* <HeaderNav title=""  icon={<FiSettings className="text-xl"  />} /> */}
        
        
      </nav>

 
      <nav className="md:hidden fixed bottom-4 left-1/2 transform -translate-x-1/2 w-11/12 bg-base-100 text-base-content shadow-lg rounded-2xl">
        <div className="flex justify-around items-center h-16 px-4 relative">
          <HeaderNavMobile title="Expanses" icon={<MdOutlinePayments className="" />} />
          <HeaderNavMobile
            title="Incomes"
            icon={<FaMoneyBillWave className="" />}
          />
         <SettingsMenu isMobile={true} triggerIcon={<CgProfile className="text-3xl cursor-pointer" title="profile"  />} />
          <HeaderNavMobile title="Investments" icon={<FaChartLine className="" />} />
          <HeaderNavMobile title="Savings" icon={<FaPiggyBank className=""  />} />

  
        </div>
      </nav>
    </>
  );
};




export default Header;
