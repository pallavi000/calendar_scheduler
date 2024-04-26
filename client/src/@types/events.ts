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
  id: number;
  title: string;
  startTime: string;
  type: "event" | "holiday";
  endTime?: string;
  description?: string;
  participants?: string;
  timezone?: string;
};

export type TNewEventFormData = {
  title: string;
  startTime: string;
  endTime: string;
  description: string;
  participants: string;
  timezone: string;
};
