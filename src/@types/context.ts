import { TThemeMode } from "./common";
import { TUser } from "./user";

export type TGlobalContextStates = {
  token: string;
  setToken: (value: string) => void;
  user: TUser | undefined;
  themeMode: TThemeMode;
  toggleThemeMode: () => void;
  logoutUser: () => void;
};
