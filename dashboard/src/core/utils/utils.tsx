import { ReactElement } from "react";
import { UiRenderIf } from "./interface";

export const RenderIf = ({ children, isTrue }: UiRenderIf<ReactElement>) => {
  return isTrue ? children : null;
};
