// Type definitions for the state implementation

// Color type
export type Color = {
  id: string;
  title: string;
  color: string;
  rating: number;
};

// Type of the Add Color action
export type AddColorAction = {
  type: "ADD_COLOR";
  title: string;
  color: string;
  rating: number;
};

// Type of the Rate Color action
export type RateColorAction = {
  type: "RATE_COLOR";
  id: string;
  rating: number;
};

// Type of the Delete Color action
export type DeleteColorAction = {
  type: "DELETE_COLOR";
  id: string;
};

// Union type of all Color actions
export type ColorActions = AddColorAction | RateColorAction | DeleteColorAction;

/**
 * API of the Color State
 * @colors - current state
 * @addColor - add a color to the state
 * @setRating - set color's rating
 * @deleteColor - remove a color from the state
 */
export type ColorsStateApi = {
  colors: Color[];
  addColor: (title: string, color: string, rating: number) => void;
  rateColor: (id: string, rating: number) => void;
  deleteColor: (id: string) => void;
};
