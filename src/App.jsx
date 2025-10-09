import { useEffect } from "react";
import { toast } from "react-toastify";
import AppRoutes from "./routes";
import { useSelector } from "react-redux";



function App() {
  const {theme}=useSelector(state=>state.common);
 

  useEffect(() => {
    // block screenshots, printing, copying, cutting, selecting all, dev tools, viewing page source and right click 
    const handleKeyDown = (e) => {
      if (e.key === "PrintScreen") {
        toast.warning("Screenshots are disabled!");
        e.preventDefault();
      }
      if (e.ctrlKey && e.key === "p") {
        toast.warning("Printing is disabled!");
        e.preventDefault();
      }
      if (e.ctrlKey && e.key === "s") {
        toast.warning("Saving is disabled!");
        e.preventDefault();
      }
      if (e.ctrlKey && e.key === "c") {
        toast.warning("Copying is disabled!");
        e.preventDefault();
      }
      if (e.ctrlKey && e.key === "x") {
        toast.warning("Cutting is disabled!");
        e.preventDefault();
      }
      if (e.ctrlKey && e.key === "a") {
        toast.warning("Selecting all is disabled!");
        e.preventDefault();
      }
      if (e.ctrlKey && e.shiftKey && e.key === "I") {
        toast.warning("Dev tools are disabled!");
        e.preventDefault();
      }
      if (e.ctrlKey && e.shiftKey && e.key === "J") {
        toast.warning("Dev tools are disabled!");
        e.preventDefault();
      }
      if (e.ctrlKey && e.shiftKey && e.key === "C") {
        toast.warning("Dev tools are disabled!");
        e.preventDefault();
      }
      // if (e.key === "F12") {
      //   toast.warning("Dev tools are disabled!");
      //   e.preventDefault();
      // }

      //disbale right click and prevent duplicate toasts
      document.oncontextmenu = function (e) {
        e.preventDefault();
        toast.warning("Right click is disabled!");
        return false;
      };
 

       
      if (e.ctrlKey && e.key === 'u') {
        toast.warning("Viewing page source is disabled!");
        e.preventDefault();
      }
      
      


         

   
     
      
    };
    document.addEventListener("keydown", handleKeyDown);

    // Service worker registration
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then(() => {
          // console.log("Service Worker registered:", reg);
        })
        .catch(() =>{

          // console.error("Service Worker registration failed:", err)
        }
        );
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);



  return (
    <>
      <div data-theme={theme} className="bg-base-200  select-none lg:select-text transition-colors duration-300  ">
        {/* <Beta /> */}
         <AppRoutes />
      </div>
    </>
  );
}

export default App;
