import { Color, ColorsStore } from "../state/colorsStore";

const initLocalStorage = () =>
  (localStorage["color-organizer"] = JSON.stringify([
    {
      id: "id",
      title: "title",
      color: "color",
      rating: 1,
    },
  ]));

jest.mock("uuid", () => ({
  v4: () => "some-id",
}));

describe("Colors Store", () => {
  describe("class Color", () => {
    it("should initialize instance correctly", () => {
      expect.assertions(4);

      const color = new Color({
        id: "id",
        title: "title",
        color: "color",
        rating: 1,
      });

      expect(color.id).toBe("id");
      expect(color.title).toBe("title");
      expect(color.color).toBe("color");
      expect(color.rating).toBe(1);
    });

    it("should rate Color", () => {
      expect.assertions(1);

      const color = new Color({
        id: "id",
        title: "title",
        color: "color",
        rating: 1,
      });

      color.rate(3);

      expect(color.rating).toBe(3);
    });
  });

  describe("class ColorsStore", () => {
    it("should initialize instance correctly", () => {
      expect.assertions(5);

      initLocalStorage();

      const colorsStore = new ColorsStore();
      const { colors } = colorsStore;

      expect(colors.length).toBe(1);
      expect(colors[0].id).toBe("id");
      expect(colors[0].title).toBe("title");
      expect(colors[0].color).toBe("color");
      expect(colors[0].rating).toBe(1);
    });

    it("should add new Color correctly", () => {
      expect.assertions(5);

      initLocalStorage();
      const colorsStore = new ColorsStore();
      colorsStore.add("title2", "color2", 3);
      const { colors } = colorsStore;

      expect(colors.length).toBe(2);
      expect(colors[1].id).toBe("some-id");
      expect(colors[1].title).toBe("title2");
      expect(colors[1].color).toBe("color2");
      expect(colors[1].rating).toBe(3);
    });

    it("should remove Color correctly", () => {
      expect.assertions(1);

      initLocalStorage();
      const colorsStore = new ColorsStore();
      const { colors } = colorsStore;
      colorsStore.remove(colors[0]);

      expect(colors.length).toBe(0);
    });
  });
});
