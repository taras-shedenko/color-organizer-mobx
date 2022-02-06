/**
 * Component to add color item
 */
import React, { useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
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

import { useColors } from "./ColorsProvider";

type FormValues = {
  name: string;
  color: string;
  rating: number;
};

export default function AddColorForm() {
  // Compoent's state holds name, color and rating values
  const [isColorPickerOpen, setColorPickerOpen] = useState(false);

  // Anchor element for the color picker popper
  const anchorEl = useRef<HTMLDivElement>(null);

  // Get state's API
  const { add } = useColors();

  const { control, handleSubmit, reset } = useForm<FormValues>();

  const onSubmit = ({ name, color, rating }: FormValues) => {
    add(name, color, rating);
    reset();
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
    },
    rating: {
      paddingTop: 2,
    },
  };

  return (
    <Card>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Toolbar sx={styles.toolbar} data-testid="addcolor-toolbar">
            <Controller
              name="name"
              control={control}
              defaultValue=""
              rules={{ required: "true" }}
              render={({ field, fieldState: { invalid } }) => (
                <Input {...field} error={invalid} sx={styles.textField} />
              )}
            />

            <IconButton type="submit" sx={styles.addButton}>
              <AddCircleOutlineIcon />
            </IconButton>
          </Toolbar>

          <Controller
            name="color"
            control={control}
            defaultValue="#FFF"
            render={({ field: { value, onChange } }) => (
              <>
                <Paper
                  elevation={4}
                  ref={anchorEl}
                  sx={{ ...styles.paper, backgroundColor: value }}
                  onClick={() => setColorPickerOpen(!isColorPickerOpen)}
                  data-testid="addcolor-color"
                />

                <Popper open={isColorPickerOpen} anchorEl={anchorEl.current}>
                  <ChromePicker
                    disableAlpha
                    color={value}
                    onChangeComplete={
                      /* istanbul ignore next */
                      ({ hex }) => onChange(hex)
                    }
                  />
                </Popper>
              </>
            )}
          />

          <Controller
            name="rating"
            control={control}
            defaultValue={0}
            render={({ field: { value, onChange } }) => (
              <Rating
                value={value}
                onChange={(...[, value]) => onChange(value)}
                size="large"
                sx={styles.rating}
                data-testid="addcolor-rating"
              />
            )}
          />
        </form>
      </CardContent>
    </Card>
  );
}
