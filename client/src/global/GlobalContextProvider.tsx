import React, { createContext, useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { io } from "socket.io-client";

// hooks
import useLocalStorage from "../hooks/useLocalStorage";

// constants
import {
  DEFAULT_COUNTRY_CODE,
  DEFAULT_TIMEZONE,
  LOCAL_STORAGE_COUNTRY,
  LOCAL_STORAGE_TIMEZONE,
  LOCAL_STORAGE_TOKEN,
  THEME_MODE,
} from "../constants/common";

// components
import AppLoader from "../components/AppLoader";

// types
import { TGlobalContextStates } from "../@types/context";
import {
  TCountryCode,
  TCountryResponse,
  TThemeMode,
  TTimezone,
} from "../@types/common";
import { TUser } from "../@types/user";
import { TEvent } from "../@types/events";

// services
import { getCurrentUserApiService } from "../services/authApiService";
import { getAvailableCountriesApiService } from "../services/holidayApiService";
import { clearEventNotificationApiService } from "../services/eventApiService";

// helpers
import { getTimezonesFromCountry } from "../utils/helper";

// components
import { eventNotification } from "../components/Notification";

// context init
export const GlobalContext = createContext<TGlobalContextStates>({
  token: "",
  setToken: () => {},
  user: undefined,
  themeMode: "light",
  toggleThemeMode: () => {},
  logoutUser: () => {},
  availableCountries: [],
  availableTimezones: [],
  selectedCountry: DEFAULT_COUNTRY_CODE,
  setSelectedCountry: () => {},
  selectedTimezone: DEFAULT_TIMEZONE,
  setSelectedTimezone: () => {},
  eventNotifications: [],
});

// use context
export const useGlobalContext = () => useContext(GlobalContext);

function GlobalContextProvider({ children }: React.PropsWithChildren) {
  const [isAppReady, setIsAppReady] = useState(false);
  const [eventNotifications, setEventNotifications] = useState<TEvent[]>([]);
  const [user, setUser] = useState<TUser>();
  const [token, setToken] = useLocalStorage(LOCAL_STORAGE_TOKEN, "");
  const [themeMode, setThemeMode] = useLocalStorage<TThemeMode | "">(
    THEME_MODE,
    "light"
  );
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

  // get current user
  useQuery(["me"], getCurrentUserApiService, {
    enabled: Boolean(token),
    retry: false,
    onSuccess: ({ data }) => {
      setUser(data.user);
      setIsAppReady(true);
    },
  });

  // get available countries
  useQuery(["get_countries"], getAvailableCountriesApiService, {
    retry: false,
    onSuccess: ({ data }) => {
      setAvailableCountries(data);
    },
  });

  // clear notification schedule job
  const handleClearNotification = async (job_id: string) => {
    try {
      await clearEventNotificationApiService(job_id);
    } catch (error) {
      console.log(error);
    }
  };

  // socket config
  useEffect(() => {
    let socket: any;
    if (user) {
      socket = io("http://127.0.0.1:5000", {});
      socket.on(
        "event_notification",
        ({ event, job_id }: { event: TEvent; job_id: string }) => {
          setEventNotifications((prev) => [...prev, event]);
          eventNotification(`"${event.title}" named event has started!`, () =>
            handleClearNotification(job_id)
          );
        }
      );
    }
    return () => {
      socket?.disconnect();
    };
  }, [user]);

  // update timezone when country change
  useEffect(() => {
    if (selectedCountry) {
      const newTimezones = getTimezonesFromCountry(selectedCountry);
      setAvailableTimezones(newTimezones);
      if (!newTimezones.includes(selectedTimezone)) {
        setSelectedTimezone(newTimezones[0]);
      }
    }
  }, [selectedCountry]);

  // toggle theme mode
  const toggleThemeMode = () => {
    setThemeMode((prev: TThemeMode) => (prev === "dark" ? "light" : "dark"));
  };

  // logout user
  const logoutUser = () => {
    setToken("");
    window.location.href = "/sign-in";
  };

  // get app ready instantly when user is logged out
  useEffect(() => {
    if (!token) {
      setIsAppReady(true);
    }
  }, [token]);

  // loader
  if (!isAppReady) return <AppLoader />;

  return (
    <GlobalContext.Provider
      value={{
        eventNotifications,
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
