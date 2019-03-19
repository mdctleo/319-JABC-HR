/*
 *
 * Roles reducer
 *
 */

import { fromJS } from 'immutable';
import { GET_ROLE, SET_EDITING } from './constants';

export const initialState = fromJS({});

function rolesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ROLE:
      return state.set('selectedRoleId', action.id);
    case SET_EDITING:
      return state.set('editing', action.editing);
    default:
      return state;
  }
}

export default rolesReducer;
