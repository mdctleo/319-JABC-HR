/*
 *
 * Onboarding reducer
 *
 */

import { fromJS } from 'immutable';

export const initialState = fromJS({});

function onboardingReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default onboardingReducer;
