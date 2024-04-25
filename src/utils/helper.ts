import { TEvent, TPublicHolidayResponse } from "../@types/events";

export function getStartOfYear(): string {
  const today = new Date();
  const year = today.getFullYear();
  return `${year}-01-01`;
}

export function getEndOfYear(): string {
  const today = new Date();
  const year = today.getFullYear();
  return `${year}-12-31`;
}

export function getCurrentYear(): string {
  const today = new Date();
  const year = today.getFullYear().toString();
  return year;
}

export function convertPublicHolidaysToEvents(
  holidays: TPublicHolidayResponse[]
): TEvent[] {
  return holidays.map((holiday) => ({
    title: holiday.name,
    start: holiday.date,
  }));
}
