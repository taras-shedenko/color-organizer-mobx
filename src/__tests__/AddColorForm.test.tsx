import React from "react";
import userEvent from "@testing-library/user-event";
import { render, screen } from "../test-utils/custom-render";

import AddColorForm from "../components/AddColorForm";

const mockAddColor = jest.fn();

jest.mock("../state/colorsState", () => ({
  useColorsState: () => ({
    addColor: mockAddColor,
  }),
}));

describe("component AddColorForm", () => {
  beforeEach(() => {
    mockAddColor.mockReset();
  });

  it("should render properly", () => {
    expect.assertions(5);

    render(<AddColorForm />);

    expect(screen.getByTestId("addcolor-toolbar")).toBeVisible();
    expect(screen.getByRole("textbox")).toBeVisible();
    expect(screen.getByRole("button")).toBeVisible();
    expect(screen.getByTestId("addcolor-color")).toBeVisible();
    expect(screen.getByTestId("addcolor-rating")).toBeVisible();
  });

  it("should call addColor when plus button clicked", () => {
    expect.assertions(2);

    render(<AddColorForm />);
    userEvent.type(screen.getByRole("textbox"), "color");
    userEvent.click(screen.getByRole("radio", { name: /2 stars/i }));
    userEvent.click(screen.getByRole("button"));

    expect(mockAddColor).toHaveBeenCalledTimes(1);
    expect(mockAddColor).toHaveBeenCalledWith("color", "#FFFFFF", 2);
  });

  it("should call addColor when enter pressed in name input", () => {
    expect.assertions(2);

    render(<AddColorForm />);
    userEvent.click(screen.getByRole("radio", { name: /4 stars/i }));
    userEvent.type(screen.getByRole("textbox"), "color{enter}");

    expect(mockAddColor).toHaveBeenCalledTimes(1);
    expect(mockAddColor).toHaveBeenCalledWith("color", "#FFFFFF", 4);
  });

  it("should not call addColor if name is empty", () => {
    expect.assertions(1);

    render(<AddColorForm />);
    userEvent.type(screen.getByRole("textbox"), "{enter}");

    expect(mockAddColor).toHaveBeenCalledTimes(0);
  });

  it("should show ColorPicker", async () => {
    expect.assertions(1);

    render(<AddColorForm />);
    userEvent.click(screen.getByTestId("addcolor-color"));

    expect(screen.getByRole("tooltip")).toBeVisible();
  });
});
