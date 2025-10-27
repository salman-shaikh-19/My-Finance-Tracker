// import {  MdOutlinePayments } from "react-icons/md";

// import {
//   FaChartLine,

//   FaHandHoldingUsd,
//   FaMoneyBillWave,

// } from "react-icons/fa";

// import HeaderNavMobile from "../components/HeaderNavMobile";
// import HeaderNav from "../components/HeaderNav";
// import SettingsMenu from "./SettingsMenu";
// import { Link, useLocation } from "react-router-dom";
// import { CgProfile } from "react-icons/cg";
// import { BiPlusCircle } from "react-icons/bi";
// import { GrDashboard } from "react-icons/gr";
// import React, { useState } from "react";

// const Header = () => {
//   const [spinning, setSpinning] = useState(false);
//   const location = useLocation();
//   const currentPath = location.pathname;
//   const handleClick = () => {
//     setSpinning(true);
//     setTimeout(() => setSpinning(false), 500); // remove class after animation
//   };

//   // useEffect(()=>{
//   //   console.log('logg');

//   // },[])

//   return (
//     <>
//       <nav className="hidden md:flex fixed top-0 w-full bg-base-100 text-base-content h-14 items-center gap-5 px-5  shadow-md z-50  ">
//         <Link to={"/"} className="font-bold me-auto select-none text-lg ">
//           My Finance Tracker
//         </Link>
//         <HeaderNav
//           title="Dashboard"
//           redirectTo="/"
//           isActive={currentPath === "/"}
//         />
//         <HeaderNav
//           title="Expenses"
//           redirectTo="/expenses"
//           isActive={currentPath === "/expenses"}
//         />
//         <HeaderNav
//           title="Incomes"
//           redirectTo="/incomes"
//           isActive={currentPath === "/incomes"}
//         />
//         <HeaderNav
//           title="Liabilities"
//           redirectTo="/liabilities"
//           isActive={currentPath === "/liabilities"}
//         />
//         <HeaderNav
//           title="Investments"
//           redirectTo="/investments"
//           isActive={currentPath === "/investments"}
//         />

//         {/* <ThemeToggle />
//         <button onClick={handleLogout} className="btn btn-error">
//           Logout
//         </button> */}
//         <SettingsMenu
//           triggerIcon={
//             <CgProfile
//               className="text-2xl cursor-pointer hover:text-primary"
//               title="profile"
//             />
//           }
//         />
//         {/* <HeaderNav title=""  icon={<FiSettings className="text-xl"  />} /> */}
//       </nav>

//       <nav className="md:hidden  fixed bottom-4 left-1/2 transform -translate-x-1/2 w-11/12 bg-base-100 text-base-content shadow-lg rounded-2xl z-50">
//         <div className="flex justify-around items-center h-16 px-4 relative ">
//           <HeaderNavMobile
//             title="Dashboard"
//             isActive={currentPath === "/"}
//             icon={<GrDashboard className="text-primary" />}
//           />
//           <HeaderNavMobile
//             title="Expenses"
//             redirectTo="/expenses"
//             isActive={currentPath === "/expenses"}
//             icon={<MdOutlinePayments className="text-error" />}
//           />

//           <SettingsMenu
//             isMobile={true}
//             triggerIcon={
//               <BiPlusCircle
//                 className={`text-5xl cursor-pointer hover:text-primary ${
//                   spinning ? "animate-spin" : ""
//                 }`}
//                 title="More"
//                 onClick={handleClick}
//               />
//             }
//           >
//             <li>
//               <Link
//                 to="/liabilities"
//                 className={` ${
//                   currentPath === "/liabilities"
//                     ? "bg-primary text-white"
//                     : "hover:bg-base-200"
//                 }`}
//               >
//                 <FaHandHoldingUsd className="text-error" /> Liabilities
//               </Link>
//             </li>
//           </SettingsMenu>

//           <HeaderNavMobile
//             title="Incomes"
//             redirectTo="/incomes"
//             isActive={currentPath === "/incomes"}
//             icon={<FaMoneyBillWave className="text-success" />}
//           />
//           <HeaderNavMobile
//             title="Investments"
//             isActive={currentPath === "/investments"}
//             redirectTo="/investments"
//             icon={<FaChartLine className="text-info" />}
//           />
//         </div>
//       </nav>
//     </>
//   );
// };

// export default React.memo(Header);
import { MdOutlinePayments } from "react-icons/md";
import { FaChartLine, FaHandHoldingUsd, FaMoneyBillWave } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { BiCalculator, BiMenu, BiPlusCircle, BiX } from "react-icons/bi";
import { GrDashboard } from "react-icons/gr";
import React, { useState } from "react";

import HeaderNavMobile from "../components/HeaderNavMobile";
// import HeaderNav from "../components/HeaderNav";
import SettingsMenu from "./SettingsMenu";
import { useDispatch, useSelector } from "react-redux";
import { setIsCalculatorOpen, setIsSidebarOpen } from "../commonSlice";

import CalculatorWrapper from "../components/CalculatorWrapper";

