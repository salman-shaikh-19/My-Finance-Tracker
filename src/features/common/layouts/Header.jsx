import { useDispatch } from "react-redux";
import { logoutUser } from "../../auth/authSlice";
import ThemeToggle from "../components/ThemeToggle";
import { MdHome, MdMoreHoriz } from "react-icons/md";
import { BiSearch } from "react-icons/bi";

const Header = () => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="hidden md:flex fixed top-0 w-full bg-base-100 text-base-content h-16 items-center justify-around shadow-md">
        <a href="#" className="px-4 hover:text-primary">Home</a>
        <a href="#" className="px-4 hover:text-primary">Search</a>
        <a href="#" className="px-4 hover:text-primary">Reels</a>
        <a href="#" className="px-4 hover:text-primary">Activity</a>
        <ThemeToggle />
        <button onClick={handleLogout} className="btn btn-primary">Logout</button>
      </nav>

      {/* Mobile Navbar */}
      <nav className="md:hidden fixed bottom-4 left-1/2 transform -translate-x-1/2 w-11/12 bg-base-100 text-base-content shadow-lg rounded-2xl">
        <div className="flex justify-around items-center h-16 px-2">
          {/* Home */}
          <a href="#" className="flex flex-col items-center justify-center hover:text-primary group">
            <MdHome size={24} />
            <span className="text-xs">Home</span>
          </a>

          {/* Explore */}
          <a href="#" className="flex flex-col items-center justify-center hover:text-primary group">
            <BiSearch size={24} />
            <span className="text-xs">Explore</span>
          </a>

          {/* Dropdown for extra items */}
    <div className="dropdown dropdown-top dropdown-end">
  {/* Trigger */}
  <label
    tabIndex={0}
    className="flex flex-col items-center justify-center cursor-pointer hover:text-primary focus:outline-none"
  >
    <MdMoreHoriz size={24} />
    <span className="text-xs">More</span>
  </label>

  {/* Dropdown content */}
  <ul
    tabIndex={0}
    className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-40 max-h-60 overflow-auto"
  >
    <li>
      <a href="#">Reels</a>
    </li>
    <li>
      <a href="#">Activity</a>
    </li>
    <li>
      <button onClick={handleLogout}>Logout</button>
    </li>
    <li>
      <ThemeToggle />
    </li>
  </ul>
</div>

        </div>
      </nav>
    </>
  );
};

export default Header;
