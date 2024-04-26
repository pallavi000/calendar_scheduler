import * as React from "react";
// MUI
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

// types
type ConfirmModalProps = {
  open: boolean;
  handleClose: () => void;
  title: string;
  onSubmit: () => void;
  description?: string;
  buttonTitle?: string;
};
export default function ConfirmModal({
  open,
  handleClose,
  onSubmit,
  title,
  description,
  buttonTitle = "Submit",
}: ConfirmModalProps) {
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          {description ? (
            <DialogContentText id="alert-dialog-description">
              {description}
            </DialogContentText>
          ) : null}
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleClose} variant="outlined">
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              onSubmit();
              handleClose();
            }}
            autoFocus
          >
            {buttonTitle}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
