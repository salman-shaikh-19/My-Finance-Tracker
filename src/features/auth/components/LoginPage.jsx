import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { clearError, loginUser } from "../authSlice";


const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
    // .min(6, "Password must be at least 6 characters")
    // .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    // .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    // .matches(/[0-9]/, "Password must contain at least one number")
    // .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character"),
})

const LoginPage = () => {
  const { isGetStarted } = useSelector((state) => state.common);
  const navigate = useNavigate();
  const dispatch =useDispatch();
const {  isLoading, error,user } = useSelector((state) => state.auth);
  useEffect(() => {
    if (!isGetStarted) {
      navigate("/get-started");
    }
  }, [isGetStarted, navigate]);

  const handleSubmit = (values, { setSubmitting }) => {
    dispatch(loginUser(values));
    
    setSubmitting(false);
  };
useEffect(() => {
  if (user) {
    navigate("/"); // redirect after login
  }
}, [user, navigate]);

  return (
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
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={loginSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="fieldset space-y-4">
                  <div >
                    <label className="label">Email</label>
                    <Field
                      type="email"
                      name="email"
                      placeholder="Email"
                      className="input input-bordered  w-full"
                       
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div>
                    <label className="label">Password</label>
                    <Field
                      type="password"
                      name="password"
                      placeholder="Password"
                      
                      className="input input-bordered  w-full"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* <div>
                    <a className="link link-hover text-sm">Forgot password?</a>
                  </div> */}
                    {error && (
                      <div className="text-red-500 text-sm mb-2 text-center">
                        {error}
                      </div>
                    )}
                  <button
                    type="submit"
                    className="btn btn-neutral w-full mt-4"
                  disabled={isSubmitting || isLoading}
                  >
                     {isSubmitting || isLoading ? "Logging in..." : "Login"}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
