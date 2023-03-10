import { UAParser } from "ua-parser-js";
import { type UserAgentData, type UiRenderIf } from "./interface";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const RenderIf = ({ children, isTrue }: UiRenderIf) => {
  return isTrue ? children : null;
};

export const parseUserAgents = (userAgents: string[]): UserAgentData[] => {
  const parser = new UAParser();
  return userAgents.map((ua) => {
    const result = parser.setUA(ua).getResult();
    return {
      browser: result?.browser?.name,
      os: result.os.name,
      device: result.device.type,
    };
  });
};
