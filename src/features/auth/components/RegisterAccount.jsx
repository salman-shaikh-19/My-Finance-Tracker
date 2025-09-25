import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { clearError, registerUser } from "../authSlice"; // <-- replace with your register action
import { BiUserPlus } from "react-icons/bi";
import { toast } from "react-toastify";

const registerSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

const RegisterAccount = () => {
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
    const user = await dispatch(registerUser(values)).unwrap();
    toast.success("Account created successfully"); // success only
    dispatch(clearError()); // clear any previous errors
    navigate("/login");
  } catch (err) {
    // here err is exactly what you returned in rejectWithValue
    console.log("Registration failed:", err);
  } finally {
    setSubmitting(false); // always reset submitting state
  }
};


useEffect(()=>{
     dispatch(clearError())
},[]);


 
//   console.log('lod:',userLoading ?? '');
  
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <h1 className="text-3xl font-bold text-center flex items-center justify-center gap-2">
              <BiUserPlus size={30} /> Create Account
            </h1>

            <Formik
              initialValues={{ name: "", email: "", password: "", confirmPassword: "" }}
              validationSchema={registerSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="fieldset space-y-4">
       
                  <div>
                    <label className="label">Name</label>
                    <Field
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      className="input input-bordered w-full"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

     
                  <div>
                    <label className="label">Email</label>
                    <Field
                      type="email"
                      name="email"
                      placeholder="Email"
                      className="input input-bordered w-full"
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
                      className="input input-bordered w-full"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                
                  <div>
                    <label className="label">Confirm Password</label>
                    <Field
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      className="input input-bordered w-full"
                    />
                    <ErrorMessage
                      name="confirmPassword"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                
                  {error && (
                    <div className="alert alert-error text-sm mb-2 justify-center">
                      <span className="text-center w-full">{error}</span>
                    </div>
                  )}

                 
                  <button
                    type="submit"
                    className="btn btn-primary  w-full mt-4"
                    disabled={isSubmitting || userLoading}
                  >
                    {isSubmitting || userLoading ?  <>
    <span className="loading loading-spinner"></span> Creating account...
  </> : "Register"}
                  </button>
                </Form>
              )}
            </Formik>

     
            <div className="flex justify-center">
              <Link to="/login" className="link link-hover text-sm">
                Already have an account? Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterAccount;
