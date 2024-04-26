import moment from "moment-timezone";
import { Controller, useFormContext } from "react-hook-form";
// MUI
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormLabel,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

// icons
import CloseIcon from "@mui/icons-material/Close";

// context
import { useGlobalContext } from "../../global/GlobalContextProvider";

// types
import { TNewEventFormData } from "../../@types/events";

type EventFormProps = {
  title: string;
  isOpen: boolean;
  handleClose: () => void;
  onSubmit: (data: TNewEventFormData) => void;
};

function EventForm({ isOpen, handleClose, onSubmit, title }: EventFormProps) {
  const { selectedTimezone } = useGlobalContext();
  const { control, formState, setValue, handleSubmit, watch } =
    useFormContext<TNewEventFormData>();
  const { errors } = formState;

  return (
    <Dialog
      maxWidth="md"
      fullWidth
      open={isOpen}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        autoComplete: "off",
        onSubmit: handleSubmit(onSubmit),
      }}
    >
      <DialogTitle>{title}</DialogTitle>
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
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  error={!!errors.title}
                  helperText={errors.title?.message}
                />
              )}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Start Time</FormLabel>
            <LocalizationProvider
              dateAdapter={AdapterMoment}
              dateLibInstance={moment}
            >
              <DateTimePicker
                defaultValue={moment.tz(watch("startTime"), selectedTimezone)}
                onChange={(value) => {
                  if (value) {
                    setValue("startTime", value?.format());
                  }
                }}
              />
            </LocalizationProvider>
          </FormControl>

          <FormControl>
            <FormLabel>End Time</FormLabel>
            <LocalizationProvider
              dateAdapter={AdapterMoment}
              dateLibInstance={moment}
            >
              <DateTimePicker
                defaultValue={moment.tz(watch("startTime"), selectedTimezone)}
                onChange={(value) => {
                  if (value) {
                    setValue("endTime", value?.format());
                  }
                }}
              />
            </LocalizationProvider>
          </FormControl>

          <FormControl>
            <FormLabel>Description</FormLabel>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                />
              )}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Participants</FormLabel>
            <Controller
              name="participants"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  placeholder="John Doe, Dr Brand"
                  error={!!errors.participants}
                  helperText={errors.participants?.message}
                  multiline
                  rows={3}
                />
              )}
            />
          </FormControl>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button autoFocus variant="contained" type="submit">
          Save changes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EventForm;
