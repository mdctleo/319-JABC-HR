/*
 *
 * EmployeeOnboarding actions
 *
 */

import { GET_TASKS, DOWNLOAD_FILE, CREATE_TASK } from './constants';

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

export function createTask(selectedEmployeeId, onboardingTask) {
  return {
    type: CREATE_TASK,
    selectedEmployeeId,
    onboardingTask
  };
}

export default {
  getTasks,
  downloadFile,
  createTask
};
