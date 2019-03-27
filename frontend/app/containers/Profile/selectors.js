import { createSelector } from 'reselect';
import { selectProfile } from '../App/selectors';
import { selectResource, selectCollection } from 'api/selector';
import { initialState } from './reducer';

const selectProfileDomain = state => state.get('profile', initialState);

export const selectProfileDomainJS = createSelector([selectProfileDomain], rolesDomain => rolesDomain.toJS());

export const selectAllRoles = createSelector(
  [selectCollection('roles')],
  roles => {
    if (roles) {
      return Object.keys(roles).map(key => roles[key]);
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

export const selectAllEmployees = createSelector(
  [selectResource('employee')],
  employees => {
    if (employees) {
      const allEmployees = employees.toJS()
      return Object.keys(allEmployees).map(key => allEmployees[key]);
    }
    return [];
  }
);

export const selectEmployees = createSelector(
  [selectCollection('employeesOfManager')],
  employees => {
    if (employees) {
      return Object.keys(employees).map(key => employees[key]);
    }
    return [];
  },
);

export const selectManagers = createSelector(
  [selectCollection('managersOfEmployee')],
  employees => {
    if (employees) {
      return Object.keys(employees).map(key => employees[key]);
    }
    return [];
  },
);