import React, { FunctionComponent, ReactElement } from "react";
import { render, RenderOptions, RenderResult } from "@testing-library/react";

import { ColorsStateProvider } from "../components/ColorsStateProvider";

// eslint-disable-next-line react/prop-types
const CustomWrapper: FunctionComponent = ({ children }) => (
  <ColorsStateProvider>{children}</ColorsStateProvider>
);

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "queries">
): RenderResult => render(ui, { wrapper: CustomWrapper, ...options });

export * from "@testing-library/react";

export { customRender as render };
