import { createSelector } from 'reselect';
import { selectUser } from '../App/selectors';
import { selectResource } from 'api/selector';

/**
 * Default selector used by Login
 */

export const selectProfile = createSelector(
  [selectUser(), selectResource('employee')],
  (user, employees) => {
    if (employees) {
      return employees.get(`${user.id}`);
    }
    return null;
  },
);

export const selectRole = createSelector(
  [selectProfile, selectResource('role')],
  (profile, roles) => {
    if (roles) {
      return roles.get(`${profile.fkRole}`);
    }
    return null;
  },
);
