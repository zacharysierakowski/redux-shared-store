import { applyMiddleware, compose, createStore } from "redux";
import dynamicMiddleware from "./middleware";

const configureStore = (initialState = {}) => {
  const enhancers = [];
  const store = createStore(
    (state = {}) => state,
    initialState,
    compose(applyMiddleware(dynamicMiddleware.middleware), ...enhancers)
  );

  store.reducers = {};
  return store;
};

export default configureStore();
