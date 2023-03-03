import { ReactElement } from "react";
import { Role } from "./enum";

export interface ILoginPayload {
  username: string;
  password: string;
}

export interface IUser {
  id: string;
  username: string;
  email: string;
  roles: string[];
}

export interface ApiUserDataToken {
  accessToken: string;
  id: string;
  roles: string[];
  tokenType: string;
  username: string;
  email: string;
}

export interface ApiUser extends Omit<IUser, "roles"> {
  authorities: { authority: string }[];
}

export interface UiRenderIf<T> {
  children: T;
  isTrue: boolean;
}

export interface IRegisterPayload {
  email: string;
  password: string;
  username: string;
  roles?: Role[];
}
