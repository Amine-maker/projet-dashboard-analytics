import { API_URL } from "../utils/constante";
import axiosInstance from "./ApiInterceptor";

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
class SiteService {
  public static async addSite(payload: SitePayload): Promise<void> {
    await axiosInstance.post(`${API_URL}/site/add`, payload);
  }
}

export default SiteService;

export interface SitePayload {
  name: string;
  userId: string;
}
