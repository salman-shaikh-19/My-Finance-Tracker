import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FiSettings } from "react-icons/fi";
import { CgPassword, CgProfile } from "react-icons/cg";
import ThemeToggle from "../components/ThemeToggle";
import { fetchUserProfile, logoutUser } from "../../auth/authSlice";
import supabase from "../../../services/supabaseClient";
import { BiPlus, BiReset } from "react-icons/bi";
import { setExpenseLimit, setLoggedInUserId } from "../commonSlice";
import SetUserCurrency from "../components/SetUserCurrency";
import SetExpenseLimit from "../../expenses/components/SetExpenseLimit";
import CommonModal from "../components/CommonModal";
import { toast } from "react-toastify";
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
            isMobile
              ? "absolute bottom-20 -right-15 "
              : "absolute top-16 right-0"
          }  w-50 bg-base-100 shadow-lg rounded-xl border p-3 z-50`}
        >
          <div className="flex gap-3 border-b pb-3 mb-2 ">
            <div>
              <p className="font-semibold text-sm truncate w-32">
                {profile?.user_name || "User Name"}
              </p>
              <p className="text-xs text-gray-500 ">
                {profile?.user_email || "User Email "}
              </p>
            </div>
          </div>
          <ul className="menu menu-compact ">{children || ""}</ul>
          <div className="mt-3 lg:mt-0 lg:pt-0 lg:border-t-0 border-t pt-2 ">
            <SetUserCurrency />
          </div>
          <div className="mt-2 ">
            <ThemeToggle onClick={() => handleClickItem()} />
          </div>
          <CommonModal
            ref={modalRef}
            modalId="expense-limit-set-modal"
            openModalBtnClassName="
                     btn-sm mt-2 w-full
                  "
            openModalBtnText={<>Expense Limit </>}
          >
            <SetExpenseLimit handleSubmit={handleExpenseLimit} />
          </CommonModal>
          <div className="mt-2">
            {deferredPrompt && (
              <button
                onClick={async () => {
                  deferredPrompt.prompt();
                  const { outcome } = await deferredPrompt.userChoice;
                  if (outcome === "accepted") {
                    toast.success("App installation started!");
                  } else {
                    toast.info("App installation cancelled.");
                  }
                  setDeferredPrompt(null);
                }}
                className="btn btn-info btn-sm mt-2 w-full"
              >
                Install App
              </button>
            )}
          </div>

          <button
            onClick={() => handleClickItem(handleLogout)}
            className="btn  btn-error btn-sm mt-3 w-full"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default React.memo(SettingsMenu);
