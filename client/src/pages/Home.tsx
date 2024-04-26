import React, { useRef, useState } from "react";
import moment from "moment-timezone";
import { useQuery } from "react-query";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";

// MUI
import { Box, Grid, useTheme } from "@mui/material";

// services
import { getHolidaysApiService } from "../services/holidayApiService";
import { getAllEventsApiService } from "../services/eventApiService";

// types
import { TEvent } from "../@types/events";
import { TCalendarNavText, TCalendarView } from "../@types/common";

// helpers
import { convertPublicHolidaysToEvents } from "../utils/helper";

// components
import Events from "../components/home/Events";
import ViewEventModal from "../components/home/ViewEventModal";
import CalendarTopBar from "../components/home/CalendarTopBar";

// context
import { useGlobalContext } from "../global/GlobalContextProvider";

function Home() {
  const theme = useTheme();
  const calendarRef = useRef<any>();
  const { selectedTimezone, selectedCountry } = useGlobalContext();
  const [events, setEvents] = useState<TEvent[]>([]);
  const [holidays, setHolidays] = useState<TEvent[]>([]);
  const [activeDate, setActiveDate] = useState<string>(moment.tz().format());
  const [activeView, setActiveView] = useState<TCalendarView>("dayGridMonth");

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [activeEvent, setActiveEvent] = useState<TEvent | null>();

  // get users events
  useQuery(["events"], getAllEventsApiService, {
    onSuccess: ({ data }) => {
      setEvents(data.events);
    },
  });

  // get public holidays
  useQuery({
    queryKey: ["public_holidays", selectedCountry],
    queryFn: () => getHolidaysApiService({ countryIsoCode: selectedCountry }),
    onSuccess: ({ data }) => {
      const evts = convertPublicHolidaysToEvents(data);
      setHolidays(evts as TEvent[]);
    },
  });

  // prev next click handler
  const handlePrevNextClick = (action: TCalendarNavText) => {
    if (!calendarRef.current) return;
    if (action === "prev") {
      calendarRef.current?.calendar?.prev();
    } else {
      calendarRef.current?.calendar?.next();
    }
    setActiveDate(calendarRef.current?.calendar?.getDate().toISOString());
  };

  // change view handler
  const handleChangeViewClick = (view: TCalendarView) => {
    if (!calendarRef.current) return;
    calendarRef.current?.calendar?.changeView(view);
    setActiveView(view);
  };

  // calendar events data transformation
  const calendarEvents = React.useMemo(() => {
    const evts = events.map((event) => ({
      extendedProps: event,
      title: event.title,
      start: moment.tz(event.startTime, selectedTimezone).format(),
      end: event.endTime
        ? moment.tz(event.endTime, selectedTimezone).format()
        : "",
    }));
    const hldys = holidays.map((event) => ({
      extendedProps: event,
      title: event.title,
      start: moment.tz(event.startTime, selectedTimezone).format(),
    }));
    return [...evts, ...hldys];
  }, [events, holidays, selectedTimezone]);

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
          <CalendarTopBar
            handleChangeViewClick={handleChangeViewClick}
            handlePrevNextClick={handlePrevNextClick}
            activeDate={activeDate}
            activeView={activeView}
          />
          <FullCalendar
            ref={calendarRef}
            headerToolbar={{
              left: "",
              center: "",
              right: "",
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
            events={calendarEvents}
            eventTimeFormat={{
              hour: "numeric",
              minute: "2-digit",
              meridiem: "short",
            }}
            eventColor={theme.palette.info.main}
            eventTextColor={theme.palette.info.contrastText}
          />
        </Grid>
        <Grid item sm={12} md={3}>
          <Events events={events} holidays={holidays} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Home;
