import { API_URL } from "../utils/constante";
import { type ApiEvents, type Site } from "../utils/interface";
import axiosInstance from "./ApiInterceptor";

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
class SiteService {
  public static async addSite(payload: SitePayload): Promise<Site> {
    return await axiosInstance.post(`${API_URL}/site/add`, payload).then((site) => {
      return {
        id: site.data.id,
        name: site.data.name,
        userId: site.data.userId,
      };
    });
  }

  public static async remove(siteId: string): Promise<void> {
    await axiosInstance.delete(`${API_URL}/site/remove`, { params: { siteId } }).then((site) => {
      console.log("site supprimé");
    });
  }

  public static async events(siteId: string): Promise<ApiEvents[]> {
    return await axiosInstance
      .get<ApiEvents[]>(`${API_URL}/event/getEvents`, {
        params: {
          siteId,
        },
      })
      .then((eventsBatch) => {
        return eventsBatch.data.map((events) => {
          return events;
        });
      });
  }
}

export default SiteService;

export interface SitePayload {
  name: string;
  userId: string;
}
