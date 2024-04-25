export type TPublicHolidayInputData = {
  countryIsoCode: string;
  year?: string;
};

export type TPublicHolidayResponse = {
  date: string;
  localName: string;
  name: string;
  countryCode: string;
  fixed: boolean;
  global: boolean;
  counties: any;
  launchYear: any;
  types: string[];
};

export type TEvent = {
  title: string;
  start: string;
  end?: string;
};
