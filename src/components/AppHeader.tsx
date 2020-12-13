/**
 * Header of the application
 */
import React, { FunctionComponent } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  typography: {
    flexGrow: 1,
  },
});

export const AppHeader: FunctionComponent = () => {
  const classes = useStyles();

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h5" align="center" className={classes.typography}>
          Color Organizer
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
