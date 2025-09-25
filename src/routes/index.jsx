import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import GetStartedPage from '../pages/guest/GetStartedPage'
import NotFoundPage from '../components/Common/NotFoundPage';
import UnAuthorized from '../components/Common/UnAuthorized';
import LoginPage from "../pages/auth/LoginPage";
import DashboardPage from '../pages/dashboard/DashboardPage';
const AppRoutes = () => {
    return (
      
            <Routes>
                <Route path="/login" element={
                    <ProtectedRoute publicOnly={true}>
                        <LoginPage />
                    </ProtectedRoute>
                }
                />
            {/* <Route path="/register" element={
                <ProtectedRoute publicOnly={true}>
                    <Register />
                </ProtectedRoute>
            }
            /> */}
              <Route path="/get-started" element={
                <ProtectedRoute publicOnly={true}>
                  <GetStartedPage />
                </ProtectedRoute>
            }
            />

             <Route path="/" element={
                 <ProtectedRoute >
                    <DashboardPage />
                </ProtectedRoute>
            }
            />
            <Route path="/unauthorized" element={<UnAuthorized />} />
            <Route path="*" element={<NotFoundPage />} />
            </Routes>
       
    )

}

export default AppRoutes