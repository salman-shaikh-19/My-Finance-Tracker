import { useDispatch } from "react-redux";
import { logoutUser } from "../../auth/authSlice";
import ThemeToggle from "../components/ThemeToggle";
import { MdHome } from "react-icons/md";
import { BiSearch } from "react-icons/bi";
import supabase from "../../../services/supabaseClient";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
    const navigate = useNavigate();

  const handleLogout = async () => {
    try {
       const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      console.warn("No active session, skipping logout");
      navigate('/login');
      return;
    }
      await dispatch(logoutUser()).unwrap();
         alert('logout succ');
      //   navigate("/login"); // redirect to login after logout
    } catch (err) {
      alert('logout faild',err);
      console.error("Logout failed:", err);
    }
  };
  return (
    <>
      <nav className="hidden md:flex fixed top-0 w-full bg-base-100 text-base-content h-16 items-center justify-around shadow-md">
        <a href="#" className="px-4 hover:text-primary">
          Home
        </a>
        <a href="#" className="px-4 hover:text-primary">
          Search
        </a>
        <a href="#" className="px-4 hover:text-primary">
          Reels
        </a>
        <a href="#" className="px-4 hover:text-primary">
          Activity
        </a>
        <ThemeToggle />
        <button onClick={handleLogout} className="btn btn-primary ">
          Logout
        </button>
      </nav>

      {/* Mobile/Tablet Navbar */}
      <nav className="md:hidden fixed bottom-4 left-1/2 transform -translate-x-1/2 w-11/12 bg-base-100 text-base-content shadow-lg rounded-2xl">
        <div className="flex justify-around items-center h-16 px-4">
          <a
            href="#"
            className="flex flex-col items-center justify-center hover:text-primary group"
          >
            <MdHome />
            <span className="text-xs">Home</span>
            <span className="block w-5 h-1 rounded-full bg-primary hidden group-hover:block"></span>
          </a>
          <a
            href="#"
            className="flex flex-col items-center justify-center hover:text-primary group"
          >
            <BiSearch />
            <span className="text-xs">Explore</span>
            <span className="block w-5 h-1 rounded-full bg-primary hidden group-hover:block"></span>
          </a>
          <a
            href="#"
            className="flex flex-col items-center justify-center hover:text-primary group"
          >
            <span className="text-xs">Reels</span>
            <span className="block w-5 h-1 rounded-full bg-primary hidden group-hover:block"></span>
          </a>
          <a
            href="#"
            className="flex flex-col items-center justify-center hover:text-primary group"
          >
            <i className="far fa-heart text-2xl mb-1 text-current"></i>
            <span className="text-xs">Activity</span>
            <span className="block w-5 h-1 rounded-full bg-primary hidden group-hover:block"></span>
          </a>
           <ThemeToggle />
        <button onClick={handleLogout} className="btn btn-primary ">
          Logout
        </button>
        </div>
      </nav>
    </>
  );
};

export default Header;