const HeaderWithSidebar = () => {
  const [spinning, setSpinning] = useState(false);

  const { isSidebarOpen, isCalculatorOpen } = useSelector(
    (state) => state.common
  );
  const location = useLocation();
  const dispatch = useDispatch();

  const currentPath = location.pathname;

  const handleClick = () => {
    setSpinning(true);
    setTimeout(() => setSpinning(false), 500);
  };

  const sidebarItems = [
    { title: "Dashboard", path: "/", icon: <GrDashboard /> },
    { title: "Expenses", path: "/expenses", icon: <MdOutlinePayments /> },
    { title: "Incomes", path: "/incomes", icon: <FaMoneyBillWave /> },
    { title: "Liabilities", path: "/liabilities", icon: <FaHandHoldingUsd /> },
    { title: "Investments", path: "/investments", icon: <FaChartLine /> },
  ];

  return (
    <>
      <nav className="hidden md:flex fixed top-0 w-full bg-base-100 text-base-content h-14 items-center gap-5 px-5 shadow-md z-40">
        <div
          data-tip={`${isSidebarOpen ? "Close Sidebar" : "Open Sidebar"}`}
          className="tooltip tooltip-right tooltip-primary"
        >
          <button
            onClick={() => dispatch(setIsSidebarOpen(!isSidebarOpen))}
            className="btn btn-ghost btn-sm transition-all duration-300 ease-in-out"
          >
            {isSidebarOpen ? (
              <BiX
                size={25}
                className=" transition-transform duration-300 rotate-0"
              />
            ) : (
              <BiMenu
                size={25}
                className=" transition-transform duration-300 rotate-0"
              />
            )}
          </button>
        </div>

        <Link to={"/"} className="font-bold me-auto select-none text-lg">
          My Finance Tracker
        </Link>

        {/* <HeaderNav
          title="Dashboard"
          redirectTo="/"
          isActive={currentPath === "/"}
        />
        <HeaderNav
          title="Expenses"
          redirectTo="/expenses"
          isActive={currentPath === "/expenses"}
        />
        <HeaderNav
          title="Incomes"
          redirectTo="/incomes"
          isActive={currentPath === "/incomes"}
        />
        <HeaderNav
          title="Liabilities"
          redirectTo="/liabilities"
          isActive={currentPath === "/liabilities"}
        />
        <HeaderNav
          title="Investments"
          redirectTo="/investments"
          isActive={currentPath === "/investments"}
        /> */}
        <div
          data-tip={`${isCalculatorOpen ? "Close" : "Open"} Calculator`}
          className="tooltip tooltip-bottom tooltip-primary"
        >
          <Link
            onClick={() => dispatch(setIsCalculatorOpen(!isCalculatorOpen))}
          >
            <BiCalculator size={25} className="text-primary" />
          </Link>
        </div>
        <SettingsMenu
          triggerIcon={
            <CgProfile
              className="text-3xl cursor-pointer hover:text-primary"
              title="profile"
            />
          }
        />
      </nav>

      <aside
        className={`hidden md:flex fixed top-14 z-50 left-0 h-[calc(100vh-3.5rem)] bg-base-200 border-r border-base-300 
        transition-all duration-500 ease-in-out overflow-hidden
        ${isSidebarOpen ? "w-64" : "w-16"}`}
      >
        <ul className="menu p-4 w-full text-base-content">
          {sidebarItems.map((item) => (
            <div
              key={item.path}
              className={`${
                !isSidebarOpen && "tooltip tooltip-primary  tooltip-right"
              }`}
              data-tip={item.title}
              title={!isSidebarOpen ? item.title : ''}
            >
              <li>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 p-2.5 m-1 rounded-lg transition  duration-1000 ease-in-out  ${
                    currentPath === item.path
                      ? "bg-primary text-white"
                      : "hover:bg-base-300"
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  {isSidebarOpen && <span>{item.title}</span>}
                </Link>
              </li>
            </div>
          ))}
        </ul>
      </aside>
      {isCalculatorOpen && (
        <>
          <CalculatorWrapper />
        </>
      )}
      <nav className="md:hidden fixed bottom-4 left-1/2 transform -translate-x-1/2 w-11/12 bg-base-100 text-base-content shadow-lg rounded-2xl z-50">
        <div className="flex justify-around items-center h-16 px-4 relative ">
          <HeaderNavMobile
            title="Dashboard"
            isActive={currentPath === "/"}
            icon={<GrDashboard className="text-primary" />}
          />
          <HeaderNavMobile
            title="Expenses"
            redirectTo="/expenses"
            isActive={currentPath === "/expenses"}
            icon={<MdOutlinePayments className="text-error" />}
          />

          <SettingsMenu
            isMobile={true}
            triggerIcon={
              <BiPlusCircle
                className={`text-5xl cursor-pointer hover:text-primary ${
                  spinning ? "animate-spin" : ""
                }`}
                title="More"
                onClick={handleClick}
              />
            }
          >
            <li>
              <Link
                to="/liabilities"
                className={`${
                  currentPath === "/liabilities"
                    ? "bg-primary text-white"
                    : "hover:bg-base-200"
                }`}
              >
                <FaHandHoldingUsd className="text-error" /> Liabilities
              </Link>
            </li>
            <li>
              <Link
                onClick={() => dispatch(setIsCalculatorOpen(!isCalculatorOpen))}
              >
                <BiCalculator className="text-success" /> Calculator
              </Link>
            </li>
          </SettingsMenu>

          <HeaderNavMobile
            title="Incomes"
            redirectTo="/incomes"
            isActive={currentPath === "/incomes"}
            icon={<FaMoneyBillWave className="text-success" />}
          />
          <HeaderNavMobile
            title="Investments"
            isActive={currentPath === "/investments"}
            redirectTo="/investments"
            icon={<FaChartLine className="text-info" />}
          />
        </div>
      </nav>
    </>
  );
};

export default React.memo(HeaderWithSidebar);
