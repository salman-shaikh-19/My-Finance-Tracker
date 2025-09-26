import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FiSettings } from "react-icons/fi";
import { CgPassword, CgProfile } from "react-icons/cg";
import ThemeToggle from "./ThemeToggle";
import { logoutUser } from "../../auth/authSlice";
import supabase from "../../../services/supabaseClient";
import { BiReset } from "react-icons/bi";
import { setLoggedInUserId } from "../commonSlice";
import SetUserCurrency from "./SetUserCurrency";

const SettingsMenu = ({
  isMobile = false,
  triggerIcon = <FiSettings className="text-xl cursor-pointer" />,
  children
}) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const handleClickItem = (callback) => {
    if (callback) callback();
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={menuRef} className="relative ">
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
          }  w-42 bg-base-100 shadow-lg rounded-xl border p-3 z-50`}
        >
          <ul className="menu menu-compact ">
            {children}
            <li>
              <Link to="/profile" onClick={() => handleClickItem()}>
                <CgProfile /> Profile
              </Link>
            </li>
            <li>
              <Link to="/settings" onClick={() => handleClickItem()}>
                <CgPassword /> Test test
              </Link>
            </li>
          </ul>
          <div className="mt-3 border-t pt-1 ">
            <SetUserCurrency />
          </div>
          <div className="mt-1 ">
            <ThemeToggle onClick={() => handleClickItem()} />
          </div>

          <button
            onClick={() => handleClickItem(handleLogout)}
            className="btn btn-sm btn-error mt-3 w-full"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default SettingsMenu;
