import React from "react";
import { render, screen } from "../test-utils/custom-render";

import AppHeader from "../components/AppHeader";

describe("component AppHeader", () => {
  it("should render properly", () => {
    expect.assertions(1);

    render(<AppHeader />);

    expect(screen.getByRole("heading")).toBeVisible();
  });
});
