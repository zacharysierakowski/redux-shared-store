import React from "react";
import { combineReducers } from "redux";
import { Provider } from "react-redux";

import store from "./store";

const addAsyncReducers = (key, reducers) => {
  const asyncReducer = combineReducers({
    ...reducers
  });
  store.asyncReducers[key] = asyncReducer;
};

export const injectReducers = (key, reducers) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return;
  addAsyncReducers(key, reducers);

  store.replaceReducer(
    combineReducers({
      ...store.asyncReducers
    })
  );
};

export default props => {
  if (props.reducers) {
    injectReducers("root", props.reducers);
  }
  return <Provider store={store} {...props} />;
};
