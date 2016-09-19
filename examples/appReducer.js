/* @flow */

type StateType = {
};

type ActionType = {
  type: 'SOME_APP_ACTION'
};

export default (state: StateType = {}, action: ActionType) => {
  switch (action.type) {
    case 'SOME_APP_ACTION': {
      return state;
    }

    default: {
      return state;
    }
  }
};
