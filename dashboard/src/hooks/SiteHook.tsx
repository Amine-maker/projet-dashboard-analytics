import React from "react";
import { SiteContext, type SiteContextType } from "../context/SiteContext";

export const useSite = (): SiteContextType => {
  return React.useContext(SiteContext);
};
