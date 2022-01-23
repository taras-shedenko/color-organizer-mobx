/**
 * List of the colors
 * adds AddColorForm as first item
 */
import React from "react";
import { observer } from "mobx-react-lite";
import Grid from "@mui/material/Grid";
import AddColorForm from "./AddColorForm";
import ColorCard from "./ColorCard";
import { useColors } from "./ColorsProvider";

export default observer(function ColorsList() {
  // Get colors list from the state's API
  const { colors } = useColors();

  // Styles for the AddColorForm component
  const styles = {
    item: {
      padding: 1,
    },
  };

  return (
    <Grid container>
      <Grid item key="new-color-form" xs={12} sm={6} md={3} sx={styles.item}>
        <AddColorForm />
      </Grid>
      {colors.map((color) => (
        <Grid item key={color.id} xs={12} sm={6} md={3} sx={styles.item}>
          <ColorCard color={color} />
        </Grid>
      ))}
    </Grid>
  );
});
