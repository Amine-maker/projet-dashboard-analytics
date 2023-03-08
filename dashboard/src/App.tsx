import * as React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import AuthForm from "./components/auth/AuthForm";
import RegisterForm from "./components/auth/RegisterForm";
import LayoutComponent from "./components/layout/LayoutComponent";
import { Dashboard } from "./components/page/DashboardComponent";
import { ProfilePage } from "./components/page/ProfilePageComponent";
import AuthProvider from "./context/AuthContext";
import { useAuth } from "./hooks/AuthHook";

export default function App(): JSX.Element {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<LayoutComponent />}>
          <Route path="/" element={<Navigate replace={true} to={"/login"}></Navigate>} />
          <Route path="/login" element={<AuthForm />} />
          <Route path="/register" element={<RegisterForm />} />

          <Route
            path="/dashboard/:siteId"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route
            path="/profile"
            element={
              <RequireAuth>
                <ProfilePage />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

function RequireAuth({ children }: { children: JSX.Element }): JSX.Element {
  const location = useLocation();
  const auth = useAuth();

  if (!auth.isAuth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
