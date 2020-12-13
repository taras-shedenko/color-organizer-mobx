/**
 * Man Application's component
 * Adds state to the context
 * renders header and colors list
 */
import React, { FunctionComponent } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Container from "@material-ui/core/Container";

import AppHeader from "./AppHeader";
import { ColorsStateProvider } from "./ColorsStateProvider";
import ColorsList from "./ColorsList";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(9),
    [theme.breakpoints.down("xs")]: {
      marginTop: theme.spacing(8),
    },
  },
}));

export const MainApp: FunctionComponent = () => {
  const classes = useStyles();

  return (
    <>
      <AppHeader />
      <ColorsStateProvider>
        <Container className={classes.container}>
          <ColorsList />
        </Container>
      </ColorsStateProvider>
    </>
  );
};

export default MainApp;
