import { API_URL } from "../utils/constante";
import { type ApiUserDataToken, type ILoginPayload, type IRegisterPayload, type IUser } from "../utils/interface";
import axiosInstance from "./ApiService";

class AuthService {
  public static isAuthenticated = false;

  public static async signin(payload: ILoginPayload, callback: VoidFunction): Promise<IUser | null> {
    return await axiosInstance.post<ApiUserDataToken, { data: ApiUserDataToken }>(`${API_URL}/auth/login`, payload).then(
      (res) => {
        const dataTokenUser = res.data;
        const token = dataTokenUser.accessToken;
        const user: IUser = {
          email: dataTokenUser.email,
          id: dataTokenUser.id,
          roles: dataTokenUser.roles,
          username: dataTokenUser.username,
        };
        this.isAuthenticated = true;
        localStorage.setItem("token", token);
        callback();
        return user;
      },
      (err: string) => {
        throw new Error(`Erreur lors de la connexion {${err}}`);
      }
    );
  }

  public static async register(payload: IRegisterPayload, callback: VoidFunction): Promise<IUser | null> {
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
          };
          void this.signin({ username: payload.username, password: payload.password }, () => {});
          return user;
        },
        (err: string) => {
          throw new Error(`Erreur lors de la connexion { err : ${err}}`);
        }
      )
      .catch(() => {
        throw new Error("Erreur lors de la connexion");
      });
  }

  public static signout(callback: VoidFunction): void {
    this.isAuthenticated = false;
    setTimeout(callback, 100);
    this.clearToken();
    callback();
  }

  private static clearToken(): void {
    localStorage.removeItem("token");
  }
}

export default AuthService;
