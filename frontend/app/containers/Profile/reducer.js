/*
 *
 * Profile reducer
 *
 */

import { fromJS } from 'immutable';
import { SET_EDITING } from './constants';

export const initialState = fromJS({ editing: false });

function profileReducer(state = initialState, action) {
  switch (action.type) {
    case SET_EDITING:
      return state.set('editing', action.editing);
    default:
      return state;
  }
}

export default profileReducer;
