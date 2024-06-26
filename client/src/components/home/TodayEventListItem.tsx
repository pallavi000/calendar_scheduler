import React from "react";

// icons
import {
  Delete,
  Edit,
  NotificationsActive,
  RemoveRedEye,
} from "@mui/icons-material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

// mui
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

// helpers
import { getTime } from "../../utils/helper";

// context
import { useGlobalContext } from "../../global/GlobalContextProvider";

// types
import { TEvent } from "../../@types/events";

type TodayEventListItemProps = {
  event: TEvent;
  handleEventViewClick: (event: TEvent) => void;
  handleEventEditClick: (event: TEvent) => void;
  handleEventDeleteClick: (event: TEvent) => void;
};

function TodayEventListItem({
  event,
  handleEventViewClick,
  handleEventEditClick,
  handleEventDeleteClick,
}: TodayEventListItemProps) {
  const { selectedTimezone } = useGlobalContext();
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <ListItem
        secondaryAction={
          event.type !== "holiday" ? (
            <IconButton onClick={handleClick}>
              <MoreVertIcon />
            </IconButton>
          ) : null
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
            <ListItemText
              primary={event.title}
              secondary={event.type ? event.type : ""}
            />
          )}
        </ListItemButton>
      </ListItem>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem
          onClick={() => {
            handleClose();
            handleEventViewClick(event);
          }}
        >
          <ListItemIcon>
            <RemoveRedEye fontSize="small" />
          </ListItemIcon>
          <ListItemText primaryTypographyProps={{ fontSize: 14 }}>
            View
          </ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            handleEventEditClick(event);
          }}
        >
          <ListItemIcon>
            <Edit fontSize="small" />
          </ListItemIcon>
          <ListItemText primaryTypographyProps={{ fontSize: 14 }}>
            Edit
          </ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            handleEventDeleteClick(event);
          }}
        >
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
