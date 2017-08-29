import React, { Component } from "react";
import Provider from "redux-shared-store";
import loggerMiddleware from "redux-logger";
import thunkMiddleware from "redux-thunk";

import Example from "../Example";
import reducers from "../../reducers";

class App extends Component {
  render() {
    return (
      <Provider
        reducers={reducers}
        middleware={[loggerMiddleware, thunkMiddleware]}
      >
        <Example />
      </Provider>
    );
  }
}

export default App;
