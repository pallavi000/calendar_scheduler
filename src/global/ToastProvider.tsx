import React from "react";

// Snackbar
import { MaterialDesignContent, SnackbarProvider } from "notistack";

// context
import { styled, useTheme } from "@mui/material";

function ToastrProvider({ children }: React.PropsWithChildren) {
  const theme = useTheme();

  // Snackbar customization
  const StyledMaterialDesignContent = styled(MaterialDesignContent)(() => ({
    "&.notistack-MuiContent-success": {
      backgroundColor: theme?.palette?.success?.main,
      color: theme?.palette?.success?.contrastText,
    },
    "&.notistack-MuiContent-error": {
      backgroundColor: theme?.palette?.error?.main,
      color: theme?.palette?.error?.contrastText,
    },
  }));

  return (
    <SnackbarProvider
      maxSnack={1}
      Components={{
        success: StyledMaterialDesignContent,
        error: StyledMaterialDesignContent,
      }}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
    >
      {children}
    </SnackbarProvider>
  );
}

export default ToastrProvider;
