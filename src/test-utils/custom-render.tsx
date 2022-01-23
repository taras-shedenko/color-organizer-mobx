import React from "react";
import { render, RenderOptions, RenderResult } from "@testing-library/react";

import { ColorsProvider } from "../components/ColorsProvider";

// eslint-disable-next-line react/prop-types
interface CustomWrapperProps {
  children: React.ReactNode;
}

function CustomWrapper({ children }: CustomWrapperProps) {
  return <ColorsProvider>{children}</ColorsProvider>;
}
const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "queries">
): RenderResult => render(ui, { wrapper: CustomWrapper, ...options });

export * from "@testing-library/react";

export { customRender as render };
