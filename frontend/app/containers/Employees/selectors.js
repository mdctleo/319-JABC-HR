import { createSelector } from 'reselect';
import { selectResource, selectCollection } from 'api/selector';
import { initialState } from './reducer';

const selectEmployeeDomain = state => state.get('employees', initialState);

export const selectEmployeeDomainJS = createSelector(
  [selectEmployeeDomain],
  employeeDomain => employeeDomain.toJS(),
);

export const selectSelectedEmployeeId = createSelector(
  [selectEmployeeDomain],
  employeeDomain => employeeDomain.get('selectedEmployeeId'),
);

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc'
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

export const selectAllEmployees = createSelector(
  [selectResource('employee'), selectEmployeeDomain],
  (employees, employeeDomain) => {
    if (employees) {
      const tableSettings = employeeDomain.get('tableSettings');
      const employeesObj = employees.toJS();
      let list = Object.keys(employeesObj).map(key => employeesObj[key]);
      const search = tableSettings.get('search').toLowerCase();
      if (search !== '') {
        list = list.filter(
          e =>
            e.firstname.toLowerCase().includes(search) ||
            e.lastname.toLowerCase().includes(search),
        );
      }
      if (!tableSettings.get('showInactive')) {
        list = list.filter(e => e.status !== 0);
      }
      const sorted = stableSort(
        list,
        getSorting(tableSettings.get('order'), tableSettings.get('orderBy')),
      );
      return sorted;
    }
    return [];
  },
);

export const selectAllRoles = createSelector(
  [selectResource('role')],
  roles => roles && roles.toJS(),
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

export const selectSelectedEmployees = createSelector(
  [selectResource('employee'), selectEmployeeDomain],
  (employees, employeeDomain) => {
    if (employees) {
      const selected = employeeDomain
        .getIn(['tableSettings', 'selected'], [])
        .toJS();
      return selected.map(id => employees.get(`${id}`));
    }
    return null;
  },
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