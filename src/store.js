import {
  applyMiddleware,
  compose,
  createStore as createReduxStore
} from "redux";
import thunk from "redux-thunk";

const createStore = (initialState = {}) => {
  const middleware = [thunk];
  const enhancers = [];
  let composeEnhancers = compose;

  const store = createReduxStore(
    (state = {}) => state,
    initialState,
    composeEnhancers(applyMiddleware(...middleware), ...enhancers)
  );
  store.asyncReducers = {};

  return store;
};

const store = createStore();

export default store;
