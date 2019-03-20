import { createSelector } from 'reselect';
import { selectResource, selectCollection } from 'api/selector';
import { initialState } from './reducer';

const selectRoleDomain = state => state.get('roles', initialState);

export const selectRoleDomainJS = createSelector([selectRoleDomain], rolesDomain => rolesDomain.toJS());

export const selectSelectedRoleId = createSelector([selectRoleDomain], rolesDomain =>
  rolesDomain.get('selectedRoleId'),
);

export const selectAllRoles = createSelector(
  [selectCollection('roles')],
  roles => {
    if (roles) {
      return Object.keys(roles).map(key => roles[key]);
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
