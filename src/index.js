import React from "react";
import { combineReducers } from "redux";
import { Provider } from "react-redux";
import set from "object-path-set";

import store from "./store";

// combineAllReducers - recursively iterates through the reducers object
// and combines each redux function using Redux's `combineReducers`
const combineAllReducers = reducers => {
  // if 'reducers' is function, return it
  if (typeof reducers === "function") return reducers;

  // else reduce an object with Redux's `combineReducers`
  // from the keys by recursively calling this function
  return combineReducers(
    Object.keys(reducers).reduce((previous, key) => {
      return Object.assign({}, previous, {
        [key]: combineAllReducers(reducers[key])
      });
    }, {})
  );
};

/*
injectReducers - adds reducers to the store based on a keyPath
if a callback is presented as the third parameter, it will be called after updating the store
params:
   - keyPath: string (ex: 'example.config')
   - reducers: object  (ex: { reducer1, reducer2 })
   - callback: function
*/
export const injectReducers = (keyPath, reducers, callback) => {
  store.reducers = set(store.reducers, keyPath, reducers);
  store.replaceReducer(combineAllReducers(store.reducers));
  if (callback) return callback();
};

// <Provider reducers={reducers} />
export default ({ reducers, ...props }) => {
  if (reducers) {
    store.reducers = reducers;
    store.replaceReducer(combineAllReducers(reducers));
  }
  return <Provider store={store} {...props} />;
};
