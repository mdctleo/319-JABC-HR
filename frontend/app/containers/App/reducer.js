/*
 *
 * App reducer
 *
 */

import { fromJS } from 'immutable';
import { SET_USER, LOGOUT, DISPLAY_ERROR, CLEAR_ERROR } from './constants';

export const initialState = fromJS({error: ''});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return state.set('user', action.user);
    case LOGOUT:
      return state.set('user', null);
    case DISPLAY_ERROR:
      return state.set('error', action.message);
    case CLEAR_ERROR:
      return state.set('error', '');
    default:
      return state;
  }
}

export default appReducer;
