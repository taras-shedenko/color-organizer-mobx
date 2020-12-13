import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as state from "../state/colorsState";
import * as Types from "../state/types";

jest.mock("uuid", () => ({
  v4: jest.fn().mockReturnValue("mock-id"),
}));

const initialState = [
  {
    id: "initial",
    title: "color",
    color: "#FFFFFF",
    rating: 1,
  },
];

describe("colors state", () => {
  describe("reducer addColor", () => {
    it("should add color", () => {
      expect.assertions(1);

      const newState = state.addColor(initialState, {
        type: "ADD_COLOR",
        title: "new-color",
        color: "#000000",
        rating: 3,
      });

      expect(newState).toStrictEqual([
        {
          id: "initial",
          title: "color",
          color: "#FFFFFF",
          rating: 1,
        },
        {
          id: "mock-id",
          title: "new-color",
          color: "#000000",
          rating: 3,
        },
      ]);
    });
  });

  describe("reducer rateColor", () => {
    it("should rate an exsisting color", () => {
      expect.assertions(1);

      const newState = state.rateColor(initialState, {
        type: "RATE_COLOR",
        id: "initial",
        rating: 5,
      });

      expect(newState).toStrictEqual([
        {
          id: "initial",
          title: "color",
          color: "#FFFFFF",
          rating: 5,
        },
      ]);
    });

    it("should not rate an unexsisting color", () => {
      expect.assertions(1);

      const newState = state.rateColor(initialState, {
        type: "RATE_COLOR",
        id: "unexsisting",
        rating: 5,
      });

      expect(newState).toStrictEqual([
        {
          id: "initial",
          title: "color",
          color: "#FFFFFF",
          rating: 1,
        },
      ]);
    });
  });

  describe("reducer deleteColor", () => {
    it("should delete an exsisting color", () => {
      expect.assertions(1);

      const newState = state.deleteColor(initialState, {
        type: "DELETE_COLOR",
        id: "initial",
      });

      expect(newState).toStrictEqual([]);
    });

    it("should not delete an unexsisting color", () => {
      expect.assertions(1);

      const newState = state.deleteColor(initialState, {
        type: "DELETE_COLOR",
        id: "unexsisting",
      });

      expect(newState).toStrictEqual([
        {
          id: "initial",
          title: "color",
          color: "#FFFFFF",
          rating: 1,
        },
      ]);
    });
  });

  describe("reducer colorsReducer", () => {
    it("should call addColor when action type is ADD_COLOR", () => {
      expect.assertions(2);

      const testAction: Types.AddColorAction = {
        type: "ADD_COLOR",
        title: "color",
        color: "#AABBCC",
        rating: 3,
      };

      const spyAddColor = jest.spyOn(state, "addColor");

      state.colorsReducer(initialState, testAction);

      expect(spyAddColor).toHaveBeenCalledTimes(1);
      expect(spyAddColor).toHaveBeenLastCalledWith(initialState, testAction);

      spyAddColor.mockRestore();
    });

    it("should call rateColor when action type is RATE_COLOR", () => {
      expect.assertions(2);

      const testAction: Types.RateColorAction = {
        type: "RATE_COLOR",
        id: "id",
        rating: 3,
      };

      const spyRateColor = jest.spyOn(state, "rateColor");

      state.colorsReducer(initialState, testAction);

      expect(spyRateColor).toHaveBeenCalledTimes(1);
      expect(spyRateColor).toHaveBeenLastCalledWith(initialState, testAction);

      spyRateColor.mockRestore();
    });

    it("should call deleteColor when action type is DELETE_COLOR", () => {
      expect.assertions(2);

      const testAction: Types.DeleteColorAction = {
        type: "DELETE_COLOR",
        id: "id",
      };

      const spyDeleteColor = jest.spyOn(state, "deleteColor");

      state.colorsReducer(initialState, testAction);

      expect(spyDeleteColor).toHaveBeenCalledTimes(1);
      expect(spyDeleteColor).toHaveBeenLastCalledWith(initialState, testAction);

      spyDeleteColor.mockRestore();
    });

    it("should not call any reducer when action type is unknown", () => {
      expect.assertions(3);

      const testAction = {
        type: "UNKNOWN",
      };

      const spyAddColor = jest.spyOn(state, "addColor");
      const spyRateColor = jest.spyOn(state, "rateColor");
      const spyDeleteColor = jest.spyOn(state, "deleteColor");

      state.colorsReducer(initialState, testAction as Types.ColorActions);

      expect(spyAddColor).toHaveBeenCalledTimes(0);
      expect(spyRateColor).toHaveBeenCalledTimes(0);
      expect(spyDeleteColor).toHaveBeenCalledTimes(0);

      spyAddColor.mockRestore();
      spyRateColor.mockRestore();
      spyDeleteColor.mockRestore();
    });
  });

  describe("reducer colorsReducerWithStorage", () => {
    let spyColorsReducer: jest.SpyInstance<
      Types.Color[],
      [state: Types.Color[], acion: Types.ColorActions]
    >;

    const mockAction = {} as Types.ColorActions;

    beforeAll(() => {
      spyColorsReducer = jest
        .spyOn(state, "colorsReducer")
        .mockImplementation((state) => state);
    });

    beforeEach(() => {
      spyColorsReducer.mockClear();
    });

    afterAll(() => {
      spyColorsReducer.mockRestore();
    });

    it("should call colorsReducer", () => {
      expect.assertions(2);

      state.colorsReducerWithStorage(initialState, mockAction);

      expect(spyColorsReducer).toHaveBeenCalledTimes(1);
      expect(spyColorsReducer).toHaveBeenLastCalledWith(
        initialState,
        mockAction
      );
    });

    it("should store new state in localeStorage", () => {
      expect.assertions(2);

      (localStorage.setItem as jest.Mock).mockClear();

      state.colorsReducerWithStorage(initialState, mockAction);

      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
      expect(localStorage.setItem).toHaveBeenLastCalledWith(
        "color-organizer",
        JSON.stringify(initialState)
      );
    });
  });

  describe("hook useColorsState", () => {
    let spyColorsReducer: jest.SpyInstance<
      Types.Color[],
      [state: Types.Color[], acion: Types.ColorActions]
    >;

    const Test: React.FC = () => {
      const { addColor, rateColor, deleteColor } = state.useColorsState();

      return (
        <div>
          <button onClick={() => addColor("title", "color", 1)}>ADD</button>
          <button onClick={() => rateColor("id", 1)}>RATE</button>
          <button onClick={() => deleteColor("id")}>DELETE</button>
        </div>
      );
    };

    beforeAll(() => {
      spyColorsReducer = jest
        .spyOn(state, "colorsReducerWithStorage")
        .mockImplementation((state) => state);
    });

    beforeEach(() => {
      spyColorsReducer.mockClear();
    });

    afterAll(() => {
      spyColorsReducer.mockRestore();
    });

    it("addColor should call colorsReducerWithStorage properly", () => {
      expect.assertions(2);

      render(<Test />);
      userEvent.click(screen.getByRole("button", { name: /add/i }));

      expect(spyColorsReducer).toHaveBeenCalledTimes(1);
      expect(spyColorsReducer).toHaveBeenCalledWith([], {
        type: "ADD_COLOR",
        title: "title",
        color: "color",
        rating: 1,
      });
    });

    it("rateColor should call colorsReducerWithStorage properly", () => {
      expect.assertions(2);

      render(<Test />);
      userEvent.click(screen.getByRole("button", { name: /rate/i }));

      expect(spyColorsReducer).toHaveBeenCalledTimes(1);
      expect(spyColorsReducer).toHaveBeenCalledWith([], {
        type: "RATE_COLOR",
        id: "id",
        rating: 1,
      });
    });

    it("deleteColor should call colorsReducerWithStorage properly", () => {
      expect.assertions(2);

      render(<Test />);
      userEvent.click(screen.getByRole("button", { name: /delete/i }));

      expect(spyColorsReducer).toHaveBeenCalledTimes(1);
      expect(spyColorsReducer).toHaveBeenCalledWith([], {
        type: "DELETE_COLOR",
        id: "id",
      });
    });
  });
});
