import React, { useEffect, useState } from "react";
import SiteService, { type SitePayload } from "../core/service/SiteService";
import UserService from "../core/service/UserService";
import { type ApiEvents, type Site } from "../core/utils/interface";
import { useAuth } from "../hooks/AuthHook";

export const SiteContext = React.createContext<SiteContextType>(null!);

function SiteProvider({ children }: { children: React.ReactNode }): JSX.Element {
  const { user } = useAuth();
  const [sites, setSites] = useState<Site[] | undefined>([]);
  const { getCurrentUser } = UserService();
  const siteService = SiteService();

  useEffect(() => {
    if (user != null) {
      setSites(user.sites);
    }
  }, [user]);

  const addSite = async (sitePayload: SitePayload, callback: VoidFunction): Promise<void> => {
    await siteService.addSite(sitePayload);
    void getCurrentUser().then((user) => {
      setSites(user?.sites);
    });
    callback();
  };
  const deleteSite = async (siteId: string, callback: VoidFunction): Promise<void> => {
    await siteService.remove(siteId);
    void getCurrentUser().then((user) => {
      setSites(user?.sites);
    });
    callback();
  };

  const getEvents = async (siteId: string): Promise<ApiEvents[]> => {
    return await siteService.events(siteId);
  };

  const value = { sites, addSite, deleteSite, getEvents };

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export interface SiteContextType {
  sites?: Site[];
  addSite: (payload: SitePayload, callback: VoidFunction) => void;
  deleteSite: (siteId: string, callback: VoidFunction) => void;
  getEvents: (siteId: string) => Promise<ApiEvents[]>;
}
export default SiteProvider;
