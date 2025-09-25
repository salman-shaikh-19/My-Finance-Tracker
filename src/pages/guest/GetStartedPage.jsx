import { useDispatch } from "react-redux";
import InstallApp from "../../components/Other/InstallApp";
import { setGetStarted } from "../../features/common/commonSlice";

const GetStartedPage = () => {
  const dispatch=useDispatch();
  const handleClick=()=>{
    console.log('clicked');
    
    dispatch(setGetStarted(true));
  }
  return (
    <>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">
              Take Control of Your Finances
            </h1>
            <p className="py-6 text-lg text-gray-700">
              Track your income, expenses, and savings effortlessly. Make
              smarter financial decisions and achieve your goals with ease.
            </p>
           <div className="gap-1">
             <InstallApp
            className="btn btn-success btn-lg"
            
            />
            <button className="btn btn-primary btn-lg" onClick={handleClick}>Get Started</button>
           </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GetStartedPage;
