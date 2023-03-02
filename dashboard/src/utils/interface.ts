export interface ILoginPayload {
  username: string;
  password: string;
}

export interface IUser {
  username: string;
  roles?: string[];
}
