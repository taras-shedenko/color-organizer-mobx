/**
 * Main Application's component
 * Adds state to the context
 * renders header and colors list
 */
import React from "react";
import Container from "@mui/material/Container";

import AppHeader from "./AppHeader";
import ColorsList from "./ColorsList";

export default function MainApp() {
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
      <Container sx={styles.container}>
        <ColorsList />
      </Container>
    </>
  );
}
