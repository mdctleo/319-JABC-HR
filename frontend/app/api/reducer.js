import { fromJS } from 'immutable';
import { SET_RESOURCE } from './constants';

export const initialState = fromJS({});

function apiReducer(state = initialState, action) {
  switch (action.type) {
    case SET_RESOURCE:
      return state.mergeDeep({
        [action.payload.resourceName]: {
          [action.payload.id]: action.payload.resource,
        },
      });
    default:
      return state;
  }
}

export default apiReducer;
