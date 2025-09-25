import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { clearError, loginUser } from "../authSlice";
import { BiLogIn } from "react-icons/bi";
import { toast } from "react-toastify";

const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
  // .min(6, "Password must be at least 6 characters")
  // .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
  // .matches(/[a-z]/, "Password must contain at least one lowercase letter")
  // .matches(/[0-9]/, "Password must contain at least one number")
  // .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character"),
});

const Login = () => {
  const { isGetStarted } = useSelector((state) => state.common);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userLoading, error } = useSelector((state) => state.auth);
  useEffect(() => {
    if (!isGetStarted) {
      navigate("/get-started");
    }
  }, [isGetStarted, navigate]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const user = await dispatch(loginUser(values)).unwrap();
      if (user) {
        toast.success("Login successfull");
        navigate("/");
      }
    } catch (err) {
      if (err === "Email not confirmed") {
        toast.error("Please confirm your email before logging in.");
      } else {
        toast.error(err);
      }
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    dispatch(clearError());
  }, []);

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        {/* <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Access your personal finance dashboard and take control of your
            income, expenses, and savings. Enter your credentials to continue
            managing your finances effortlessly.
          </p>
          <BiLogIn size={150} />
        </div> */}

        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <h1 className="text-3xl font-bold text-center">Login now!</h1>
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={loginSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="fieldset space-y-4">
                  <div>
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
                    <div className="alert alert-error alert-dash text-sm mb-2 justify-center">
                      <span className="text-center w-full">{error}</span>
                    </div>
                  )}
                  <button
                    type="submit"
                    className="btn btn-primary btn-dash w-full mt-4"
                    disabled={isSubmitting || userLoading}
                  >
                    {isSubmitting || userLoading ? (
                      <>
                        <span className="loading loading-spinner"></span>{" "}
                        logging in...
                      </>
                    ) : (
                      "Login"
                    )}
                  </button>
                </Form>
              )}
            </Formik>
            <div className="flex justify-center">
              <Link to="/register" className="link link-hover text-sm ">
                Create new account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
