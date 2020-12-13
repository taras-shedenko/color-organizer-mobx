import React from "react";
import { render, screen } from "@testing-library/react";

import {
  ColorsStateProvider,
  useColors,
} from "../components/ColorsStateProvider";
import { useColorsState } from "../state/colorsState";

jest.mock("../state/colorsState", () => ({
  useColorsState: jest.fn(),
}));

describe("component ColorsStateProvider", () => {
  beforeEach(() => {
    (useColorsState as jest.Mock).mockReset();
  });

  it("should pass a value through the context", () => {
    expect.assertions(1);

    (useColorsState as jest.Mock).mockReturnValue("Colors State");

    const ContexTest = () => <div>{useColors()}</div>;

    render(
      <ColorsStateProvider>
        <ContexTest />
      </ColorsStateProvider>
    );
    expect(screen.getByText("Colors State")).toBeVisible();
  });
});
