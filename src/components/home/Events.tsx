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

type EventsProps = {
  events: TEvent[];
};

function Events({ events }: EventsProps) {
  const [activeEvent, setActiveEvent] = useState<TEvent>();

  const TODAY = new Date();
  const todayEvents = events.filter((evt) =>
    evt.startTime.includes(getFormatDate(TODAY))
  );

  const handleEventEditClick = (event: TEvent) => {
    setActiveEvent(event);
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
        {activeEvent ? <UpdateEventModal event={activeEvent} /> : null}
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
                    handleEventEditClick={handleEventEditClick}
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
