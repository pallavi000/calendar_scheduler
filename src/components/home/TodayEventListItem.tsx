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
import React, { useState } from "react";
import { TEvent } from "../../@types/events";
import { getTime } from "../../utils/helper";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useGlobalContext } from "../../global/GlobalContextProvider";
import moment from "moment-timezone";
import ConfirmModal from "../ConfirmModal";
import {
  apiErrorNotification,
  customSuccessNotification,
} from "../Notification";
import { deleteEventApiService } from "../../services/eventApiService";

type TodayEventListItemProps = {
  event: TEvent;
  handleEventEditClick: (event: TEvent) => void;
};

function TodayEventListItem({
  event,
  handleEventEditClick,
}: TodayEventListItemProps) {
  const { selectedTimezone } = useGlobalContext();
  const theme = useTheme();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteEvent = async () => {
    try {
      await deleteEventApiService(event.id);
      customSuccessNotification("event deleted successfully!");
    } catch (error) {
      apiErrorNotification(error);
    }
  };

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
            setIsDeleteModalOpen(true);
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
      <ConfirmModal
        title="Delete this event?"
        description="By deleting this event, it will be permanently removed from your calendar. Make sure to confirm if you want to proceed, as this action cannot be undone. Consider reviewing the details before deletion to avoid unintentional removal of important appointments or meetings."
        open={isDeleteModalOpen}
        handleClose={() => setIsDeleteModalOpen(false)}
        onSubmit={handleDeleteEvent}
      />
    </>
  );
}

export default TodayEventListItem;
