import { TThemeMode } from "./common";

export type TGlobalContextStates = {
  token: string;
  setToken: () => void;
  themeMode: TThemeMode;
  toggleThemeMode: () => void;
  logoutUser: () => void;
};
