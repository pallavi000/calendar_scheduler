import * as React from "react";
import Button from "@mui/material/Button";
import { Add } from "@mui/icons-material";
import * as yup from "yup";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TEvent, TNewEventFormData } from "../../@types/events";
import moment from "moment-timezone";
import { useGlobalContext } from "../../global/GlobalContextProvider";
import {
  apiErrorNotification,
  customErrorNotification,
  customSuccessNotification,
} from "../Notification";
import { createNewEventApiService } from "../../services/eventApiService";
import EventForm from "./EventForm";
import { hasAlreadyEvent } from "../../utils/helper";
import { useQueryClient } from "react-query";

// Define validation schema using Yup
const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  startTime: yup.string().required("Start time is required"),
  endTime: yup.string().required("End time is required"),
  description: yup.string().required("Description is required"),
  participants: yup.string().required("Participant name is required"),
  timezone: yup.string().required(),
});

type NewEventModalProps = {
  events: TEvent[];
};

export default function NewEventModal({ events }: NewEventModalProps) {
  const queryClient = useQueryClient();
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
      setValue("timezone", selectedTimezone);
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
      if (hasAlreadyEvent(data.startTime, events, selectedTimezone))
        return customErrorNotification(
          "You already have an event for this start time."
        );
      if (hasAlreadyEvent(data.endTime, events, selectedTimezone))
        return customErrorNotification(
          "You already have an event for this end time."
        );
      await createNewEventApiService(data);
      resetFormValues();
      handleClose();
      customSuccessNotification("Event added successfully.");
      queryClient.invalidateQueries(["events"]);
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
          title="Create New Event"
          isOpen={open}
          handleClose={handleClose}
          onSubmit={onSubmit}
        />
      </FormProvider>
    </React.Fragment>
  );
}
