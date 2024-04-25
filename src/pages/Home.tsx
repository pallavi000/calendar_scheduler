import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import { getHolidaysApiService } from "../services/holidayApiService";
import { TEvent, TPublicHolidayInputData } from "../@types/events";
import { convertPublicHolidaysToEvents } from "../utils/helper";
import { apiErrorNotification } from "../components/Notification";
import Events from "../components/home/Events";
import { Box, Grid } from "@mui/material";
import { getAllEventsApiService } from "../services/eventApiService";
import moment from "moment-timezone";
import { useGlobalContext } from "../global/GlobalContextProvider";

function Home() {
  const { selectedTimezone } = useGlobalContext();
  const [events, setEvents] = useState<TEvent[]>([]);

  // get all events
  const getAllEvents = async () => {
    const [customEvents, holidaysEvents] = await Promise.all([
      getCustomEvents(),
      getHolidays(),
    ]);
    setEvents([...(holidaysEvents as TEvent[]), ...customEvents]);
  };

  // get events
  const getCustomEvents = async () => {
    try {
      const response = await getAllEventsApiService();
      return response.data;
    } catch (error) {
      apiErrorNotification(error);
    }
  };

  // get holidays
  const getHolidays = async () => {
    try {
      const data: TPublicHolidayInputData = {
        countryIsoCode: "US",
      };
      const response = await getHolidaysApiService(data);
      const evts = convertPublicHolidaysToEvents(response.data);
      return evts;
    } catch (error) {
      apiErrorNotification(error);
    }
  };
  useEffect(() => {
    getAllEvents();
  }, []);

  return (
    <Box sx={{ p: 6 }}>
      <Grid container spacing={12}>
        <Grid item sm={12} md={9}>
          <FullCalendar
            themeSystem="dark"
            headerToolbar={{
              left: "prev,next",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,list",
            }}
            plugins={[
              interactionPlugin,
              dayGridPlugin,
              timeGridPlugin,
              listPlugin,
            ]}
            droppable={true}
            timeZone={selectedTimezone}
            events={events.map((event) => ({
              title: event.title,
              start: moment.tz(event.startTime, selectedTimezone).format(),
              end: event.endTime
                ? moment.tz(event.endTime, selectedTimezone).format()
                : "",
            }))}
          />
        </Grid>
        <Grid item sm={12} md={3}>
          <Events events={events} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Home;
