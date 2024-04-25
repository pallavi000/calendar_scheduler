import moment from "moment";
import { TEvent, TPublicHolidayResponse } from "../@types/events";
import timezoneData from "../data/timezone.json";
import { TCountryCode, TCountryResponse, TTimezone } from "../@types/common";

export function getFormatDate(date: Date): string {
  return moment(date).format("YYYY-MM-DD");
}

export function getStartOfYear(): string {
  return moment().startOf("year").format("YYYY-MM-DD");
}

export function getEndOfYear(): string {
  return moment().endOf("year").format("YYYY-MM-DD");
}

export function getCurrentYear(): string {
  return moment().format("YYYY");
}

export function getMonthAndDay(date: Date): string {
  return moment(date).format("MMM D");
}

export function getTime(date: Date): string {
  return moment(date).format("hh:mm A");
}

export function convertPublicHolidaysToEvents(
  holidays: TPublicHolidayResponse[]
): TEvent[] {
  return holidays.map((holiday) => ({
    title: holiday.name,
    start: holiday.date,
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
