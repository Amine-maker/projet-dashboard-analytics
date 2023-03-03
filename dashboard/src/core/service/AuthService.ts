import { API_URL } from "../utils/constante";
import { ApiUserDataToken, ILoginPayload, IUser } from "../utils/interface";
import axiosInstance from "./ApiService";
import jwt_decode from "jwt-decode";

class AuthService {
  public static isAuthenticated: boolean = false;

  constructor() {}

  public static async signin(
    payload: ILoginPayload,
    callback: VoidFunction
  ): Promise<IUser | null> {
    console.log(payload);

    // call api

    return axiosInstance
      .post<ApiUserDataToken, { data: ApiUserDataToken }>(
        `${API_URL}auth/login`,
        payload
      )
      .then(
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
          localStorage.setItem("isAuthenticated", String(this.isAuthenticated));
          callback();
          return user;
        },
        (err) => {
          throw new Error(`Erreur lors de la connexion {${err}}`);
        }
      );
  }

  public static getAdminData() {
    axiosInstance.get(`${API_URL}test/user`).then((response) => {
      console.log(response);
    });
  }

  public static signout(callback: VoidFunction) {
    this.isAuthenticated = false;
    setTimeout(callback, 100);
    this.clearToken();
    callback();
  }

  private static clearToken(): void {
    localStorage.removeItem("token");
  }

  getCurrentUser() {
    const token = localStorage.getItem("token");
    if (!token) {
      // Si le token n'est pas présent dans le localStorage, l'utilisateur n'est pas connecté
      return null;
    }

    try {
      // Si le token est présent, on le décode pour récupérer les informations de l'utilisateur
      const decodedToken: any = jwt_decode(token);
      const userId = decodedToken.sub;
      console.log(userId);
      // l'ID de l'utilisateur est stocké dans le claim "sub" du token
      return userId;
    } catch (error) {
      // Si le décodage du token échoue, l'utilisateur n'est pas connecté
      return null;
    }
  }
}

export { AuthService };
