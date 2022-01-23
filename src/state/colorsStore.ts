// Implemantation of the application's state

import { makeObservable, observable, action, autorun, toJS } from "mobx";
import { v4 } from "uuid";

export interface ColorValue {
  id: string;
  title: string;
  color: string;
  rating: number;
}

export class Color implements ColorValue {
  id = "";
  title = "";
  color = "";
  rating = 0;

  constructor({ id, title, color, rating }: ColorValue) {
    // Initialize MobX
    makeObservable(this, {
      id: observable,
      title: observable,
      color: observable,
      rating: observable,
      rate: action,
    });

    // Set fields
    this.id = id;
    this.title = title;
    this.color = color;
    this.rating = rating;
  }

  // Change rating value
  rate(rating: number) {
    this.rating = rating;
  }
}

export class ColorsStore {
  colors: Color[] = [];

  constructor() {
    // Initialize MobX
    makeObservable(this, {
      colors: observable.shallow,
      add: action.bound,
      remove: action.bound,
    });

    // Build initial value
    this.colors = (
      JSON.parse(
        localStorage.getItem("color-organizer") ?? "[]"
      ) as ColorValue[]
    ).map((colorValue) => new Color(colorValue));

    // Store changes
    autorun(() =>
      localStorage.setItem("color-organizer", JSON.stringify(toJS(this.colors)))
    );
  }

  // Add new color
  add(title: string, color: string, rating: number) {
    this.colors.push(new Color({ id: v4(), title, color, rating }));
  }

  // Remove existing color
  remove(color: Color) {
    this.colors.splice(this.colors.indexOf(color), 1);
  }
}
