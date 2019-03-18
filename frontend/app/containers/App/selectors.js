import { createSelector } from 'reselect';
import { selectResource } from 'api/selector';

const selectGlobal = state => state.get('global');

const selectRouter = state => state.get('router');

const makeSelectLocation = () =>
  createSelector(selectRouter, routerState =>
    routerState.get('location').toJS(),
  );

const makeSelectGlobal = () =>
  createSelector(selectGlobal, substate => substate.toJS());

const selectUser = () => createSelector(
  makeSelectGlobal(),
  substate => substate.user,
);

const selectProfile = createSelector(
  [selectUser(), selectResource('employee')],
  (user, employees) => {
    if (employees && user) {
      return employees.get(`${user.id}`);
    }
    return null;
  },
);

export { makeSelectLocation, makeSelectGlobal, selectProfile, selectUser };
