import { createSelector } from 'reselect';
import { selectProfile } from '../App/selectors';
import { selectResource } from 'api/selector';
import { initialState } from './reducer';

const selectProfileDomain = state => state.get('profile', initialState);

export const selectProfileDomainJS = createSelector([selectProfileDomain], rolesDomain => rolesDomain.toJS());

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
