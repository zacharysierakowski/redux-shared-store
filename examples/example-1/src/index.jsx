import React from "react";
import ReactDOM from "react-dom";

const MOUNT_NODE = document.getElementById("root");

let render = () => {
  const AppContainer = require("./containers/AppContainer").default;
  ReactDOM.render(<AppContainer />, MOUNT_NODE);
};

render();

if (module.hot) {
  // Setup hot module replacement
  module.hot.accept(["."], () =>
    setImmediate(() => {
      ReactDOM.unmountComponentAtNode(MOUNT_NODE);
      render();
    })
  );
}
