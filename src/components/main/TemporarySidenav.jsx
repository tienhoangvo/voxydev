// @mui/materials
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Box from "@mui/material/Box";

// @react
import { useCallback } from "react";

// @props-types
import PropTypes from "prop-types";

// @src/contants
import { DRAWER_WIDTH, MAIN_ROUTES } from "../../constants";

// @src/components
import HeaderToolbar from "../HeaderToolbar";
import Link from "../Link";

// @src/hooks
import useActivePath from "../../hooks/useActivePath";

const TemporarySidenav = ({ open = true, onClose }) => {
  const activePath = useActivePath({ level: 0 });

  const selectedRoute = useCallback(
    (route) => {
      return activePath === route;
    },
    [activePath]
  );

  const renderMainNavigation = () =>
    MAIN_ROUTES.map((route) => {
      return (
        <ListItemButton
          key={route.route}
          selected={selectedRoute(route.route)}
          component={Link}
          href={route.route}
          noLinkStyle
          disableRipple
          sx={{
            pl: "1.5rem",
            pr: "1.5rem",
          }}
          onClick={onClose}
        >
          <ListItemIcon
            sx={{
              mr: "1.5rem",
              minWidth: "unset",
            }}
          >
            {route.icon}
          </ListItemIcon>
          <ListItemText
            primary={route.label}
            primaryTypographyProps={{
              sx: {
                fontWeight: 500,
                fontSize: "0.875rem",
              },
            }}
          />
        </ListItemButton>
      );
    });

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
      }}
      PaperProps={{
        sx: {
          width: DRAWER_WIDTH,
          boxSizing: "border-box",
        },
      }}
    >
      <HeaderToolbar />
      <Box sx={{ overflowY: "auto", overflowX: "hidden" }}>
        <List disablePadding component={"nav"}>
          {renderMainNavigation()}
        </List>
      </Box>
    </Drawer>
  );
};

TemporarySidenav.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default TemporarySidenav;
