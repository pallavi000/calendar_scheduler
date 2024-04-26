import React, { createContext, useContext, useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import {
  DEFAULT_COUNTRY_CODE,
  DEFAULT_TIMEZONE,
  LOCAL_STORAGE_COUNTRY,
  LOCAL_STORAGE_TIMEZONE,
  LOCAL_STORAGE_TOKEN,
  THEME_MODE,
} from "../constants/common";
import AppLoader from "../components/AppLoader";
import { TGlobalContextStates } from "../@types/context";
import {
  TCountryCode,
  TCountryResponse,
  TThemeMode,
  TTimezone,
} from "../@types/common";
import { TUser } from "../@types/user";
import { getCurrentUserApiService } from "../services/authApiService";
import { apiErrorNotification } from "../components/Notification";
import { getAvailableCountriesApiService } from "../services/holidayApiService";
import { getTimezonesFromCountry } from "../utils/helper";
import moment from "moment-timezone";

export const GlobalContext = createContext<TGlobalContextStates>({
  token: "",
  setToken: (value: string) => {},
  user: undefined,
  themeMode: "dark",
  toggleThemeMode: () => {},
  logoutUser: () => {},
  availableCountries: [],
  availableTimezones: [],
  selectedCountry: DEFAULT_COUNTRY_CODE,
  setSelectedCountry: () => {},
  selectedTimezone: DEFAULT_TIMEZONE,
  setSelectedTimezone: () => {},
});

export const useGlobalContext = () => useContext(GlobalContext);

function GlobalContextProvider({ children }: React.PropsWithChildren) {
  const [isAppReady, setIsAppReady] = useState(false);
  const [user, setUser] = useState<TUser>();
  const [token, setToken] = useLocalStorage(LOCAL_STORAGE_TOKEN, "");

  const [availableCountries, setAvailableCountries] = useState<
    TCountryResponse[]
  >([]);
  const [selectedCountry, setSelectedCountry] = useLocalStorage<TCountryCode>(
    LOCAL_STORAGE_COUNTRY,
    DEFAULT_COUNTRY_CODE
  );

  const [availableTimezones, setAvailableTimezones] = useState<TTimezone[]>([]);
  const [selectedTimezone, setSelectedTimezone] = useLocalStorage<TTimezone>(
    LOCAL_STORAGE_TIMEZONE,
    DEFAULT_TIMEZONE
  );

  useEffect(() => {
    if (selectedCountry) {
      const newTimezones = getTimezonesFromCountry(selectedCountry);
      setAvailableTimezones(newTimezones);
      if (!newTimezones.includes(selectedTimezone)) {
        setSelectedTimezone(newTimezones[0]);
      }
    }
  }, [selectedCountry]);

  const getAvailableCountries = async () => {
    try {
      const response = await getAvailableCountriesApiService();
      setAvailableCountries(response.data);
    } catch (error) {
      apiErrorNotification(error);
    }
  };

  useEffect(() => {
    getAvailableCountries();
  }, []);

  const [themeMode, setThemeMode] = useLocalStorage<TThemeMode | "">(
    THEME_MODE,
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  );

  const toggleThemeMode = () => {
    setThemeMode((prev: TThemeMode) => (prev === "dark" ? "light" : "dark"));
  };

  const logoutUser = () => {
    setToken("");
    window.location.href = "/sign-in";
  };

  const getCurrentUser = async () => {
    try {
      const respose = await getCurrentUserApiService();
      setUser(respose.data);
    } catch (error) {
      setToken("");
    }
    setIsAppReady(true);
  };

  useEffect(() => {
    if (token) {
      getCurrentUser();
    } else {
      setIsAppReady(true);
    }
  }, [token]);

  if (!isAppReady) return <AppLoader />;

  return (
    <GlobalContext.Provider
      value={{
        token,
        setToken,
        user,
        themeMode,
        toggleThemeMode,
        logoutUser,
        availableCountries,
        availableTimezones,
        selectedCountry,
        setSelectedCountry,
        selectedTimezone,
        setSelectedTimezone,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalContextProvider;
