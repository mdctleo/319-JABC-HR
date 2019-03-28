/*
 *
 * EmployeeHistory actions
 *
 */

import { GET_HISTORY } from './constants';

export function getHistory(selectedEmployee) {
  return {
    type: GET_HISTORY,
    selectedEmployee,
  };
}

export default {
  getHistory,
};
