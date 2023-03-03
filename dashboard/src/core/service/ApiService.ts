import { API_URL } from "../utils/constante";
import axios from "axios";
import { useAuth } from "../../hooks/AuthHook";

// Création d'une instance d'axios avec une configuration de base
const axiosInstance = axios.create({
  baseURL: API_URL,
});

// Ajout de l'intercepteur de requête
axiosInstance.interceptors.request.use(
  (config) => {
    // Récupération du token depuis le localStorage
    const token = localStorage.getItem("token");

    // Ajout du token dans le header si celui-ci est présent
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
