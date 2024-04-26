import {
  TCountryCode,
  TCountryResponse,
  TThemeMode,
  TTimezone,
} from "./common";
import { TEvent } from "./events";
import { TUser } from "./user";

export type TGlobalContextStates = {
  token: string;
  setToken: (value: string) => void;
  user: TUser | undefined;
  themeMode: TThemeMode;
  toggleThemeMode: () => void;
  logoutUser: () => void;
  availableCountries: TCountryResponse[];
  availableTimezones: TTimezone[];
  selectedCountry: TCountryCode;
  setSelectedCountry: (country: TCountryCode) => void;
  selectedTimezone: TTimezone;
  setSelectedTimezone: (timezone: TTimezone) => void;
  eventNotifications: TEvent[];
};
