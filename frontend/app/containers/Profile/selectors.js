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
      if (employees) {
        console.log(user.id);
        const resource = employees.get(`${user.id}`);
        return resource && resource.toJS();
      }
      return null;
    },
  );

export default selectProfile;
