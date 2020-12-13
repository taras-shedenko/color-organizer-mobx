/**
 * Implemantation of the application state provider
 * uses React Context
 */
import React, { FunctionComponent, createContext, useContext } from "react";
import { ColorsStateApi } from "../state/types";
import { useColorsState } from "../state/colorsState";

/**
 * React Context for the application state
 */
const ColorsContext = createContext(
  null as unknown as ReturnType<typeof useColorsState>
);

/**
 * Component-provider of the application state
 */
// eslint-disable-next-line react/prop-types
export const ColorsStateProvider: FunctionComponent = ({ children }) => {
  const colorsState = useColorsState();

  return (
    <ColorsContext.Provider value={colorsState}>
      {children}
    </ColorsContext.Provider>
  );
};

/**
 * Helper to get state's API from Context
 */
export const useColors = (): ColorsStateApi => useContext(ColorsContext);
