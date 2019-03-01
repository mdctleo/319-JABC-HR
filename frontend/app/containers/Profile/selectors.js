import { createSelector } from 'reselect';
import { selectUser } from '../App/selectors';
import { selectResource } from 'api/selector';

/**
 * Default selector used by Login
 */

const selectProfile = () =>
  createSelector(
    [selectUser(), selectResource('employee')],
    (user, employees) => {
      return employees && employees.get(`${user.id}`).toJS();
    },
  );

export default selectProfile;
