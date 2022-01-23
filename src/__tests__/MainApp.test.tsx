import React from "react";
import { render, screen } from "../test-utils/custom-render";

import MainApp from "../components/MainApp";

localStorage["color-organizer"] = JSON.stringify([
  {
    id: "id",
    title: "title",
    color: "color",
    rating: 1,
  },
]);

describe("component MainApp", () => {
  it("should render properly", () => {
    expect.assertions(3);

    render(<MainApp />);

    expect(screen.getByText("Color Organizer")).toBeVisible();
    expect(screen.getByTestId("addcolor-toolbar")).toBeVisible();
    expect(screen.getByTestId("card-toolbar")).toBeVisible();
  });
});
