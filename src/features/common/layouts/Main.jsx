import { useSelector } from "react-redux";
import Footer from "./Footer";
import Header from "./Header";

const Main = ({ children,mainClassName='' }) => {
  const {isSidebarOpen}=useSelector(state=>state.common)
  return (
    <>
      <Header />
      {/* <div className={`min-h-screen pt-10 lg:pt-20   ${mainClassName}`}
      
      >{children}</div> */}

      <main className={`transition-all duration-300 mt-0 bg-base-300  rounded-lg  p-2 lg:mt-14 md:mt-14 min-h-screen ${
          isSidebarOpen ? 'md:ml-64' : 'md:ml-16'
        } ${mainClassName}`}>{children}</main>
      {/* <Footer /> */}
    </>
  );
};

export default Main;
