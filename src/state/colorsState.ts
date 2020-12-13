// Implemantation of the application's state

import { useReducer } from "react";
import { v4 } from "uuid";

import {
  Color,
  AddColorAction,
  RateColorAction,
  DeleteColorAction,
  ColorActions,
  ColorsStateApi,
} from "./types";

/**
 * Add Color reducer
 * @param colors - current Colors list
 * @param action - action object
 */
export const addColor = (colors: Color[], action: AddColorAction): Color[] => [
  ...colors,
  {
    id: v4(),
    title: action.title,
    color: action.color,
    rating: action.rating,
  },
];

/**
 * Rate Color reducer
 * @param colors - current Colors list
 * @param action - action object
 */
export const rateColor = (colors: Color[], action: RateColorAction): Color[] =>
  colors.map((color) =>
    color.id == action.id ? { ...color, rating: action.rating } : color
  );

/**
 * Delete Color reducer
 * @param colors - current Colors list
 * @param action - action object
 */
export const deleteColor = (
  colors: Color[],
  action: DeleteColorAction
): Color[] => colors.filter((color) => color.id != action.id);

/**
 * Reducer implementation
 * @param state - current state
 * @param action - action to perform
 */
export const colorsReducer = (
  state: Color[],
  action: ColorActions
): Color[] => {
  switch (action.type) {
    case "ADD_COLOR":
      return addColor(state, action);
    case "RATE_COLOR":
      return rateColor(state, action);
    case "DELETE_COLOR":
      return deleteColor(state, action);
    default:
      return state;
  }
};

/**
 * A wrapper function which saves reducer's result to the LocalStorage
 * @param state - current state to send to the reducer
 * @param action - action to perform to send to the reducer
 */
export const colorsReducerWithStorage = (
  state: Color[],
  action: ColorActions
): Color[] => {
  const newState = colorsReducer(state, action);
  localStorage.setItem("color-organizer", JSON.stringify(newState));
  return newState;
};

/**
 * Get inititial state from the LocalStorage
 */
const initialState: Color[] =
  JSON.parse(String(localStorage.getItem("color-organizer"))) || [];

/**
 * State's API
 * state itself and action creators
 */
export const useColorsState = (): ColorsStateApi => {
  const [state, dispatch] = useReducer(colorsReducerWithStorage, initialState);

  const dispachAddColor = (
    title: string,
    color: string,
    rating: number
  ): void =>
    dispatch({
      type: "ADD_COLOR",
      title,
      color,
      rating,
    });

  const dispatchRateColor = (id: string, rating: number): void =>
    dispatch({
      type: "RATE_COLOR",
      id,
      rating,
    });

  const dispatchDeleteColor = (id: string): void =>
    dispatch({
      type: "DELETE_COLOR",
      id,
    });

  return {
    colors: state,
    addColor: dispachAddColor,
    rateColor: dispatchRateColor,
    deleteColor: dispatchDeleteColor,
  };
};
