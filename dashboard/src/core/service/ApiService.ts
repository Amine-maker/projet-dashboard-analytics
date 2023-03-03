import { API_URL } from "../utils/constante";
import axios from "axios";

// Création d'une instance d'axios avec une configuration de base
const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token != null) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  async (error) => await Promise.reject(error)
);

export default axiosInstance;
