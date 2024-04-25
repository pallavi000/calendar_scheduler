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
import { Box, Grid, useTheme } from "@mui/material";
import { getAllEventsApiService } from "../services/eventApiService";
import moment from "moment-timezone";
import { useGlobalContext } from "../global/GlobalContextProvider";
import ViewEventModal from "../components/home/ViewEventModal";

function Home() {
  const theme = useTheme();
  const { selectedTimezone } = useGlobalContext();
  const [events, setEvents] = useState<TEvent[]>([]);

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [activeEvent, setActiveEvent] = useState<TEvent | null>();

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
      {activeEvent && isViewModalOpen ? (
        <ViewEventModal
          event={activeEvent}
          isOpen={isViewModalOpen}
          handleClose={() => {
            setIsViewModalOpen(false);
            setActiveEvent(null);
          }}
        />
      ) : null}
      <Grid container spacing={12}>
        <Grid item sm={12} md={9}>
          <FullCalendar
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
            eventClick={(info) => {
              setActiveEvent(info.event.extendedProps as TEvent);
              setIsViewModalOpen(true);
            }}
            droppable={true}
            timeZone={selectedTimezone}
            events={events.map((event) => ({
              extendedProps: event,
              title: event.title,
              start: moment.tz(event.startTime, selectedTimezone).format(),
              end: event.endTime
                ? moment.tz(event.endTime, selectedTimezone).format()
                : "",
            }))}
            eventTimeFormat={{
              hour: "numeric",
              minute: "2-digit",
              meridiem: "short",
            }}
            eventDidMount={(info) => console.log(info)}
            eventColor={theme.palette.primary.main}
            eventTextColor={theme.palette.primary.contrastText}
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
