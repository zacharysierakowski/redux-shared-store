import React from "react";
import { injectReducers } from "redux-shared-store";

import * as reducers from "./reducers";
import MessageComponent from "./MessageComponent";

export default props =>
  injectReducers("shared.messageComponent", reducers, () =>
    <MessageComponent {...props} />
  );
