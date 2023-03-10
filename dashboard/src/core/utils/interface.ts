import { type Role } from "./enum";

export interface ILoginPayload {
  username: string;
  password: string;
}

export interface IUser {
  id: string;
  username: string;
  email: string;
  roles: string[];
  sites: Site[];
}

export interface Site {
  id: string;
  name: string;
  userId: string;
}

export interface ApiUserDataToken {
  accessToken: string;
  id: string;
  roles: string[];
  tokenType: string;
  username: string;
  email: string;
  sites: Site[];
}

export interface ApiUser extends Omit<IUser, "roles"> {
  authorities: Array<{ authority: string }>;
}

export interface UiRenderIf {
  children: any;
  isTrue: boolean;
}

export interface IRegisterPayload {
  email: string;
  password: string;
  username: string;
  roles?: Role[];
}

export interface ILinks {
  to: string;
  hidden: boolean;
  displayName: string;
  selected: boolean;
  icon?: any;
}

export interface ApiEvents {
  id: string;
  clientId: string;
  siteId: string;
  clientTimestamp: number;
  serverTimestamp: number;
  ipAddress: string;
  userAgent: string;
  events: IEvent[];
}

export interface IEvent {
  cssSelector?: string;
  innerText?: string;
  type?: EventType;
  width?: number;
  height?: number;
}

export interface UserAgentData {
  browser?: string;
  device?: string;
  os?: string;
}

export type EventType = "resize" | "click";
