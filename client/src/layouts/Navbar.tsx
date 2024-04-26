import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import EventNoteIcon from "@mui/icons-material/EventNote";
import {
  Autocomplete,
  Avatar,
  Button,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import ThemeModeSwitch from "../components/ThemeModeSwitch";
import { useGlobalContext } from "../global/GlobalContextProvider";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { convertCountryResponseToOption } from "../utils/helper";
import { TCountryCode } from "../@types/common";

export default function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const {
    user,
    logoutUser,
    availableCountries,
    availableTimezones,
    selectedCountry,
    setSelectedCountry,
    setSelectedTimezone,
    selectedTimezone,
  } = useGlobalContext();

  // country select options
  const availableCountriesOptions = React.useMemo(
    () =>
      availableCountries.map((country) =>
        convertCountryResponseToOption(country)
      ),
    [availableCountries]
  );
  const selectedCountryOption = React.useMemo(() => {
    const country =
      availableCountries.find(
        (country) => country.countryCode === selectedCountry
      ) || availableCountries[0];
    if (!country) return undefined;
    return convertCountryResponseToOption(country);
  }, [availableCountries, selectedCountry]);

  // toggle options
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  // Desktop Menu | Right hand side
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Tooltip title={user?.name || "User"}>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        id={menuId}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={logoutUser}>Logout</MenuItem>
      </Menu>
    </Tooltip>
  );

  // Mobile Menu | Right hand side
  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Stack direction={"row"} alignItems={"center"} mr={2}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="logo icon"
            >
              <EventNoteIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              Calendar
            </Typography>
          </Stack>

          <Stack direction={"row"} alignItems={"center"} spacing={4}>
            <Autocomplete
              disablePortal
              disableClearable
              autoHighlight
              value={selectedCountryOption}
              sx={{ width: 300 }}
              size="small"
              options={availableCountriesOptions}
              onChange={(event, newInputValue) => {
                if (!newInputValue) return;
                setSelectedCountry(newInputValue?.value as TCountryCode);
              }}
              renderInput={(params) => (
                <TextField {...params} label="Select Country" />
              )}
            />

            <Autocomplete
              disablePortal
              disableClearable
              autoHighlight
              value={selectedTimezone}
              sx={{ width: 300 }}
              size="small"
              options={availableTimezones}
              renderInput={(params) => (
                <TextField {...params} label="Select Timezone" />
              )}
              onInputChange={(event, newInputValue) => {
                setSelectedTimezone(newInputValue);
              }}
            />
          </Stack>

          <Box sx={{ flexGrow: 1 }} />
          <Box
            sx={{ display: { xs: "none", md: "flex", alignItems: "center" } }}
          >
            <ThemeModeSwitch />

            {user ? (
              <>
                <IconButton
                  size="large"
                  aria-label="show 17 new notifications"
                  color="inherit"
                >
                  <Badge badgeContent={17} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <Avatar
                    src={user.avatar}
                    alt="user avatar"
                    sx={{ width: 36, height: 36 }}
                  />
                </IconButton>
              </>
            ) : (
              <Stack direction={"row"} alignItems={"center"} spacing={2} ml={4}>
                {/* <ThemeModeSwitch /> */}
                <Button
                  sx={{ color: "text.primary" }}
                  variant="outlined"
                  href="/auth/sign-in"
                >
                  Login
                </Button>
                <Button
                  color="success"
                  variant="text"
                  href="/auth/register"
                  endIcon={<DoubleArrowIcon />}
                >
                  Sign up
                </Button>
              </Stack>
            )}
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
