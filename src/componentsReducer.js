/* @flow */

import {combineReducers} from 'redux';
import type {ObjectMap} from './types';

type StateType = {
  reducers: ObjectMap<Function>,
  combinedReducer: Function,
  component: ObjectMap<Object>
};

type ActionType = {
  type: '@@modular-react-redux/REGISTER_COMPONENT_REDUCER',
  name: string,
  reducer: Function
};

const defaultState = {
  reducers: {},
  combinedReducer: state => state,
  component: {}
};

export const componentsReducer = (state: StateType = defaultState, action: ActionType) => {
  switch (action.type) {
    case '@@modular-react-redux/REGISTER_COMPONENT_REDUCER': {
      const reducer = {[action.name]: action.reducer};
      const reducers = {...state.reducers, ...reducer};
      const componentState = {[action.name]: action.reducer(undefined, {})};
      return {
        ...state,
        reducers,
        combinedReducer: combineReducers(reducers),
        component: {...state.component, ...componentState}
      };
    }

    default: {
      return {
        ...state,
        component: state.combinedReducer(state.component, action)
      };
    }
  }
};
