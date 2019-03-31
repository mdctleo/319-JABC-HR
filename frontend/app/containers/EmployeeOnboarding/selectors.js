import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the employeeOnboarding state domain
 */

const selectEmployeeOnboardingDomain = state =>
  state.get('employeeOnboarding', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by EmployeeOnboarding
 */

const makeSelectEmployeeOnboarding = () =>
  createSelector(selectEmployeeOnboardingDomain, substate => substate.toJS());

export default makeSelectEmployeeOnboarding;
export { selectEmployeeOnboardingDomain };
