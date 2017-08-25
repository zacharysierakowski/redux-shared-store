import { applyMiddleware, compose, createStore } from "redux";
import dynamicMiddleware from "./middleware";

export const createStore = (
  initialState = {},
  middleware = [],
  enhancers = []
) => {
  const store = createStore(
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
