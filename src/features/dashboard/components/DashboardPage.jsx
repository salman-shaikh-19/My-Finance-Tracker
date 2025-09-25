import { useDispatch } from "react-redux";
import { logoutUser } from '../../auth/authSlice'
import ThemeToggle from "../../common/components/ThemeToggle";
// import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const dispatch = useDispatch();
//   const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
    //   navigate("/login"); // redirect to login after logout
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="text-center  flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">Dashboard Page</h1>
      <ThemeToggle />
      <button
        onClick={handleLogout}
        className="btn btn-primary btn-dash"
      >
        Logout
      </button>
    </div>
  );
};

export default DashboardPage;
