import React from "react";
import { useGlobalContext } from "../../global/GlobalContextProvider";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import { TEvent } from "../../@types/events";
import CloseIcon from "@mui/icons-material/Close";
import moment from "moment-timezone";

type ViewEventModalProps = {
  event: TEvent;
  isOpen: boolean;
  handleClose: () => void;
};

function ViewEventModal({ event, isOpen, handleClose }: ViewEventModalProps) {
  const { selectedTimezone } = useGlobalContext();

  return (
    <>
      <Dialog maxWidth="md" fullWidth open={isOpen} onClose={handleClose}>
        <DialogTitle>Event Detail</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers sx={{ pb: 4 }}>
          <Stack spacing={4}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell sx={{ border: 0 }}>Title</TableCell>
                  <TableCell sx={{ border: 0 }}>:</TableCell>
                  <TableCell sx={{ border: 0 }}>{event.title}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ border: 0 }}>Start Time</TableCell>
                  <TableCell sx={{ border: 0 }}>:</TableCell>
                  <TableCell sx={{ border: 0 }}>
                    {moment
                      .tz(event.startTime, selectedTimezone)
                      .format("YYYY-MM-DD hh:mm A")}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ border: 0 }}>End Time</TableCell>
                  <TableCell sx={{ border: 0 }}>:</TableCell>
                  <TableCell sx={{ border: 0 }}>
                    {moment
                      .tz(event.endTime, selectedTimezone)
                      .format("YYYY-MM-DD hh:mm A")}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ border: 0 }}>Description</TableCell>
                  <TableCell sx={{ border: 0 }}>:</TableCell>
                  <TableCell sx={{ border: 0 }}>{event.description}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ border: 0 }}>Participants</TableCell>
                  <TableCell sx={{ border: 0 }}>:</TableCell>
                  <TableCell sx={{ border: 0 }}>{event.participants}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ViewEventModal;
