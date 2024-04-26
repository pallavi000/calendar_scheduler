import moment from "moment-timezone";
import { TEvent, TPublicHolidayResponse } from "../@types/events";
import timezoneData from "../data/timezone.json";
import { TCountryCode, TCountryResponse, TTimezone } from "../@types/common";

export function getFormatDate(date: string): string {
  return moment.utc(date).format("YYYY-MM-DD");
}

export function getCurrentYear(): string {
  return moment().format("YYYY");
}

export function getMonthAndDay(date: Date): string {
  return moment(date).format("MMM D");
}

export function getTime(date: Date, timezone: TTimezone): string {
  return moment.tz(date, timezone).format("hh:mm A");
}

export function getTimeWithDate(date: Date): string {
  return moment(date).format("MMM D, hh:mm A");
}

export function convertPublicHolidaysToEvents(
  holidays: TPublicHolidayResponse[]
): TEvent[] {
  return holidays.map((holiday) => ({
    id: 1,
    type: "holiday",
    title: holiday.name,
    startTime: holiday.date,
  }));
}

export function getTimezonesFromCountry(
  countryCode: TCountryCode
): TTimezone[] {
  const timezones = timezoneData[countryCode];
  if (timezones && timezones.length) return timezones as TTimezone[];
  return timezoneData["ALL"];
}

export function convertCountryResponseToOption(country: TCountryResponse) {
  return {
    label: country.name,
    value: country.countryCode,
  };
}

export const hasAlreadyEvent = (
  date: string,
  events: TEvent[],
  selectedTimezone: TTimezone
) => {
  let isInBetween = false;
  for (const event of events) {
    const startDate = moment.tz(event.startTime, selectedTimezone);
    const endDate = moment.tz(event.endTime, selectedTimezone);
    if (moment.tz(date, selectedTimezone).isBetween(startDate, endDate)) {
      isInBetween = true;
      break; // Exit loop if the new date is found to be in between any range
    }
  }
  return isInBetween;
};
