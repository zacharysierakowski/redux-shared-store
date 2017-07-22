import { compose } from "redux";

/*
  Middleware that is applied to the shared Redux store;
  allows dynamic injection of Redux middleware
*/
class DynamicMiddleware {
  constructor() {
    this.middlewares = [];
  }
  middleware = ({ getState, dispatch }) => next => action => {
    const middlewareAPI = { getState, dispatch: action => dispatch(action) };
    const chain = this.middlewares.map(middleware => middleware(middlewareAPI));
    return compose(...chain)(next)(action);
  };
  filter = (...middleware) => {
    return middleware.filter(
      _ => !this.middlewares.some((item, index) => item === _)
    );
  };
  add = (...middleware) => {
    this.middlewares = this.middlewares.concat(this.filter(...middleware));
  };
  nuke = () => {
    this.middlewares = [];
  };
}

export default new DynamicMiddleware();
