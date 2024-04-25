import React, { createContext, useContext, useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_TOKEN, THEME_MODE } from "../constants/common";
import AppLoader from "../components/AppLoader";
import { TGlobalContextStates } from "../@types/context";
import { TThemeMode } from "../@types/common";

export const GlobalContext = createContext<TGlobalContextStates>({
  token: "",
  setToken: () => {},
  themeMode: "dark",
  toggleThemeMode: () => {},
  logoutUser: () => {},
});

export const useGlobalContext = () => useContext(GlobalContext);

function GlobalContextProvider({ children }: React.PropsWithChildren) {
  const [isAppReady, setIsAppReady] = useState(false);
  const [themeMode, setThemeMode] = useLocalStorage<TThemeMode | "">(
    THEME_MODE,
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  );
  const [token, setToken] = useLocalStorage(LOCAL_STORAGE_TOKEN, "");

  const toggleThemeMode = () => {
    setThemeMode((prev: TThemeMode) => (prev === "dark" ? "light" : "dark"));
  };

  const logoutUser = () => {
    setToken("");
    window.location.href = "/sign-in";
  };

  useEffect(() => {
    if (!token) {
      // TODO:: do api call
      setIsAppReady(true);
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
        themeMode,
        toggleThemeMode,
        logoutUser,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalContextProvider;
