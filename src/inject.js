import { combineReducers } from "redux";

const inject = (store, key, reducer) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return;

  store.asyncReducers[key] = reducer;
  store.replaceReducer(
    combineReducers({
      ...store.asyncReducers
    })
  );
};

export default inject;
