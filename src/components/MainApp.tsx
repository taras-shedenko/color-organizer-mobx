/**
 * Main Application's component
 * Adds state to the context
 * renders header and colors list
 */
import React, { FunctionComponent } from "react";
import Container from "@mui/material/Container";

import AppHeader from "./AppHeader";
import { ColorsStateProvider } from "./ColorsStateProvider";
import ColorsList from "./ColorsList";

export const MainApp: FunctionComponent = () => {
  // Component's style adjustments
  const styles = {
    container: {
      marginTop: {
        xs: 8,
        sm: 9,
      },
    },
  };

  return (
    <>
      <AppHeader />
      <ColorsStateProvider>
        <Container sx={styles.container}>
          <ColorsList />
        </Container>
      </ColorsStateProvider>
    </>
  );
};

export default MainApp;
