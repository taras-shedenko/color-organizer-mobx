import React from "react";
import { render } from "@testing-library/react";

import { ColorsProvider, useColors } from "../components/ColorsProvider";
import { ColorsStore } from "../state/colorsStore";

describe("component ColorsStateProvider", () => {
  it("should pass an instance of ColorsStore", () => {
    expect.assertions(1);

    const ContexTest = () => {
      expect(useColors()).toBeInstanceOf(ColorsStore);
      return <></>;
    };

    render(
      <ColorsProvider>
        <ContexTest />
      </ColorsProvider>
    );
  });
});
