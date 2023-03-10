import { API_URL } from "../utils/constante";
import axiosInstance from "./ApiInterceptor";
import jwtDecode from "jwt-decode";
import { type ApiUser } from "../utils/interface";

const UserService = (): IUserService => {
  return {
    async getCurrentUser(): Promise<ApiUser | null> {
      const token = localStorage.getItem("token");
      if (token === null) {
        return null;
      }

      try {
        const decodedToken: any = jwtDecode(token);

        const username: string = decodedToken.sub;
        console.log(username);

        return await axiosInstance.get<ApiUser>(`${API_URL}/user/info/${username}`).then((response) => {
          return response.data;
        });
      } catch (error) {
        return null;
      }
    },
  };
};

interface IUserService {
  getCurrentUser: () => Promise<ApiUser | null>;
}

export default UserService;
