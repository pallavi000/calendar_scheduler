import { useMemo } from "react";
// @mui
import { CssBaseline } from "@mui/material";
import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
} from "@mui/material/styles";

//
// components
import ToastrProvider from "../global/ToastProvider";
import palette from "./palette";
import typography from "./typography";
import { useGlobalContext } from "../global/GlobalContextProvider";

// ----------------------------------------------------------------------

export default function ThemeProvider({ children }: React.PropsWithChildren) {
  const { themeMode } = useGlobalContext();

  const themeOptions = useMemo(
    () => ({
      palette: palette(themeMode),
      typography,
      shape: { borderRadius: 8 },
    }),
    [themeMode]
  );

  const theme = createTheme(themeOptions);

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      <ToastrProvider>{children}</ToastrProvider>
    </MUIThemeProvider>
  );
}
