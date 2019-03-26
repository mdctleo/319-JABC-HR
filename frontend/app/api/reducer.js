import { fromJS } from 'immutable';
import {SET_RESOURCE, SET_COLLECTION, CLEAR_RESOURCE} from './constants';

export const initialState = fromJS({});

function apiReducer(state = initialState, action) {
  switch (action.type) {
    case SET_RESOURCE:
      return state.mergeDeep({
        [action.payload.resourceName]: {
          [action.payload.id]: action.payload.resource,
        },
      });
    case CLEAR_RESOURCE:
      return state.set(action.payload.resourceName, null);
    case SET_COLLECTION:
      return state.setIn(
        ['collections', action.payload.collectionName],
        action.payload.collection,
      );
    default:
      return state;
  }
}

export default apiReducer;
