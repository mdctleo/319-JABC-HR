import { createSelector } from 'reselect';
import { selectResource } from 'api/selector';
import { initialState } from './reducer';

const selectEmployeeDomain = state => state.get('employees', initialState);

export const selectEmployeeDomainJS = createSelector([selectEmployeeDomain], employeeDomain => employeeDomain.toJS());

export const selectSelectedEmployeeId = createSelector([selectEmployeeDomain], employeeDomain =>
  employeeDomain.get('selectedEmployeeId'),
);

export const selectAllEmployees = createSelector(
  [selectResource('employee')],
  employees => {
    if (employees) {
      const employeesObj = employees.toJS();
      return Object.keys(employeesObj).map(key => employeesObj[key]);
    }
    return [];
  },
);

export const selectSelectedEmployee = createSelector(
  [selectResource('employee'), selectSelectedEmployeeId],
  (employees, selectedEmployeeId) => {
    if (employees && selectedEmployeeId) {
      return employees.get(`${selectedEmployeeId}`);
    }
    return null;
  },
);
