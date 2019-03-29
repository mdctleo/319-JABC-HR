import { createSelector } from 'reselect';
import { selectResource } from 'api/selector';
import { fromJS } from 'immutable';

const selectSelectedEmployeeId = (_, props) =>
  props.selectedEmployee && props.selectedEmployee.id;

const getFieldName = key => {
  switch (key) {
    case 'sin':
      return 'SIN';
    case 'email':
      return 'Email';
    case 'firstname':
      return 'First Name';
    case 'lastname':
      return 'Last Name';
    case 'fte':
      return 'Full Time';
    case 'status':
      return 'Status';
    case 'adminLevel':
      return 'Admin Level';
    case 'salary':
      return 'Salary';
    case 'address':
      return 'Address';
    case 'birthdate':
      return 'Birthdate';
    case 'dateJoined':
      return 'Date Joined';
    case 'vacationDays':
      return 'Vacation Days';
    case 'remainingVacationDays':
      return 'Remaining Vacation Days';
    case 'phoneNumber':
      return 'Phone Number';
    case 'fkRole':
      return 'Role';
    default:
      return '';
  }
};

export const selectHistory = createSelector(
  [selectResource('history'), selectSelectedEmployeeId],
  (history, id) => {
    if (history && id) {
      const employeeHistory = history.get(`${id}`);
      if (employeeHistory) {
        return employeeHistory
          .sortBy(h => h.version)
          .reduce((list, h) => {
            const last = list.last();
            const changedFields = [];
            if (last) {
              for (const key in last) {
                if (
                  key !== 'id' &&
                  key !== 'password' &&
                  key !== 'version' &&
                  key !== 'fkCreator' &&
                  key !== 'createdDate' &&
                  key !== 'role' &&
                  key !== 'changedFields'
                ) {
                  if (last[key] !== h[key]) {
                    changedFields.push(getFieldName(key));
                  }
                }
              }
              if (changedFields.length === 0) {
                return list;
              }
            }
            return list.push({ ...h, changedFields });
          }, fromJS([]))
          .reverse()
          .toJS();
      }
    }
    return [];
  },
);
