import React from "react";
import AuthStatus from "./AuthStatusComponent";
import { useNavigate, Link, Outlet } from "react-router-dom";

const LayoutComponent = () => {
  return (
    <div>
      <AuthStatus />

      <ul>
        <li>
          <Link to="/">Public Page</Link>
        </li>
        <li>
          <Link to="/admin">Protected Page</Link>
        </li>
      </ul>

      <Outlet />
    </div>
  );
};

export default LayoutComponent;
