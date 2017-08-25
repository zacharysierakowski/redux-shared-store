import { applyMiddleware, compose, createStore as reduxCreateStore } from "redux";
import dynamicMiddleware from "./middleware";

export const createStore = (
  initialState = {},
  middleware = [],
  enhancers = []
) => {
  const store = reduxCreateStore(
    (state = {}) => state,
    initialState,
    compose(
      applyMiddleware(dynamicMiddleware.middleware, ...middleware),
      ...enhancers
    )
  );
  store.reducers = {};
  return store;
};

export default createStore();
