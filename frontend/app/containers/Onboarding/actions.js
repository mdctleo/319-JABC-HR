/*
 *
 * Onboarding actions
 *
 */

import { GET_TASKS } from './constants';

export function getTasks() {
  return {
    type: GET_TASKS,
  };
}

export default {
  getTasks,
};
