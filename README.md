# Introduction

This library allows you to build your 'react-redux' application as a set of modular swappable components, but still have a single global Redux store for the entire app.

## Example

You use the standard `Provider` component from 'react-redux', but with an extra `componentsReducer` reducer from 'modular-react-redux':

~~~es6
/* @flow */

import React from 'react';
import {render} from 'react-dom';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import {componentsReducer} from 'modular-react-redux';
import appReducer from './appReducer';
import CounterComponent from './CounterComponent';

const reducers = combineReducers({
  app: appReducer,
  components: componentsReducer
});
const store = createStore(reducers);

document.addEventListener('DOMContentLoaded', () => render(
  <Provider store={store}>
    <CounterComponent />
  </Provider>,
  document.body.appendChild(document.createElement('div'))
));
~~~

and this then allows you to create a component (a counter component in this example) that specifies a unique name within the app and its own reducer, using the `modularConnect()` function from 'modular-react-redux' insteaad of the `connect()` function from 'react-redux':

~~~es6
/* @flow */

import React from 'react';
import {modularConnect} from 'modular-react-redux';

type PropsType = {
  count: number,
  incrementCounter: Function
};

export const StatelessCounterComponent = ({count, incrementCounter}: PropsType) => (
  <button onClick={incrementCounter}>{count}</button>
);

const defaultState = {
  count: 1
};

const counterReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'INCREMENT_COUNTER': {
      return {
        ...state,
        count: state.count + 1
      };
    }

    default: {
      return state;
    }
  }
};

const actionCreators = {
  incrementCounter: () => ({
    type: 'INCREMENT_COUNTER'
  })
};

export default modularConnect('counter', actionCreators, counterReducer)(
  StatelessCounterComponent);
~~~

## Benefits

Components added in this way have their state automatically added to the global state-atom, so it again becomes possible to add a single `debugger` to the root reducer to understand everything that's happening within the app.

Additionally, Redux's dispatching mechanism can now also be used for loosely coupled communication between individual components, or between components and the host application, and can therefore serve the same purpose as an event-hub would normally serve.
