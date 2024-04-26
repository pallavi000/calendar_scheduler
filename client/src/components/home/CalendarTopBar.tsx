import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Button, ButtonGroup, Stack, Typography } from "@mui/material";
import moment from "moment-timezone";
import { TCalendarNavText, TCalendarView } from "../../@types/common";

type CalendarTopBarProps = {
  handlePrevNextClick: (action: TCalendarNavText) => void;
  handleChangeViewClick: (view: TCalendarView) => void;
  activeDate: string;
  activeView: TCalendarView;
};

function CalendarTopBar({
  handleChangeViewClick,
  handlePrevNextClick,
  activeDate,
  activeView,
}: CalendarTopBarProps) {
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <ButtonGroup variant="contained">
        <Button
          onClick={() => handlePrevNextClick("prev")}
          startIcon={<ChevronLeft />}
        >
          Prev
        </Button>
        <Button
          onClick={() => handlePrevNextClick("next")}
          endIcon={<ChevronRight />}
        >
          Next
        </Button>
      </ButtonGroup>
      <Typography variant="h3">
        {moment.utc(activeDate).format("MMMM YYYY").toString()}
      </Typography>
      <ButtonGroup variant="contained" color="primary">
        <Button
          onClick={() => handleChangeViewClick("dayGridMonth")}
          disabled={activeView === "dayGridMonth"}
        >
          Month
        </Button>
        <Button
          onClick={() => handleChangeViewClick("timeGridWeek")}
          disabled={activeView === "timeGridWeek"}
        >
          Week
        </Button>
        <Button
          onClick={() => handleChangeViewClick("timeGridDay")}
          disabled={activeView === "timeGridDay"}
        >
          Day
        </Button>
        <Button
          onClick={() => handleChangeViewClick("list")}
          disabled={activeView === "list"}
        >
          List
        </Button>
      </ButtonGroup>
    </Stack>
  );
}

export default CalendarTopBar;
