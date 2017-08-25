import React from "react";
import ReactDOM from "react-dom";

const MOUNT_NODE = document.getElementById("root");

let render = () => {
  const AppContainer = require("./containers/App").default;
  ReactDOM.render(<AppContainer />, MOUNT_NODE);
};

render();
