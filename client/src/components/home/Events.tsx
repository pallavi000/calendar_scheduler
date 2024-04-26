import {
  Alert,
  AlertTitle,
  Button,
  ButtonGroup,
  Divider,
  IconButton,
  List,
  Stack,
  Typography,
} from "@mui/material";
import { Add, ChevronLeft, ChevronRight } from "@mui/icons-material";

import { getFormatDate, getMonthAndDay } from "../../utils/helper";
import { TEvent, TPublicHolidayResponse } from "../../@types/events";
import TodayEventListItem from "./TodayEventListItem";
import NewEventModal from "./NewEventModal";
import React, { useEffect, useState } from "react";
import UpdateEventModal from "./UpdateEventModal";
import ConfirmModal from "../ConfirmModal";
import { deleteEventApiService } from "../../services/eventApiService";
import {
  apiErrorNotification,
  customSuccessNotification,
} from "../Notification";
import ViewEventModal from "./ViewEventModal";
import { useQueryClient } from "react-query";
import moment from "moment-timezone";

type EventsProps = {
  events: TEvent[];
  holidays: TEvent[];
};

const TODAY = moment.tz().format();

function Events({ events, holidays }: EventsProps) {
  const queryClient = useQueryClient();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [activeEvent, setActiveEvent] = useState<TEvent | null>();
  const [currentDate, setCurrentDate] = useState(TODAY);

  const todayEvents = React.useMemo(() => {
    const evts = events.filter((evt) =>
      evt.startTime.includes(getFormatDate(currentDate))
    );
    const hldys = holidays.filter((evt) =>
      evt.startTime.includes(getFormatDate(currentDate))
    );
    return [...evts, ...hldys];
  }, [currentDate, events, holidays]);

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
    setIsViewModalOpen(false);
    setActiveEvent(null);
  };

  const handleDeleteEvent = async () => {
    if (!activeEvent) return;
    try {
      await deleteEventApiService(activeEvent.id);
      customSuccessNotification("event deleted successfully!");
      queryClient.invalidateQueries(["events"]);
    } catch (error) {
      apiErrorNotification(error);
    }
  };

  const handleEventDeleteClick = (event: TEvent) => {
    setActiveEvent(event);
    setIsDeleteModalOpen(true);
  };

  useEffect(() => {
    console.log(currentDate);
  }, [currentDate]);

  return (
    <>
      <Stack
        width={"100%"}
        alignItems={"center"}
        justifyContent={"space-between"}
        direction={"row"}
      >
        <Stack direction={"row"} alignItems={"center"} spacing={2}>
          <IconButton
            onClick={() =>
              setCurrentDate((prev) =>
                moment.utc(prev).subtract(1, "day").format()
              )
            }
          >
            <ChevronLeft />
          </IconButton>
          <Typography variant="body1">
            {moment.utc(currentDate).format("MMM DD")}
          </Typography>
          <IconButton
            onClick={() =>
              setCurrentDate((prev) => moment.utc(prev).add(1, "day").format())
            }
          >
            <ChevronRight />
          </IconButton>
        </Stack>

        <NewEventModal events={events} />
        {activeEvent && isEditModalOpen ? (
          <UpdateEventModal
            events={events}
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
