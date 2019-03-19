import { createSelector } from 'reselect';
import { selectResource } from 'api/selector';

export const selectAllRoles = createSelector(
  [selectResource('role')],
  roles => {
    if (roles) {
      const rolesJS = roles.toJS();
      return Object.keys(rolesJS).map(key => rolesJS[key]);
    }
    return [];
  },
);
