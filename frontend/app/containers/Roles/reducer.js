/*
 *
 * Roles reducer
 *
 */

import { fromJS } from 'immutable';
import { GET_ROLE} from './constants';

export const initialState = fromJS({});

function rolesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ROLE:
      return state.set('selectedRoleId', action.id);
    default:
      return state;
  }
}

export default rolesReducer;
