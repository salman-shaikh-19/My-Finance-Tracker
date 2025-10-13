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

      <main className={`transition-all duration-300 mt-0 lg:mt-14 md:mt-14 min-h-screen ${
          isSidebarOpen ? 'md:ml-64' : 'md:ml-16'
        } ${mainClassName}`}>
        <div className=" bg-base-300  rounded-lg min-h-screen p-2">
          {children}
        </div>
      </main>
      {/* <Footer /> */}
    </>
  );
};

export default Main;
