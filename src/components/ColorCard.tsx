/**
 * Component to render a color item
 * deletes it and sets its rating
 */
import React, { FunctionComponent } from "react";
import { Theme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Paper from "@mui/material/Paper";
import Rating from "@mui/material/Rating";
import { useColors } from "./ColorsStateProvider";

/**
 * Props of the ColorCard component
 */
type ColorCardProps = {
  id: string;
  title: string;
  color: string;
  rating: number;
};

export const ColorCard: FunctionComponent<ColorCardProps> = (
  props: ColorCardProps
) => {
  const { id, title, color, rating } = props;

  // Get state's API
  const { deleteColor, rateColor } = useColors();

  // Create event handlers
  const onDelete = () => deleteColor(id);
  const onRate = (rate: number) => rateColor(id, rate);

  // Component's style adjustments
  const styles = {
    toolbar: {
      display: "flex",
    },
    title: {
      flexGrow: 1,
    },
    deleteButton: {
      marginRight: -3,
    },
    paper: {
      height: (theme: Theme) => theme.spacing(12),
      backgroundColor: color,
    },
    rating: {
      paddingTop: 2,
    },
  };

  return (
    <Card>
      <CardContent>
        <Toolbar sx={styles.toolbar} data-testid="card-toolbar">
          <Typography variant="h6" sx={styles.title}>
            {title}
          </Typography>
          <IconButton sx={styles.deleteButton} onClick={onDelete}>
            <DeleteIcon />
          </IconButton>
        </Toolbar>
        <Paper elevation={4} sx={styles.paper} data-testid="card-color" />
        <Rating
          name={`color-rating-${id}`}
          size="large"
          value={rating}
          sx={styles.rating}
          onChange={(...[, value]) => value !== null && onRate(value)}
          data-testid="card-rating"
        />
      </CardContent>
    </Card>
  );
};

export default ColorCard;
