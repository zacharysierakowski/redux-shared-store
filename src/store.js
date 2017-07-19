import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";

// creates a standard redux store with no reducers
// with a reference to 'store.reducers' for dynamically attaching reducers to
const createSharedStore = (initialState = {}) => {
  const middleware = [thunk];
  const enhancers = [];
  const store = createStore(
    (state = {}) => state,
    initialState,
    compose(applyMiddleware(...middleware), ...enhancers)
  );

  store.reducers = {};
  return store;
};

const store = createSharedStore();

export default store;
