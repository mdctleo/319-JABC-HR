/*
 *
 * Profile reducer
 *
 */

import { fromJS } from 'immutable';

export const initialState = fromJS({});

function profileReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default profileReducer;
