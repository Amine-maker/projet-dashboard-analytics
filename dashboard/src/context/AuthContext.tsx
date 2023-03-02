import React from "react";
import { fakeAuthProvider } from "../api/authProvider";
import { ILoginPayload, IUser } from "../utils/interface";

export const AuthContext = React.createContext<AuthContextType>(null!);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<IUser | null>(null);

  const signin = (newUser: IUser, callback: VoidFunction) => {
    console.log(newUser);

    return fakeAuthProvider.signin(() => {
      setUser(newUser);
      callback();
    });
  };

  const signout = (callback: VoidFunction) => {
    return fakeAuthProvider.signout(() => {
      setUser(null);
      callback();
    });
  };

  const value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export interface AuthContextType {
  user: IUser | null;
  signin: (payload: ILoginPayload, callback: VoidFunction) => void;
  signout: (callback: VoidFunction) => void;
}
export default AuthProvider;
