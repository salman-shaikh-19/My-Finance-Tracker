import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import GetStartedPage from "../features/guest/components/GetStartedPage";
import LoginPage from "../features/auth/components/Login";
import Dashboard from "../features/dashboard/components/Dashboard";
import UnAuthorized from "../features/common/components/UnAuthorized";
import NotFoundPage from "../features/common/components/NotFoundPage";
import RegisterAccount from "../features/auth/components/RegisterAccount";
import ExpensesPage from "../features/expenses/components/ExpensesPage";
import IncomePage from "../features/income/components/IncomePage";
import LiabilityPage from "../features/liabilities/components/LiabilityPage";
import InvestmentsPage from "../features/investments/components/InvestmentsPage";
const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <ProtectedRoute publicOnly={true}>
            <LoginPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/register"
        element={
          <ProtectedRoute publicOnly={true}>
            <RegisterAccount />
          </ProtectedRoute>
        }
      />
      <Route
        path="/get-started"
        element={
          <ProtectedRoute publicOnly={true}>
            <GetStartedPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/expenses"
        element={
          <ProtectedRoute>
            <ExpensesPage />
          </ProtectedRoute>
        }
      />
   <Route 
        path="/incomes"
        element={
          <ProtectedRoute>
            <IncomePage />
          </ProtectedRoute>
        }
      />
         <Route 
        path="/liabilities"
        element={
          <ProtectedRoute>
            <LiabilityPage />
          </ProtectedRoute>
        }
      />

        <Route 
        path="/investments"
        element={
          <ProtectedRoute>
            <InvestmentsPage />
          </ProtectedRoute>
        }
      />
      <Route path="/unauthorized" element={<UnAuthorized />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
