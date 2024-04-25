import axios from "axios";
import { TPublicHolidayInputData } from "../@types/events";
import { getCurrentYear } from "../utils/helper";

export function getHolidaysApiService(data: TPublicHolidayInputData) {
  if (!data.year) {
    data.year = getCurrentYear();
  }

  return axios.get(
    `https://date.nager.at/api/v3/PublicHolidays/${data.year}/${data.countryIsoCode}`
  );
}

export function getAvailableCountriesApiService() {
  return axios.get(`https://date.nager.at/api/v3/AvailableCountries`);
}
