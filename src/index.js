import React from "react";
import { combineReducers } from "redux";
import { Provider } from "react-redux";
import set from "object-path-set";
import store from "./store";
import dynamicMiddleware from "./middleware";

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
  store.reducers = set(store.reducers, keyPath, reducers);
  store.replaceReducer(combineAllReducers(store.reducers));
  if (callback) return callback();
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
export default ({ reducers, middleware, ...props }) => {
  if (middleware) dynamicMiddleware.add(...middleware);
  if (reducers) {
    store.reducers = reducers;
    store.replaceReducer(combineAllReducers(reducers));
  }
  return <Provider store={store} {...props} />;
};
