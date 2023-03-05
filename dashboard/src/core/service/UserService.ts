import { API_URL } from "../utils/constante";
import axiosInstance from "./ApiService";
import jwtDecode from "jwt-decode";
import { type ApiUser } from "../utils/interface";

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
class UserService {
  public static async getCurrentUser(): Promise<ApiUser | null> {
    const token = localStorage.getItem("token");
    if (token === null) {
      // Si le token n'est pas présent dans le localStorage, l'utilisateur n'est pas connecté
      return null;
    }

    try {
      // Si le token est présent, on le décode pour récupérer les informations de l'utilisateur
      const decodedToken: any = jwtDecode(token);
      console.log(decodedToken);

      const username: string = decodedToken.sub;
      console.log(username);
      // l'ID de l'utilisateur est stocké dans le claim "sub" du token
      // return userId;
      return await axiosInstance.get<ApiUser>(`${API_URL}/user/info/${username}`).then((response) => {
        console.log(response);
        return response.data;
      });
    } catch (error) {
      // Si le décodage du token échoue, l'utilisateur n'est pas connecté
      return null;
    }
  }
}

export default UserService;
