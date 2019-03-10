import { fromJS } from 'immutable';
import { SET_RESOURCE } from './constants';

export const initialState = fromJS({});

function loginReducer(state = initialState, action) {
  switch (action.type) {
    case SET_RESOURCE:
      return state.merge({
        [action.payload.resourceName]: {
          [action.payload.id]: action.payload.resource,
        },
      });
    default:
      return state;
  }
}

export default loginReducer;
