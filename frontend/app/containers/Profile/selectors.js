import { createSelector } from 'reselect';
import { selectProfile } from '../App/selectors';
import { selectResource } from 'api/selector';
import { initialState } from './reducer';

const selectProfileDomain = state => state.get('profile', initialState);

export const selectProfileDomainJS = createSelector([selectProfileDomain], rolesDomain => rolesDomain.toJS());


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

export const selectRole = createSelector(
  [selectProfile, selectResource('role')],
  (profile, roles) => {
    if (roles) {
      return roles.get(`${profile.fkRole}`);
    }
    return null;
  },
);
