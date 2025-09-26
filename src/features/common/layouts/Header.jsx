
import { MdHome, MdOutlinePayment, MdOutlinePayments } from "react-icons/md";

import { FaChartLine, FaMoneyBillWave, FaPiggyBank } from "react-icons/fa";

import HeaderNavMobile from "../components/HeaderNavMobile";
import HeaderNav from "../components/HeaderNav";
import SettingsMenu from "../components/SettingsMenu";

const Header = () => {





  return (
    <>
   
      <nav className="hidden md:flex fixed top-0 w-full bg-base-100 text-base-content h-16 items-center justify-around shadow-md">
        <HeaderNav title="Expanses" icon={<MdOutlinePayments className="text-xl" />} />
        <HeaderNav title="Incomes" icon={<FaMoneyBillWave className="text-xl" />} />
        <HeaderNav title="Investments" icon={<FaChartLine className="text-xl"  />} />
        <HeaderNav title="Savings" icon={<FaPiggyBank className="text-xl"  />} />
        {/* <ThemeToggle />
        <button onClick={handleLogout} className="btn btn-error">
          Logout
        </button> */}
        <SettingsMenu />
        {/* <HeaderNav title=""  icon={<FiSettings className="text-xl"  />} /> */}
        
        
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

  
         <SettingsMenu isMobile={true} />
        </div>
      </nav>
    </>
  );
};




export default Header;
