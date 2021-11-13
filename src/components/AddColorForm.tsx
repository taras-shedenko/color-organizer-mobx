/**
 * Component to add color item
 */
import React, { useRef, useState, FunctionComponent } from "react";
import { Theme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Toolbar from "@mui/material/Toolbar";
import Input from "@mui/material/Input";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import { ChromePicker } from "react-color";
import Rating from "@mui/material/Rating";

import { useColors } from "./ColorsStateProvider";

export const AddColorForm: FunctionComponent = () => {
  // Compoent's state holds name, color and rating values
  const [name, setName] = useState("");
  const [color, setColor] = useState("#FFFFFF");
  const [rating, setRating] = useState(0);
  const [isOpen, setOpen] = useState(false);

  // Anchor element for the color picker popper
  const anchorEl = useRef<HTMLDivElement>(null);

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

  // Component's style adjustments
  const styles = {
    toolbar: {
      display: "flex",
    },
    textField: {
      flexGrow: 1,
    },
    addButton: {
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
        <Toolbar sx={styles.toolbar} data-testid="addcolor-toolbar">
          <Input
            value={name}
            sx={styles.textField}
            onChange={(e) => setName(e.currentTarget.value)}
            inputProps={{
              onKeyPress: (e) =>
                /* istanbul ignore next */
                e.key == "Enter" ? submitColor() : null,
            }}
          />
          <IconButton
            disabled={name.length == 0}
            sx={styles.addButton}
            onClick={submitColor}
          >
            <AddCircleOutlineIcon />
          </IconButton>
        </Toolbar>
        <Paper
          elevation={4}
          ref={anchorEl}
          sx={styles.paper}
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
          sx={styles.rating}
          onChange={(...[, value]) => setRating(Number(value))}
          data-testid="addcolor-rating"
        />
      </CardContent>
    </Card>
  );
};

export default AddColorForm;
