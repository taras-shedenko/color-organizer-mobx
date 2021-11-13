/**
 * List of the colors
 * adds AddColorForm as first item
 */
import React, { FunctionComponent } from "react";
import Grid from "@mui/material/Grid";
import AddColorForm from "./AddColorForm";
import ColorCard from "./ColorCard";
import { useColors } from "./ColorsStateProvider";

export const ColorsList: FunctionComponent = () => {
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
      {colors.map(({ id, title, color, rating }) => (
        <Grid item key={id} xs={12} sm={6} md={3} sx={styles.item}>
          <ColorCard id={id} title={title} color={color} rating={rating} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ColorsList;
