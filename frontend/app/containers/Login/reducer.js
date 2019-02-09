/*
 *
 * Login reducer
 *
 */

import { fromJS } from 'immutable';
import { LOGIN, LOGIN_ERROR } from './constants';

export const initialState = fromJS({});

function loginReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return state.set('loggingIn', true);
    case LOGIN_ERROR:
      return state.withMutations(s => {
        s.set('loggingIn', false).set('errorMessage', action.message);
      });
    default:
      return state;
  }
}

export default loginReducer;
