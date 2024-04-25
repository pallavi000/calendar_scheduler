import { NotificationsActive } from "@mui/icons-material";
import {
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import React from "react";
import { TEvent } from "../../@types/events";
import { getTime } from "../../utils/helper";

type TodayEventListItemProps = {
  event: TEvent;
};

function TodayEventListItem({ event }: TodayEventListItemProps) {
  const theme = useTheme();

  return (
    <ListItem>
      <ListItemButton>
        <ListItemIcon>
          <IconButton
            sx={{
              background: theme.palette.info.main,
              color: theme.palette.info.contrastText,
              ":hover": {
                background: theme.palette.info.main,
                color: theme.palette.info.contrastText,
              },
            }}
          >
            <NotificationsActive />
          </IconButton>
        </ListItemIcon>
        {event.end ? (
          <ListItemText
            primary={event.title}
            secondary={`${getTime(new Date(event.start))}-${getTime(
              new Date(event.end)
            )}`}
            secondaryTypographyProps={{
              color: theme.palette.info.main,
            }}
          />
        ) : (
          <ListItemText primary={event.title} />
        )}
      </ListItemButton>
    </ListItem>
  );
}

export default TodayEventListItem;
