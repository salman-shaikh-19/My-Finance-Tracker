import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/css/index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import store from './store/store'
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
const savedLang = localStorage.getItem("appLang") || "en";
document.documentElement.lang = savedLang;
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>

    <BrowserRouter>
      <App />
        <ToastContainer 
          
          position="top-right" 
          autoClose={3000} 
          hideProgressBar={false} 
          newestOnTop={false} 
          closeOnClick 
          rtl={false} 
          pauseOnFocusLoss 
          draggable 
          pauseOnHover 
          
            
        />
    </BrowserRouter>
    </Provider>
  </StrictMode>
);
