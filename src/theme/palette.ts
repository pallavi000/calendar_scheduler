import { alpha } from "@mui/material/styles";
import { TThemeMode } from "../@types/common";

// ----------------------------------------------------------------------

// SETUP COLORS
const GREY = {
  0: "#F8F9FA",
  100: "#F1F3F5",
  200: "#E2E8F0",
  300: "#CBD5E1",
  400: "#94A3B8",
  500: "#64748B",
  600: "#475569",
  700: "#334155",
  800: "#1E293B",
  900: "#0F172A",
};

const PRIMARY = {
  lighter: "#ff60cf",
  light: "#ff42c9",
  main: "#ff00c5",
  dark: "#a70077",
  darker: "#73004c",
  contrastText: "#FFFFFF",
};

const SECONDARY = {
  lighter: "#ec5437",
  light: "#e4381e",
  main: "#db0000",
  dark: "#920000",
  darker: "#6a0000",
  contrastText: "#FFFFFF",
};

const INFO = {
  lighter: "#69baff",
  light: "#49b2ff",
  main: "#00a9ff",
  dark: "#0056a1",
  darker: "#002a6d",
  contrastText: "#FFFFFF",
};

const SUCCESS = {
  lighter: "#98f897",
  light: "#6af574",
  main: "#00f14c",
  dark: "##007a00",
  darker: "#004e00",
  contrastText: "#000000",
};

const WARNING = {
  lighter: "#FFE082",
  light: "#FFD54F",
  main: "#FFC107",
  dark: "#FFA000",
  darker: "#FF8F00",
  contrastText: GREY[800],
};

const ERROR = {
  lighter: "#FFE9D5",
  light: "#FFAC82",
  main: "#FF5630",
  dark: "#B71D18",
  darker: "#7A0916",
  contrastText: "#ffffff",
};

const COMMON = {
  common: { black: "#000000", white: "#f3ffff" },
  primary: PRIMARY,
  secondary: SECONDARY,
  info: INFO,
  success: SUCCESS,
  warning: WARNING,
  error: ERROR,
  grey: GREY,
  divider: alpha(GREY[500], 0.24),
  action: {
    hover: alpha(GREY[500], 0.08),
    selected: alpha(GREY[500], 0.16),
    disabled: alpha(GREY[500], 0.8),
    disabledBackground: alpha(GREY[500], 0.24),
    focus: alpha(GREY[500], 0.24),
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
  },
};

export default function palette(themeMode: TThemeMode) {
  const light = {
    ...COMMON,
    mode: "light",
    text: {
      primary: GREY[800],
      secondary: GREY[600],
      disabled: GREY[500],
    },
    background: { paper: "#FFFFFF", default: "#FFFFFF", neutral: GREY[200] },
    action: {
      ...COMMON.action,
      active: GREY[600],
    },
  } as const;

  const dark = {
    ...COMMON,
    mode: "dark",
    text: {
      primary: "#FFFFFF",
      secondary: GREY[400],
      disabled: GREY[600],
    },
    background: {
      paper: GREY[800],
      default: GREY[900],
      neutral: alpha(GREY[500], 0.16),
    },
    action: {
      ...COMMON.action,
      active: GREY[500],
    },
  } as const;

  return themeMode === "light" ? light : dark;
}
