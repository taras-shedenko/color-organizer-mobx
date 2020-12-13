/**
 * Component to add color item
 */
import React, { useRef, useState, FunctionComponent } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Toolbar from "@material-ui/core/Toolbar";
import Input from "@material-ui/core/Input";
import IconButton from "@material-ui/core/IconButton";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import { ChromePicker } from "react-color";
import Rating from "@material-ui/lab/Rating";

import { useColors } from "./ColorsStateProvider";

/**
 * Styles for the AddColorForm component
 */
const usesStyles = makeStyles((theme) => ({
  toolbar: {
    display: "flex",
  },
  textField: {
    flexGrow: 1,
  },
  addButton: {
    marginRight: -theme.spacing(3),
  },
  paper: {
    height: theme.spacing(12),
    backgroundColor: ({ color }: { color: string }) => color,
  },
  rating: {
    paddingTop: theme.spacing(2),
  },
}));

export const AddColorForm: FunctionComponent = () => {
  // Compoent's state holds name, color and rating values
  const [name, setName] = useState("");
  const [color, setColor] = useState("#FFFFFF");
  const [rating, setRating] = useState(0);
  const [isOpen, setOpen] = useState(false);

  // Anchor element for the color picker popper
  const anchorEl = useRef<HTMLElement>(null);

  // Get state's API
  const { addColor } = useColors();

  // Submit color function
  const submitColor = () => {
    if (name.length > 0) {
      addColor(name, color, rating);
      setName("");
      setColor("#FFFFFF");
      setRating(0);
      setOpen(false);
    }
  };

  const classes = usesStyles({ color });

  return (
    <Card>
      <CardContent>
        <Toolbar className={classes.toolbar} data-testid="addcolor-toolbar">
          <Input
            value={name}
            className={classes.textField}
            onChange={(e) => setName(e.currentTarget.value)}
            inputProps={{
              onKeyPress: (e) =>
                /* istanbul ignore next */
                e.key == "Enter" ? submitColor() : null,
            }}
          />
          <IconButton
            disabled={name.length == 0}
            className={classes.addButton}
            onClick={submitColor}
          >
            <AddCircleOutlineIcon />
          </IconButton>
        </Toolbar>
        <Paper
          elevation={4}
          ref={anchorEl}
          className={classes.paper}
          onClick={() => setOpen(!isOpen)}
          data-testid="addcolor-color"
        />
        <Popper open={isOpen} anchorEl={anchorEl.current}>
          <ChromePicker
            color={color}
            disableAlpha
            onChangeComplete={
              /* istanbul ignore next */
              (color) => setColor(color.hex)
            }
          />
        </Popper>
        <Rating
          name="color-rating-new"
          value={rating}
          size="large"
          className={classes.rating}
          onChange={(e, v) => setRating(Number(v))}
          data-testid="addcolor-rating"
        />
      </CardContent>
    </Card>
  );
};

export default AddColorForm;
