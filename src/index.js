import React from "react";
import { Provider } from "react-redux";

import createStore from "./store";
import inject from "./inject";
import reducer from "./reducer";

const store = createStore();

export const injectReducer = (key, reducer) => {
  inject(store, key, reducer);
};

export default props => {
  injectReducer("inject", reducer);
  return <Provider store={store} {...props} />;
};
