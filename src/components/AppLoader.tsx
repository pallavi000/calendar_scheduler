import React, { useMemo } from "react";
// MUI
import { Container, CircularProgress, CssBaseline } from "@mui/material";
import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
} from "@mui/material/styles";
import { THEME_MODE } from "../constants/common";

import useLocalStorage from "../hooks/useLocalStorage";
import palette from "../theme/palette";

function AppLoader() {
  const [themeMode, setThemeMode] = useLocalStorage(
    THEME_MODE,
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  );

  const themeOptions = useMemo(
    () => ({
      palette: palette(themeMode),
      shape: { borderRadius: 8 },
    }),
    [themeMode]
  );

  const theme = createTheme(themeOptions);

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      <Container
        maxWidth="md"
        sx={{
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          height: "100vh",
          backgroundColor: (theme) => theme.palette.background.default,
        }}
      >
        <CircularProgress color="primary" />
      </Container>
    </MUIThemeProvider>
  );
}

export default AppLoader;
