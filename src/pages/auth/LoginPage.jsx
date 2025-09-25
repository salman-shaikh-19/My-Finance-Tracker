import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { isGetStarted } = useSelector((state) => state.common);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isGetStarted) {
      navigate("/get-started");
    }
  }, [isGetStarted, navigate]);
  return (
    <>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              Access your personal finance dashboard and take control of your
              income, expenses, and savings. Enter your credentials to continue
              managing your finances effortlessly.
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <fieldset className="fieldset">
                <label className="label">Email</label>
                <input type="email" className="input" placeholder="Email" />
                <label className="label">Password</label>
                <input
                  type="password"
                  className="input"
                  placeholder="Password"
                />
                <div>
                  <a className="link link-hover">Forgot password?</a>
                </div>
                <button className="btn btn-neutral mt-4">Login</button>
              </fieldset>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
