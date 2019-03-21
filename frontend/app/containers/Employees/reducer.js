/*
 *
 * Employees reducer
 *
 */

import { fromJS } from 'immutable';
import { UPDATE_TABLE_SETTINGS, SET_EDITING, SELECT_PROFILE } from './constants';

export const initialState = fromJS({
  editing: false,
  tableSettings: {
    order: 'asc',
    orderBy: 'lastName',
    page: 0,
    rowsPerPage: 25,
    selected: [],
  },
});

function rolesReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_TABLE_SETTINGS:
      return state.set(
        'tableSettings',
        state.get('tableSettings').merge(action.tableSettings),
      );
    case SET_EDITING:
      return state.set('editing', action.editing);
    case SELECT_PROFILE:
      return state.set('selectedEmployeeId', action.id);
    default:
      return state;
  }
}

export default rolesReducer;
