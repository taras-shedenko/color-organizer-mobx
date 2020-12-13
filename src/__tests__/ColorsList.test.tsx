import React from "react";
import { render, screen } from "../test-utils/custom-render";

import { ColorsList } from "../components/ColorsList";

jest.mock("../state/colorsState", () => ({
  useColorsState: () => ({
    colors: [
      {
        id: "id",
        title: "title",
        color: "color",
        rating: 3,
      },
    ],
  }),
}));

describe("component ColorsList", () => {
  it("should render properly", () => {
    expect.assertions(6);

    render(<ColorsList />);

    expect(screen.getByTestId("addcolor-toolbar")).toBeVisible();
    expect(screen.getByTestId("addcolor-color")).toBeVisible();
    expect(screen.getByTestId("addcolor-rating")).toBeVisible();

    expect(screen.getByTestId("card-toolbar")).toBeVisible();
    expect(screen.getByTestId("card-color")).toBeVisible();
    expect(screen.getByTestId("card-rating")).toBeVisible();
  });
});
