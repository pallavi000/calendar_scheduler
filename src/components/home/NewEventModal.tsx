import * as React from "react";
import Button from "@mui/material/Button";
import { Add } from "@mui/icons-material";
import * as yup from "yup";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TNewEventFormData } from "../../@types/events";
import moment from "moment-timezone";
import { useGlobalContext } from "../../global/GlobalContextProvider";
import {
  apiErrorNotification,
  customSuccessNotification,
} from "../Notification";
import { createNewEventApiService } from "../../services/eventApiService";
import EventForm from "./EventForm";

// Define validation schema using Yup
const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  startTime: yup.string().required("Start time is required"),
  endTime: yup.string().required("End time is required"),
  description: yup.string().required("Description is required"),
  participants: yup.string().required("Participant name is required"),
});

export default function NewEventModal() {
  const { selectedTimezone } = useGlobalContext();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const methods = useForm<TNewEventFormData>({
    resolver: yupResolver(schema),
  });
  const { setValue } = methods;

  React.useEffect(() => {
    if (selectedTimezone) {
      setValue("startTime", moment.tz(selectedTimezone).format());
      setValue("endTime", moment.tz(selectedTimezone).format());
    }
  }, [selectedTimezone]);

  const resetFormValues = () => {
    setValue("title", "");
    setValue("description", "");
    setValue("participants", "");
    setValue("startTime", moment.tz(selectedTimezone).format());
    setValue("endTime", moment.tz(selectedTimezone).format());
  };

  const onSubmit = async (data: TNewEventFormData) => {
    try {
      const response = await createNewEventApiService(data);
      resetFormValues();
      handleClose();
      customSuccessNotification("Event added successfully.");
    } catch (error) {
      apiErrorNotification(error);
    }
  };

  return (
    <React.Fragment>
      <Button
        variant="contained"
        size="small"
        endIcon={<Add />}
        onClick={handleClickOpen}
      >
        New Event
      </Button>
      <FormProvider {...methods}>
        <EventForm
          isOpen={open}
          handleClose={handleClose}
          onSubmit={onSubmit}
        />
      </FormProvider>
    </React.Fragment>
  );
}
