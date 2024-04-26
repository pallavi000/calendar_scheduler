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
import {
  createNewEventApiService,
  updateEventApiService,
} from "../../services/eventApiService";
import EventForm from "./EventForm";
import { hasAlreadyEvent } from "../../utils/helper";

// Define validation schema using Yup
const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  startTime: yup.string().required("Start time is required"),
  endTime: yup.string().required("End time is required"),
  description: yup.string().required("Description is required"),
  participants: yup.string().required("Participant name is required"),
});

export type UpdateEventModalProps = {
  events: TEvent[];
  event: TEvent;
  isOpen: boolean;
  handleClose: () => void;
};

export default function UpdateEventModal({
  events,
  event,
  isOpen,
  handleClose,
}: UpdateEventModalProps) {
  const { selectedTimezone } = useGlobalContext();

  const methods = useForm<TNewEventFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: event.title,
      startTime: event.startTime,
      endTime: event.endTime,
      description: event.description,
      participants: event.participants,
    },
  });

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
      const response = await updateEventApiService(event.id, data);
      handleClose();
      customSuccessNotification("Event updated successfully.");
    } catch (error) {
      apiErrorNotification(error);
    }
  };

  return (
    <React.Fragment>
      <FormProvider {...methods}>
        <EventForm
          title="Update Event"
          isOpen={isOpen}
          handleClose={handleClose}
          onSubmit={onSubmit}
        />
      </FormProvider>
    </React.Fragment>
  );
}
