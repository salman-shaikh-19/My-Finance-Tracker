// import { Navigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import  supabase  from "../services/supabaseClient"; 
// import { FaSpinner } from "react-icons/fa";
// import { useSelector } from "react-redux";

import { useEffect, useState } from "react";
import supabase from "../services/supabaseClient";
import { FaSpinner } from "react-icons/fa";
import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ children, publicOnly = false }) => {
//   // const [isLoading, setIsLoading] = useState(true);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   // const {loggedInUserId}=useSelector(state=>state.common.loggedInUserId);

//   useEffect(() => {
//     const checkUser = async () => {
//       const { data: { session } } = await supabase.auth.getSession();
//       setIsLoggedIn(!!session);
//       // setIsLoading(false);
//     };

//     checkUser();

//     //  subscribe to auth changes to keep it in sync
//     const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
//       setIsLoggedIn(!!session);
//     });

//     return () => {
//       listener.subscription.unsubscribe();
//     };
//   }, []);

//   //   if (isLoading) {
//   //   return (
//   //     <div className="flex items-center justify-center min-h-screen bg-gray-50">
//   //       <div className="flex flex-col items-center">
//   //         <FaSpinner className="animate-spin text-5xl text- mb-4" />
//   //         <p className="text-gray-600 font-medium"></p>
//   //       </div>
//   //     </div>
//   //   );
//   // }
//   // public route: redirect logged-in user to home
//   if (publicOnly && isLoggedIn) {
//     return <Navigate to="/" replace />;
//   }

//   // protected route: redirect non-logged-in user to login
//   if (!publicOnly && !isLoggedIn) {
//     return <Navigate to="/login" replace />;
//   }

//   // all checks passed: render children
//   return children;
// };

// export default ProtectedRoute;
const ProtectedRoute = ({ children, publicOnly = false }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsLoggedIn(!!session);
      setIsLoading(false);
    };

    checkUser();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  if (isLoading) {
    return (
     
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="flex flex-col items-center">
        <FaSpinner className="animate-spin text-5xl text- mb-4" />
        <p className="text-gray-600 font-medium"></p>
      </div>
    </div>
    );
  }


  if (publicOnly && isLoggedIn) {
    return <Navigate to="/" replace />;
  }


  if (!publicOnly && !isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
export default ProtectedRoute;
