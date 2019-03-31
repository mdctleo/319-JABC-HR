/*
 *
 * EmployeeOnboarding actions
 *
 */

import { GET_TASKS, DOWNLOAD_FILE } from './constants';

export function getTasks(selectedEmployeeId) {
  return {
    type: GET_TASKS,
    selectedEmployeeId,
  };
}

export function downloadFile(id) {
  return {
    type: DOWNLOAD_FILE,
    id,
  };
}

export default {
  getTasks,
  downloadFile,
};
