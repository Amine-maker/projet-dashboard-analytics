import * as React from "react";
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
  Navigate,
  Outlet,
} from "react-router-dom";
import AuthForm from "./components/auth/AuthForm";
import RegisterForm from "./components/auth/RegisterForm";
import LayoutComponent from "./components/layout/LayoutComponent";
import AuthProvider from "./context/AuthContext";
import { RenderIf } from "./core/utils/utils";
import { useAuth } from "./hooks/AuthHook";

export default function App() {
  return (
    <AuthProvider>
      <h1>Auth Example</h1>

      <p>
        This example demonstrates a simple login flow with three pages: a public
        page, a protected page, and a login page. In order to see the protected
        page, you must first login. Pretty standard stuff.
      </p>

      <Routes>
        <Route element={<LayoutComponent />}>
          <Route path="/" element={<PublicPage />} />
          <Route path="/login" element={<AuthForm />} />
          <Route path="/register" element={<RegisterForm />} />

          <Route
            path="/admin"
            element={
              <RequireAuth>
                <ProtectedPage />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

function RequireAuth({ children }: { children: JSX.Element }) {
  const location = useLocation();
  const auth = useAuth();

  if (!auth.isAuth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

function PublicPage() {
  return <h3>Public</h3>;
}

function ProtectedPage() {
  return <h3>Protected</h3>;
}
