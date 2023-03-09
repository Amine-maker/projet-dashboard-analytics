import React, { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/AuthHook";
import { type ILinks } from "../../core/utils/interface";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import { RenderIf } from "../../core/utils/utils";

const LayoutComponent = (): JSX.Element => {
  const { isAuth, signout } = useAuth();
  const location = useLocation();
  const [currentLink, setCurrentLink] = useState<string>(location.pathname);
  const navigate = useNavigate();

  const isSelected = (link: string): boolean => {
    return location.pathname.includes(link);
  };

  const links: ILinks[] = [
    {
      to: "/dashboard",
      selected: isSelected("/dashboard"),
      hidden: !isAuth,
      displayName: "Dashboard",
      icon: <DashboardOutlinedIcon fontSize="small" />,
    },
    { to: "/profile", hidden: !isAuth, displayName: "Profile", selected: isSelected("/profile"), icon: <ManageAccountsOutlinedIcon fontSize="small" /> },
    {
      to: "/login",
      hidden: isAuth,
      displayName: "Login",
      selected: isSelected("/login"),
      icon: <LoginOutlinedIcon fontSize="small" />,
    },
    { to: "/register", hidden: isAuth, displayName: "Register", selected: isSelected("/register"), icon: <PersonAddOutlinedIcon fontSize="small" /> },
  ];

  return (
    <>
      <aside className="fixed z-50 inset-y-0 left-0 bg-white border-r border-gray-300 max-h-screen w-60">
        <div className="flex flex-col justify-between h-full">
          <div className="flex-grow">
            <div className="px-4 py-6 text-center border-b">
              <h1 className="text-xl font-bold leading-none">Dadasha</h1>
            </div>
            <div className="p-4">
              <ul className="space-y-1">
                {links.map((link, index) => {
                  return (
                    <li key={index}>
                      <Link
                        to={link.to}
                        onClick={() => {
                          setCurrentLink(link.to);
                        }}
                        className={`flex items-center ${link.hidden ? "hidden" : ""}  rounded-xl font-bold text-sm ${link.selected ? "text-cyan-900 bg-indigo-200 " : ""} gap-3  py-3 px-4`}
                      >
                        <RenderIf isTrue={Boolean(link.icon)}>{link.icon}</RenderIf>
                        {link.displayName}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className={`p-4 ${!isAuth ? "hidden" : ""}`}>
            <button
              onClick={() => {
                signout(() => {
                  navigate("/login");
                });
              }}
              type="button"
              className="inline-flex items-center justify-center h-9 px-4 rounded-xl bg-gray-900 text-gray-300 w-full hover:text-white text-sm font-semibold transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" className="" viewBox="0 0 16 16">
                <path d="M12 1a1 1 0 0 1 1 1v13h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V2a1 1 0 0 1 1-1h8zm-2 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
              </svg>
              <span className="font-bold text-sm ml-2">Déconnexion</span>
            </button>
          </div>
        </div>
      </aside>
      <Outlet />
    </>
  );
};

export default LayoutComponent;
