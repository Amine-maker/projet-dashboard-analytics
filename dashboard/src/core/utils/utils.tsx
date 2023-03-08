import { type ReactElement } from "react";
import { type UiRenderIf } from "./interface";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const RenderIf = ({ children, isTrue }: UiRenderIf) => {
  return isTrue ? children : null;
};
