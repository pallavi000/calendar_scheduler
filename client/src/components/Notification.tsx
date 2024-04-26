import { Button, IconButton } from "@mui/material";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import CloseIcon from "@mui/icons-material/Close";

const action = (snackbarId: any, handleClick?: () => void) => (
  <IconButton
    aria-label="delete"
    size="small"
    color="inherit"
    onClick={() => {
      closeSnackbar(snackbarId);
      if (handleClick) {
        handleClick();
      }
    }}
  >
    <CloseIcon fontSize="inherit" />
  </IconButton>
);

export function customSuccessNotification(msg = "Success!") {
  enqueueSnackbar(msg, {
    variant: "success",
    action,
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "right",
    },
  });
}

export function customErrorNotification(msg = "Error!") {
  enqueueSnackbar(msg, {
    variant: "error",
    action,
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "right",
    },
  });
}

export function apiErrorNotification(error: any) {
  const msg = error?.response?.data?.message ?? "Some problem occurred.";
  enqueueSnackbar(msg, {
    variant: "error",
    action,
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "right",
    },
  });
}

export function eventNotification(
  msg = "Success!",
  handleCloseClick: () => void
) {
  enqueueSnackbar(msg, {
    variant: "info",
    action: (key) => action(key, handleCloseClick),
    autoHideDuration: 60000 - 1000,
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "right",
    },
  });
}
