/* @flow */

import React from 'react';
import {modularConnect} from '..';

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

export default modularConnect('counter', actionCreators, counterReducer)(StatelessCounterComponent);
