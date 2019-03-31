import { fromJS } from 'immutable';
import employeeOnboardingReducer from '../reducer';

describe('employeeOnboardingReducer', () => {
  it('returns the initial state', () => {
    expect(employeeOnboardingReducer(undefined, {})).toEqual(fromJS({}));
  });
});
