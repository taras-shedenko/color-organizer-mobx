import React from "react";
import userEvent from "@testing-library/user-event";
import { render, screen } from "../test-utils/custom-render";

import { Color } from "../state/colorsStore";
import ColorCard from "../components/ColorCard";

const mockRemove = jest.fn();
const mockRate = jest.fn();

jest.mock("../state/colorsStore", () => ({
  Color: jest.fn().mockImplementation((v) => ({ ...v, rate: mockRate })),
  ColorsStore: jest.fn().mockImplementation(() => ({
    remove: mockRemove,
  })),
}));

describe("component ColorCard", () => {
  beforeEach(() => {
    mockRemove.mockReset();
    mockRate.mockReset();
  });

  it("should render properly", () => {
    expect.assertions(5);

    render(
      <ColorCard
        color={new Color({ id: "id", title: "color", color: "red", rating: 5 })}
      />
    );

    expect(screen.getByTestId("card-toolbar")).toBeVisible();
    expect(screen.getByRole("heading", { name: "color" })).toBeVisible();
    expect(screen.getByRole("button")).toBeVisible();
    expect(screen.getByTestId("card-color")).toBeVisible();
    expect(screen.getByTestId("card-rating")).toBeVisible();
  });

  it("should call remove when delete button is clicked", () => {
    expect.assertions(2);

    render(
      <ColorCard
        color={new Color({ id: "id", title: "color", color: "red", rating: 5 })}
      />
    );
    userEvent.click(screen.getByRole("button"));

    expect(mockRemove).toHaveBeenCalledTimes(1);
    expect(mockRate).toHaveBeenCalledTimes(0);
  });

  it("should call rate when rating icon was clicked", () => {
    expect.assertions(2);

    render(
      <ColorCard
        color={new Color({ id: "id", title: "color", color: "red", rating: 5 })}
      />
    );
    userEvent.click(screen.getByRole("radio", { name: /1 star/i }));

    expect(mockRemove).toHaveBeenCalledTimes(0);
    expect(mockRate).toHaveBeenCalledTimes(1);
  });
});
