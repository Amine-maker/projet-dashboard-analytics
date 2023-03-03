import React, { useState } from "react";
import AuthService from "../core/service/AuthService";
import UserService from "../core/service/UserService";
import {
  ILoginPayload,
  IRegisterPayload,
  IUser,
} from "../core/utils/interface";
import { useAuth } from "../hooks/AuthHook";

export const AuthContext = React.createContext<AuthContextType>(null!);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<IUser | null>(null);
  const [isAuth, setIsAuthenticated] = useState<boolean>(false);
  const [token] = useState<string | null>(localStorage.getItem("token"));

  React.useEffect(() => {
    if (token) {
      UserService.getCurrentUser().then((user) => {
        if (user) {
          setCurrentUser({
            email: user.email,
            roles: user.authorities.map((role) => role.authority),
            id: user.id,
            username: user.username,
          });
        }
      });
    }
  }, [token]);

  const signin = async (userPayload: ILoginPayload, callback: VoidFunction) => {
    const u = await AuthService.signin(userPayload, () => {
      console.log("test signin successful");
      callback();
    });

    setIsAuthenticated(true);
    setCurrentUser(u as IUser);
  };

  const register = async (
    userPayload: IRegisterPayload,
    callback: VoidFunction
  ) => {
    const u = await AuthService.register(userPayload, () => {
      console.log("test register successful");
      callback();
    });

    console.log(u);

    setIsAuthenticated(true);
    setCurrentUser(u as IUser);
  };
  const signout = (callback: VoidFunction) => {
    return AuthService.signout(() => {
      setIsAuthenticated(false);
      setUser(null);
      callback();
    });
  };

  const setCurrentUser = (user: IUser): void => {
    setUser(user);
    setIsAuthenticated(true);
  };

  const value = { user, signin, signout, isAuth, setCurrentUser, register };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export interface AuthContextType {
  user: IUser | null;
  isAuth: boolean;
  signin: (payload: ILoginPayload, callback: VoidFunction) => void;
  register: (payload: IRegisterPayload, callback: VoidFunction) => void;
  signout: (callback: VoidFunction) => void;
  setCurrentUser: (user: IUser) => void;
}
export default AuthProvider;
