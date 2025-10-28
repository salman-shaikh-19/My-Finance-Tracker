import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FiSettings } from "react-icons/fi";
import { CgPassword, CgProfile } from "react-icons/cg";
import ThemeToggle from "../components/ThemeToggle";
import { fetchUserProfile, logoutUser } from "../../auth/authSlice";
import supabase from "../../../services/supabaseClient";
import { BiPlus, BiReset } from "react-icons/bi";
import { resetSettings, setExpenseLimit, setLoggedInUserId } from "../commonSlice";
import SetUserCurrency from "../components/SetUserCurrency";
import SetExpenseLimit from "../../expenses/components/SetExpenseLimit";
import CommonModal from "../components/CommonModal";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import TranslatePage from "../components/TranslatePage";
import { MdSettings } from "react-icons/md";



const SettingsMenu = ({
  isMobile = false,
  triggerIcon = <FiSettings className="text-xl cursor-pointer" />,
  children,
}) => {
  const [open, setOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const menuRef = useRef(null);
  const modalRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedInUserId = useSelector((state) => state.common.loggedInUserId);
  const { profile } = useSelector((state) => state.auth);
  const handleLogout = async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      localStorage.removeItem("sb-wudvvfqqjqtjplznzwdj-auth-token");
      if (!session) {
        navigate("/login");
        return;
      }

      await dispatch(logoutUser()).unwrap();
      setOpen(false);
      dispatch(setLoggedInUserId(null));
      navigate("/login");
    } catch (err) {
      // console.error("lgout fail:", err);
    }
  };

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault(); // Prevents the mini-infobar from appearing
      setDeferredPrompt(e); // Save the event for later use
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () =>
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
  }, []);

  const handleClickItem = (callback) => {
    if (callback) callback();
    setOpen(false);
  };

  useEffect(() => {
    //profile data get
    if (loggedInUserId) dispatch(fetchUserProfile(loggedInUserId));
  }, [dispatch, loggedInUserId]);

  useEffect(() => {
    // Close the menu when clicking outside
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleExpenseLimit = (values, { resetForm, setSubmitting }) => {
    dispatch(setExpenseLimit(values.expenseLimit));
    toast.success(`Expense limit set to ${values.expenseLimit} successfully`);
    resetForm();
    modalRef.current?.close();
    setSubmitting(false);
  };

  const handleResetSettings = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to reset settings!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
      showCancelButton: true,
      confirmButtonText: "Yes, reset it!",
      cancelButtonText: "No, cancel!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(resetSettings());
        toast.success("Settings reset successfully");
      }
    });
  };
  return (
    <div ref={menuRef} className="relative  ">
      <div
        onClick={(e) => {
          e.stopPropagation();
          setOpen(!open);
        }}
      >
        {triggerIcon}
      </div>

      {open && (
         <div
          className={`${
            isMobile ? "bottom-20 -right-25" : "top-14 right-0"
          } absolute w-64 bg-base-100 shadow-2xl rounded-2xl border border-gray-200 z-50 p-4`}
        >
              <div className="flex items-center gap-3 border-b pb-3 mb-3">
            
            <div>
              <p className="font-semibold text-sm truncate w-40">
                {profile?.user_name || "User Name"}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {profile?.user_email || "user@email.com"}
              </p>
            </div>
          </div>
          <div className="">
            <p className=" text-xs font-semibold text-gray-500 uppercase ">
              Preferences  
            </p>
            <ul className={`menu menu-compact ${children ? "" : "hidden"}`}>{children || ""}</ul>
            <div className="flex items-center gap-2 my-2">
              <div className="flex items-center justify-between ">
                <SetUserCurrency />
              </div>

              <div className="flex items-center justify-between">
                <ThemeToggle />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              
              <TranslatePage />
            
            <CommonModal
              ref={modalRef}
              modalId="expense-limit-set-modal"
              openModalBtnClassName="
                   btn btn-sm btn-outline btn-primary w-full
                  "
              openModalBtnText={<>Expense Limit </>}
            >
              <SetExpenseLimit handleSubmit={handleExpenseLimit} />
            </CommonModal>
          
              {deferredPrompt && (
             <button
             onClick={async () => {
               deferredPrompt.prompt();
               const { outcome } = await deferredPrompt.userChoice;
               toast[outcome === "accepted" ? "success" : "info"](
                 outcome === "accepted"
                   ? "App installation started!"
                   : "App installation cancelled."
               );
               setDeferredPrompt(null);
             }}
             className=" btn btn-sm btn-outline btn-secondary w-full"
           >
                  Install App
                </button>
              )}
       
           </div>
           <div className="border-t mt-4 pt-3 space-y-2">
            <Link
              onClick={handleResetSettings}

              className="btn btn-sm btn-outline btn-accent w-full flex items-center gap-2"
            >Reset Settings</Link>
            <button
              onClick={() => handleClickItem(handleLogout)}
              className="btn btn-sm btn-error w-full flex items-center gap-2"
            >
              Logout
            </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};




export default React.memo(SettingsMenu);
