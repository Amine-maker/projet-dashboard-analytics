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
import { fakeAuthProvider } from "./api/authProvider";
import AuthForm from "./components/auth/AuthForm";
import LayoutComponent from "./components/layout/LayoutComponent";
import AuthProvider from "./context/AuthContext";
import { useAuth } from "./hooks/AuthHook";
import { ILoginPayload, IUser } from "./utils/interface";

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
  const auth = useAuth();
  const location = useLocation();

  if (!auth.user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
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
