import { Button, IconButton } from "@mui/material";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import CloseIcon from "@mui/icons-material/Close";

const action = (snackbarId: any) => (
  <IconButton
    aria-label="delete"
    size="small"
    color="inherit"
    onClick={() => {
      closeSnackbar(snackbarId);
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

export function eventNotification(msg = "Success!") {
  enqueueSnackbar(msg, {
    variant: "info",
    action,
    autoHideDuration: null,
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "right",
    },
  });
}
