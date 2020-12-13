import React from "react";
import userEvent from "@testing-library/user-event";
import { render, screen } from "../test-utils/custom-render";

import ColorCard from "../components/ColorCard";

const mockDeleteColor = jest.fn();
const mockRateColor = jest.fn();

jest.mock("../state/colorsState", () => ({
  useColorsState: () => ({
    deleteColor: mockDeleteColor,
    rateColor: mockRateColor,
  }),
}));

describe("component ColorCard", () => {
  beforeEach(() => {
    mockDeleteColor.mockReset();
    mockRateColor.mockReset();
  });

  it("should render properly", () => {
    expect.assertions(5);

    render(<ColorCard id="id" title="color" color="red" rating={5} />);

    expect(screen.getByTestId("card-toolbar")).toBeVisible();
    expect(screen.getByRole("heading", { name: "color" })).toBeVisible();
    expect(screen.getByRole("button")).toBeVisible();
    expect(screen.getByTestId("card-color")).toBeVisible();
    expect(screen.getByTestId("card-rating")).toBeVisible();
  });

  it("should call deleteColor when delete button is clicked", () => {
    expect.assertions(3);

    render(<ColorCard id="id" title="color" color="red" rating={5} />);
    userEvent.click(screen.getByRole("button"));

    expect(mockDeleteColor).toHaveBeenCalledTimes(1);
    expect(mockDeleteColor).toHaveBeenCalledWith("id");
    expect(mockRateColor).toHaveBeenCalledTimes(0);
  });

  it("should call rateColor what rating icon iss clicked", () => {
    expect.assertions(3);

    render(<ColorCard id="id" title="color" color="red" rating={5} />);
    userEvent.click(screen.getByRole("radio", { name: /1 star/i }));

    expect(mockDeleteColor).toHaveBeenCalledTimes(0);
    expect(mockRateColor).toHaveBeenCalledTimes(1);
    expect(mockRateColor).toHaveBeenCalledWith("id", 1);
  });
});
