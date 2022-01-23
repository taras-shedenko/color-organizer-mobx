import React from "react";
import ReactDOM from "react-dom";

import MainApp from "./components/MainApp";
import { ColorsProvider } from "./components/ColorsProvider";

ReactDOM.render(
  <ColorsProvider>
    <MainApp />
  </ColorsProvider>,
  document.getElementById("app")
);
