import { createSelector } from 'reselect';
import { selectProfile } from '../App/selectors';
import { selectResource } from 'api/selector';

/**
 * Default selector used by Login
 */

export const selectRole = createSelector(
  [selectProfile, selectResource('role')],
  (profile, roles) => {
    if (roles) {
      return roles.get(`${profile.fkRole}`);
    }
    return null;
  },
);
