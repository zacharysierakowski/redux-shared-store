import React, { Component } from "react";
import Provider from "redux-shared-store";

import App from "../App";
import reducers from "../../reducers";

class AppContainer extends Component {
  render() {
    return (
      <Provider reducers={reducers}>
        <App />
      </Provider>
    );
  }
}

export default AppContainer;
