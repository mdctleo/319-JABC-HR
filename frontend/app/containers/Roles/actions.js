/*
 *
 * Roles actions
 *
 */

import { GET_ALL_ROLES } from './constants';

export function getAllRoles() {
  return {
    type: GET_ALL_ROLES,
  };
}

export default {
  getAllRoles,
};
