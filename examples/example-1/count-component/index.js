import React from "react";
import { injectReducers } from "redux-shared-store";

import reducers from "./reducers";
import CountComponent from "./CountComponent";

export default props =>
  injectReducers("shared.countComponent", reducers, () =>
    <CountComponent {...props} />
  );
