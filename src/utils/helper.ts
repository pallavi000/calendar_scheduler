import moment from "moment-timezone";
import { TEvent, TPublicHolidayResponse } from "../@types/events";
import timezoneData from "../data/timezone.json";
import { TCountryCode, TCountryResponse, TTimezone } from "../@types/common";

export function getFormatDate(date: Date): string {
  return moment.utc(date.toUTCString()).format("YYYY-MM-DD");
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
