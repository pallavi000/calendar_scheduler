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

type EventsProps = {
  events: TEvent[];
};

function Events({ events }: EventsProps) {
  const TODAY = new Date();
  const todayEvents = events.filter((evt) =>
    evt.start.includes(getFormatDate(TODAY))
  );

  return (
    <>
      <Stack
        width={"100%"}
        alignItems={"center"}
        justifyContent={"space-between"}
        direction={"row"}
      >
        <Typography variant="h6">Today, {getMonthAndDay(TODAY)}</Typography>
        <Button variant="contained" size="small" endIcon={<Add />}>
          New Event
        </Button>
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
