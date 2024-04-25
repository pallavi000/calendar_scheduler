import {
  Alert,
  AlertTitle,
  Button,
  Divider,
  List,
  Stack,
  Typography,
} from "@mui/material";
import { Add } from "@mui/icons-material";

import { getFormatDate, getMonthAndDay } from "../../utils/helper";
import { TEvent } from "../../@types/events";
import TodayEventListItem from "./TodayEventListItem";
import NewEventModal from "./NewEventModal";
import { useState } from "react";
import UpdateEventModal from "./UpdateEventModal";
import ConfirmModal from "../ConfirmModal";
import { deleteEventApiService } from "../../services/eventApiService";
import {
  apiErrorNotification,
  customSuccessNotification,
} from "../Notification";
import ViewEventModal from "./ViewEventModal";

type EventsProps = {
  events: TEvent[];
};

function Events({ events }: EventsProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [activeEvent, setActiveEvent] = useState<TEvent | null>();

  const TODAY = new Date();
  const todayEvents = events.filter((evt) =>
    evt.startTime.includes(getFormatDate(TODAY))
  );

  const handleEventViewClick = (event: TEvent) => {
    setActiveEvent(event);
    setIsViewModalOpen(true);
  };

  const handleEventEditClick = (event: TEvent) => {
    setActiveEvent(event);
    setIsEditModalOpen(true);
  };

  const handleModalClose = () => {
    setIsDeleteModalOpen(false);
    setIsEditModalOpen(false);
    setActiveEvent(null);
  };

  const handleDeleteEvent = async () => {
    if (!activeEvent) return;
    try {
      await deleteEventApiService(activeEvent.id);
      customSuccessNotification("event deleted successfully!");
    } catch (error) {
      apiErrorNotification(error);
    }
  };

  const handleEventDeleteClick = (event: TEvent) => {
    setActiveEvent(event);
    setIsDeleteModalOpen(true);
  };

  return (
    <>
      <Stack
        width={"100%"}
        alignItems={"center"}
        justifyContent={"space-between"}
        direction={"row"}
      >
        <Typography variant="h6">Today, {getMonthAndDay(TODAY)}</Typography>
        <NewEventModal />
        {activeEvent && isEditModalOpen ? (
          <UpdateEventModal
            event={activeEvent}
            isOpen={isEditModalOpen}
            handleClose={handleModalClose}
          />
        ) : null}
        {activeEvent && isDeleteModalOpen ? (
          <ConfirmModal
            title="Delete this event?"
            description="By deleting this event, it will be permanently removed from your calendar. Make sure to confirm if you want to proceed, as this action cannot be undone. Consider reviewing the details before deletion to avoid unintentional removal of important appointments or meetings."
            open={isDeleteModalOpen}
            handleClose={handleModalClose}
            onSubmit={handleDeleteEvent}
          />
        ) : null}
        {activeEvent && isViewModalOpen ? (
          <ViewEventModal
            event={activeEvent}
            isOpen={isViewModalOpen}
            handleClose={handleModalClose}
          />
        ) : null}
      </Stack>
      <Divider sx={{ my: 3 }} />
      <Stack>
        {!todayEvents.length ? (
          <Alert severity="error">
            <AlertTitle>Oops</AlertTitle>
            There are no events today.
          </Alert>
        ) : (
          <>
            <List>
              {todayEvents.map((todayEvent) => {
                return (
                  <TodayEventListItem
                    key={todayEvent.title}
                    event={todayEvent}
                    handleEventViewClick={handleEventViewClick}
                    handleEventEditClick={handleEventEditClick}
                    handleEventDeleteClick={handleEventDeleteClick}
                  />
                );
              })}
            </List>
          </>
        )}
      </Stack>
    </>
  );
}

export default Events;
