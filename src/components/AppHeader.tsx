/**
 * Header of the application
 */
import React, { FunctionComponent } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export const AppHeader: FunctionComponent = () => {
  // Component's style adjustments
  const styles = {
    typography: {
      flexGrow: 1,
    },
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h5" align="center" sx={styles.typography}>
          Color Organizer
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
