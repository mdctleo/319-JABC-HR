import { createSelector } from 'reselect';

const selectGlobal = state => state.get('global');

const selectRouter = state => state.get('router');

const makeSelectLocation = () =>
  createSelector(selectRouter, routerState =>
    routerState.get('location').toJS(),
  );

const makeSelectGlobal = () =>
  createSelector(selectGlobal, substate => substate.toJS());

const selectUser = () =>
  createSelector(makeSelectGlobal(), substate => substate.user);

export { makeSelectLocation, makeSelectGlobal, selectUser };
