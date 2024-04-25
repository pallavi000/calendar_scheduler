import { Container } from "@mui/material";
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

function Home() {
  const [events, setEvents] = useState<TEvent[]>([]);

  // get holidays
  const getHolidays = async () => {
    try {
      const data: TPublicHolidayInputData = {
        countryIsoCode: "US",
      };
      const response = await getHolidaysApiService(data);
      const evts = convertPublicHolidaysToEvents(response.data);
      setEvents(evts);
    } catch (error) {
      apiErrorNotification(error);
    }
  };
  useEffect(() => {
    getHolidays();
  }, []);

  return (
    <Container sx={{ py: 6 }}>
      <FullCalendar
        themeSystem="dark"
        headerToolbar={{
          left: "prev,next",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay,list",
        }}
        plugins={[interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin]}
        droppable={true}
        events={events}
      />
    </Container>
  );
}

export default Home;
