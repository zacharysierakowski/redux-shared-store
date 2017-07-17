import { injectReducer } from "./";

const INJECT_TYPE = "/redux/inject";

const inject = (state = {}, action) => {
  switch (action.type) {
    case INJECT_TYPE:
      const { key, reducer } = action.data;
      setTimeout(() => {
        injectReducer(key, reducer);
      }, 0);
      return state;
    default:
      return state;
  }
};

export default inject;
