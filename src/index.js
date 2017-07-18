import React from "react";
import { combineReducers } from "redux";
import { Provider } from "react-redux";

import store from "./store";

export const injectReducer = (key, reducer) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return;

  store.asyncReducers[key] = reducer;
  store.replaceReducer(
    combineReducers({
      ...store.asyncReducers
    })
  );
};

export default props => <Provider store={store} {...props} />;
