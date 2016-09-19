/* @flow */

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import type {ObjectMap} from './types';

// NOTE: The checking code is needed because `mapStateToProps` is invoked before `mapDispatchToProps`
const mapStateToProps = name => state =>
  ((state.components.component && state.components.component[name]) ?
    state.components.component[name] : {});

const mapDispatchToProps = (name, reducer, actionCreators) => (dispatch) => {
  dispatch({
    type: '@@modular-react-redux/REGISTER_COMPONENT_REDUCER',
    name,
    reducer
  });
  return bindActionCreators(actionCreators, dispatch);
};

export const modularConnect = (name: string, actionCreators: ObjectMap<Function>, reducer: Function) =>
  connect(mapStateToProps(name), mapDispatchToProps(name, reducer, actionCreators));
