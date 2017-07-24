# redux-shared-store

A redux provider that easily allows for injecting reducers dynamically and sharing a redux store across components. See an example application using the `redux-shared-store`, and a component (that uses the shared store itself) [here](https://zachary-sierakowski.github.io/redux-shared-store/).

## Usage

```javascript
import Provider, { injectReducers, injectMiddleware } from 'redux-shared-store'
```

## Provider props

- #### `reducers: Array<Reducer> (optional)`

  An array of reducers that will be applied to the root of the redux store. If no reducers are passed, it is assumed that the application does not use redux.

- #### `middleware: Array<Middleware> (optional)`

  An array of middleware to provide the redux store.

## injectReducers props

  - #### `keyPath: String (required)`

  A string representing the path to the reducers. Ex: 'components.something'

  - #### `reducers: Array<Reducer> (required)`

  An array of reducers that will be appended to the redux store.

  - #### `callback: Function (optional)`

  A function called after the reducers are injected.


## injectMiddleware props

  - #### `middleware: Array<Middleware> (required)`

    An array of middleware to provide the redux store.

  - #### `callback: Function (optional)`

  A function called after the middleware is injected.

## Important

Provider must be found at the root of the application. Otherwise, any components that try to use `injectReducers` will throw an error that there is no store available.

## Also important

Components using `redux-shared-store` need to be careful not to duplicate reducer names. Otherwise, there will be a conflict with the keys. It is useful to tuck components' reducers into a subKey such as 'components'.

## Important, as well

Components using `redux-shared-store` need to be careful not to duplicate action types. Otherwise, reducers could end up with error states. It is useful to name components' action types prefixed with the component name such as 'example/THE_ACTION'.

## State preview

```
{
  ...anyAppRelatedReducers,
  components: {
    example: {
      ...exampleRelatedReducers
    }
  }
}
```

## Example usage for applications

There are not many changes in your application necessary to migrate to `redux-shared-store`. Remove any store 'creation' or 'configuration' from your app. This will turn to dead code. To hook up your applications' reducers (if you have any), pass them into `Provider` with the 'reducers' prop. Pass any middleware into `Provider` with the 'middleware' prop. Then, your application specific state will be available as usual in `mapStateToProps`;

reducers.js
```javascript
import config from "./modules/config/reducer";

export default { config };
```

App.jsx
```javascript
import React, { Component } from "react";
import Provider from "redux-shared-store";
import loggerMiddleware from "redux-logger";

import reducers from "./reducers";

class App extends Component {
  render() {
    return (
      <Provider
        reducers={reducers}
        middleware={[loggerMiddleware]}
      >
        Hello, World.
      </Provider>
    );
  }
}

const mapStateToProps = ({ config }) {
  return config;
}

export default connect(mapStateToProps)(App);
```

## Example usage for components

If a component needs a reference to the store, it only needs to `connect` as normal to receive anything that is currently in the store. If it needs it's own set of data and reducers, the components' reducers can be injected with the `injectReducers` function.

reducers.js
```javascript
import config from "./modules/config/reducer";

export default { config };
```

index.js (root of the component)
```javascript
import React from "react";
import { injectReducers } from "redux-shared-store";

import reducers from "./reducers";
import Something from "./Something";

export default props =>
  injectReducers("components.something", reducers, () => <Something {...props} />);
```

To access data from the store for your component, they will be found inside `components`. For this example it would be something like  `state.components.something`.

```javascript
const mapStateToProps = ({ components: { something } }) {
  const { config } = something;
  return {
    someData: config.data
  };
}

export default connect(mapStateToProps)(Something);
```
