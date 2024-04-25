import { Delete, Edit, NotificationsActive } from "@mui/icons-material";
import {
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  useTheme,
} from "@mui/material";
import React from "react";
import { TEvent } from "../../@types/events";
import { getTime } from "../../utils/helper";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useGlobalContext } from "../../global/GlobalContextProvider";
import moment from "moment-timezone";

type TodayEventListItemProps = {
  event: TEvent;
};

function TodayEventListItem({ event }: TodayEventListItemProps) {
  const { selectedTimezone } = useGlobalContext();
  console.log(
    new Date(moment.tz(event.startTime, selectedTimezone).format()),
    "-------------",
    new Date()
  );
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEventEdit = () => {};

  const handleDeleteEvent = () => {};

  return (
    <>
      <ListItem
        secondaryAction={
          <IconButton onClick={handleClick}>
            <MoreVertIcon />
          </IconButton>
        }
      >
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
          {event.endTime ? (
            <ListItemText
              primary={event.title}
              secondary={`${getTime(
                new Date(event.startTime),
                selectedTimezone
              )} - ${getTime(new Date(event.endTime), selectedTimezone)}`}
              secondaryTypographyProps={{
                color: theme.palette.info.main,
              }}
            />
          ) : (
            <ListItemText primary={event.title} />
          )}
        </ListItemButton>
      </ListItem>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem>
          <ListItemIcon>
            <Edit fontSize="small" />
          </ListItemIcon>
          <ListItemText primaryTypographyProps={{ fontSize: 14 }}>
            Edit
          </ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Delete fontSize="small" />
          </ListItemIcon>
          <ListItemText primaryTypographyProps={{ fontSize: 14 }}>
            Delete
          </ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}

export default TodayEventListItem;
