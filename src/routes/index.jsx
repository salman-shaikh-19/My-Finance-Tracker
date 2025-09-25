import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";


import GetStartedPage from '../features/guest/components/GetStartedPage'
import LoginPage from "../features/auth/components/Login";
import DashboardPage from '../features/dashboard/components/DashboardPage';
import UnAuthorized from "../features/common/components/UnAuthorized";
import NotFoundPage from "../features/common/components/NotFoundPage";
import RegisterAccount from "../features/auth/components/RegisterAccount";
const AppRoutes = () => {
    return (
      
            <Routes>
                <Route path="/login" element={
                    <ProtectedRoute publicOnly={true}>
                        <LoginPage />
                    </ProtectedRoute>
                }
                />
            <Route path="/register" element={
                <ProtectedRoute publicOnly={true}>
                    <RegisterAccount />
                </ProtectedRoute>
            }
            />
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