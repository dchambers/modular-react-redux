/* @flow */

import React from 'react';
import {render} from 'react-dom';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import {componentsReducer} from '..';
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
