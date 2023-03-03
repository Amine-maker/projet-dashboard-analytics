import React, { useState } from "react";
import { AuthService } from "../core/service/AuthService";
import { ILoginPayload, IUser } from "../core/utils/interface";

export const AuthContext = React.createContext<AuthContextType>(null!);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<IUser | null>(null);
  const [isAuth, setIsAuthenticated] = useState<boolean>(false);

  const signin = async (userPayload: ILoginPayload, callback: VoidFunction) => {
    const u = await AuthService.signin(userPayload, () => {
      console.log("test signin successful");
      callback();
    });

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

  const setCurrentUser = (user: IUser) => {
    setUser(user);
  };

  const value = { user, signin, signout, isAuth };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export interface AuthContextType {
  user: IUser | null;
  isAuth: boolean;
  signin: (payload: ILoginPayload, callback: VoidFunction) => void;
  signout: (callback: VoidFunction) => void;
}
export default AuthProvider;
