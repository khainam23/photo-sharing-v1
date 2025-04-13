import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import "./styles.css";
import models from "../../modelData/models";

/**
 * Define TopBar, a React component of Project 4.
 */
function TopBar() {
  const location = useLocation();

  const getContext = () => {
    let context = "";

    if (!location || !location.pathname) {
      return context;
    }

    const path = location.pathname;

    if (path.includes("/users/") && path !== "/users") {
      const userId = path.split("/").pop();
      if (userId) {
        const user = models.userModel(userId);
        if (user) {
          context = `${user.first_name} ${user.last_name}`;
        }
      }
    } else if (path.includes("/photos/")) {
      const userId = path.split("/").pop();
      if (userId) {
        const user = models.userModel(userId);
        if (user) {
          context = `Photos of ${user.first_name} ${user.last_name}`;
        }
      }
    }

    return context;
  };

  const context = getContext();

  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar>
        <Typography variant="h5" color="inherit">
          [Nguyen Tuan Hung B22DCCN416]
        </Typography>
        <div className="topbar-right">
          {context && (
            <Typography variant="h5" color="inherit">
              {context}
            </Typography>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
