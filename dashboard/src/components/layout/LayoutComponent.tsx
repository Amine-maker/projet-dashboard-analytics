import React from "react";
import AuthStatus from "./AuthStatusComponent";
import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/AuthHook";

const LayoutComponent = () => {
  const auth = useAuth();
  return (
    <div>
      <AuthStatus />

      <ul>
        <li>
          <Link to="/">Public Page</Link>
        </li>
        {auth.isAuth ? null : (
          <>
            <li>
              <Link to="/login">login Page</Link>
            </li>

            <li>
              <Link to="/register">register Page</Link>
            </li>
          </>
        )}

        <li>
          <Link to="/admin">Protected Page</Link>
        </li>
      </ul>

      <Outlet />
    </div>
  );
};

export default LayoutComponent;
