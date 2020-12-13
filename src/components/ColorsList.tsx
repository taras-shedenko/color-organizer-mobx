/**
 * List of the colors
 * adds AddColorForm as first item
 */
import React, { FunctionComponent } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import AddColorForm from "./AddColorForm";
import ColorCard from "./ColorCard";
import { useColors } from "./ColorsStateProvider";

const useStyles = makeStyles((theme) => ({
  item: {
    padding: theme.spacing(1),
  },
}));

export const ColorsList: FunctionComponent = () => {
  const classes = useStyles();

  // Get colors list from the state's API
  const { colors } = useColors();

  return (
    <Grid container>
      <Grid
        item
        key="new-color-form"
        xs={12}
        sm={6}
        md={3}
        className={classes.item}
      >
        <AddColorForm />
      </Grid>
      {colors.map(({ id, title, color, rating }) => (
        <Grid item key={id} xs={12} sm={6} md={3} className={classes.item}>
          <ColorCard id={id} title={title} color={color} rating={rating} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ColorsList;
