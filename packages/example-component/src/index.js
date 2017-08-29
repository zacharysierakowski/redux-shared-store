import React from "react";
import { injectReducers } from "redux-shared-store";

import reducers from "./reducers";
import Counter from "./Counter";

export default props =>
  injectReducers("components.counter", reducers, () => <Counter {...props} />);
