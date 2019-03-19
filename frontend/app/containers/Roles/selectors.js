import { createSelector } from 'reselect';
import { selectResource } from 'api/selector';
import { initialState } from './reducer';

const selectRoleDomain = state => state.get('roles', initialState);

const selectSelectedRoleId = createSelector([selectRoleDomain], rolesDomain =>
  rolesDomain.get('selectedRoleId'),
);

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

export const selectSelectedRole = createSelector(
  [selectResource('role'), selectSelectedRoleId],
  (roles, selectedRoleId) => {
    if (roles && selectedRoleId) {
      return roles.get(`${selectedRoleId}`);
    }
    return null;
  },
);
