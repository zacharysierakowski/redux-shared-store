import React from "react";
import { combineReducers } from "redux";
import { Provider } from "react-redux";
import hasKeyPath from "lodash.has";
import setKeyPath from "lodash.set";
import { createStore } from "./store";
import dynamicMiddleware from "./middleware";

let _store = null;

/*
  Recursively iterates through the reducers object and combines each Redux
  function using Redux's `combineReducers`
*/
const combineAllReducers = reducers => {
  if (typeof reducers === "function") return reducers;
  return combineReducers(
    Object.keys(reducers).reduce((previous, key) => {
      return Object.assign({}, previous, {
        [key]: combineAllReducers(reducers[key])
      });
    }, {})
  );
};

/*
  Dynamically adds reducers to the store based on a given key path;
  if a callback is present as a third parameter, it will be called after updating the store
   - keyPath: string (ex: 'example.config')
   - reducers: Object  (ex: { reducer1, reducer2 })
   - callback?: Function
*/
export const injectReducers = (keyPath, reducers, callback) => {
  // if the reducers are already there, return or callback
  if (hasKeyPath(_store.reducers, keyPath)) {
    if (callback) return callback(false);
    return;
  }

  _store.reducers = setKeyPath(_store.reducers, keyPath, reducers);
  _store.replaceReducer(combineAllReducers(_store.reducers));
  if (callback) return callback(true);
};

/*
  Dynamically adds middleware to the store; if a callback is present as a second
  parameter, it will be called after updating the store
   - middleware: Array<middleware>
   - callback?: Function
*/
export const injectMiddleware = (middleware, callback) => {
  dynamicMiddleware.add(...middleware);
  if (callback) return callback();
};

/*
  <Provider reducers={Object} middleware={Array<middleware>} />
*/
export default ({ store, reducers, middleware, ...props }) => {
  _store = store ? store : createStore();
  if (middleware) dynamicMiddleware.add(...middleware);
  if (reducers) {
    _store.reducers = reducers;
    _store.replaceReducer(combineAllReducers(reducers));
  }
  return <Provider store={_store} {...props} />;
};
