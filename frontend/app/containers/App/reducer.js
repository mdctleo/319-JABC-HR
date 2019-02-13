/*
 *
 * App reducer
 *
 */

import { fromJS } from 'immutable';
import { SET_USER, LOGOUT } from './constants';

export const initialState = fromJS({});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return state.set('user', action.user);
    case LOGOUT:
      return state.set('user', null);
    default:
      return state;
  }
}

export default appReducer;
