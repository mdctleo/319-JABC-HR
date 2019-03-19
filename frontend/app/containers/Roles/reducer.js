/*
 *
 * Roles reducer
 *
 */

import { fromJS } from 'immutable';

export const initialState = fromJS({});

function rolesReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default rolesReducer;
