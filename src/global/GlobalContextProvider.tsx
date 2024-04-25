import React, { createContext, useContext, useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_TOKEN, THEME_MODE } from "../constants/common";
import AppLoader from "../components/AppLoader";
import { TGlobalContextStates } from "../@types/context";
import { TThemeMode } from "../@types/common";
import { TUser } from "../@types/user";
import { getCurrentUserApiService } from "../services/authApiService";

export const GlobalContext = createContext<TGlobalContextStates>({
  token: "",
  setToken: (value: string) => {},
  user: undefined,
  themeMode: "dark",
  toggleThemeMode: () => {},
  logoutUser: () => {},
});

export const useGlobalContext = () => useContext(GlobalContext);

function GlobalContextProvider({ children }: React.PropsWithChildren) {
  const [isAppReady, setIsAppReady] = useState(false);
  const [user, setUser] = useState<TUser>();
  const [token, setToken] = useLocalStorage(LOCAL_STORAGE_TOKEN, "");
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
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalContextProvider;
