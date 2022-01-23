/**
 * Implemantation of the application state provider
 * uses React Context
 */
import React, { createContext, useContext } from "react";
import { ColorsStore } from "../state/colorsStore";

/**
 * React Context for the application state
 */
const ColorsContext = createContext<ColorsStore>(
  null as unknown as ColorsStore
);

/**
 * Component-provider of the application state
 */
interface ColorsProviderProps {
  children: React.ReactNode;
}

export function ColorsProvider({ children }: ColorsProviderProps) {
  return (
    <ColorsContext.Provider value={new ColorsStore()}>
      {children}
    </ColorsContext.Provider>
  );
}
/**
 * Helper to get state's API from Context
 */
export const useColors = () => useContext(ColorsContext);
