import { API_URL } from "../utils/constante";
import { type ApiEvents, type Site } from "../utils/interface";
import axiosInstance from "./ApiInterceptor";

const SiteService = (): ISiteService => {
  return {
    async addSite(payload: SitePayload): Promise<Site> {
      return await axiosInstance.post(`${API_URL}/site/add`, payload).then((site) => {
        return {
          id: site.data.id,
          name: site.data.name,
          userId: site.data.userId,
        };
      });
    },
    async remove(siteId: string): Promise<void> {
      await axiosInstance.delete(`${API_URL}/site/remove`, { params: { siteId } }).then((site) => {
        console.log("site supprimé");
      });
    },
    async events(siteId: string): Promise<ApiEvents[]> {
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
    },
  };
};

interface ISiteService {
  addSite: (payload: SitePayload) => Promise<Site>;
  remove: (siteId: string) => Promise<void>;
  events: (siteId: string) => Promise<ApiEvents[]>;
}

export default SiteService;

export interface SitePayload {
  name: string;
  userId: string;
}
