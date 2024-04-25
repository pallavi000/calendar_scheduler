import timezoneData from "../data/timezone.json";

export type TThemeMode = "dark" | "light";

export type TCountryResponse = {
  countryCode: string;
  name: string;
};

export type TCountryCode = keyof typeof timezoneData;

export type TTimezone = Exclude<
  (typeof timezoneData)[keyof typeof timezoneData][number],
  null
>;
