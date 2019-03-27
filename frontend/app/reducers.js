/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux-immutable';
import { connectRouter } from 'connected-react-router/immutable';

import history from 'utils/history';

import globalReducer from 'containers/App/reducer';
import apiReducer from 'api/reducer';
import { LOGOUT } from './containers/App/constants';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const appReducer = combineReducers({
    global: globalReducer,
    resources: apiReducer,
    ...injectedReducers,
  });
  const rootReducer = (state, action) => {
    if (action.type === LOGOUT) {
      state = undefined;
    }
    return appReducer(state, action);
  };

  // Wrap the root reducer and return a new root reducer with router state
  const mergeWithRouterState = connectRouter(history);
  return mergeWithRouterState(rootReducer);
}
