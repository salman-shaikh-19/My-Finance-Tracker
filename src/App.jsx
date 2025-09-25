import { useEffect } from "react";
import { toast } from "react-toastify";
import AppRoutes from "./routes";
import { useSelector } from "react-redux";

function App() {
  const {theme}=useSelector(state=>state.common);

  useEffect(() => {
    // Block screenshots & printing
    const handleKeyDown = (e) => {
      if (e.key === "PrintScreen") {
        toast.warning("Screenshots are disabled!");
        e.preventDefault();
      }
      if (e.ctrlKey && e.key === "p") {
        toast.warning("Printing is disabled!");
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
      <div data-theme={theme} className="">
        {/* <Beta /> */}
         <AppRoutes />
      </div>
    </>
  );
}

export default App;
