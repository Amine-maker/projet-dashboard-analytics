import { API_URL } from "../utils/constante";
import { type ApiUserDataToken, type ILoginPayload, type IRegisterPayload, type IUser } from "../utils/interface";
import axiosInstance from "./ApiInterceptor";

const AuthService = (): IAuthService => {
  return {
    async signin(payload: ILoginPayload, callback: VoidFunction): Promise<IUser | null> {
      return await axiosInstance.post<ApiUserDataToken, { data: ApiUserDataToken }>(`${API_URL}/auth/login`, payload).then(
        (res) => {
          const dataTokenUser = res.data;
          const token = dataTokenUser.accessToken;
          const user: IUser = {
            email: dataTokenUser.email,
            id: dataTokenUser.id,
            roles: dataTokenUser.roles,
            username: dataTokenUser.username,
            sites: dataTokenUser.sites,
          };
          localStorage.setItem("token", token);
          callback();
          return user;
        },
        (err: string) => {
          throw new Error(`Erreur lors de la connexion {${err}}`);
        }
      );
    },
    async register(payload: IRegisterPayload, callback: VoidFunction): Promise<IUser | null> {
      return await axiosInstance
        .post<ApiUserDataToken, { data: ApiUserDataToken }>(`${API_URL}/auth/signup`, payload)
        .then(
          (res) => {
            const registerUser = res.data;
            const user: IUser = {
              email: registerUser.email,
              id: registerUser.id,
              roles: registerUser.roles,
              username: registerUser.username,
              sites: registerUser.sites,
            };
            void this.signin({ username: payload.username, password: payload.password }, () => {
              console.log("good signin");
            });
            return user;
          },
          (err: string) => {
            throw new Error(`Erreur lors de la connexion { err : ${err}}`);
          }
        )
        .catch(() => {
          throw new Error("Erreur lors de la connexion");
        });
    },
    signout(callback: VoidFunction): void {
      setTimeout(callback, 100);
      this.clearToken();
      callback();
    },
    clearToken(): void {
      localStorage.removeItem("token");
    },
  };
};

interface IAuthService {
  signin: (payload: ILoginPayload, callback: VoidFunction) => Promise<IUser | null>;
  register: (payload: IRegisterPayload, callback: VoidFunction) => Promise<IUser | null>;
  signout: (callback: VoidFunction) => void;
  clearToken: () => void;
}

export default AuthService;
