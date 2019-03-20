/*
 *
 * Roles actions
 *
 */

import { GET_ALL_ROLES, GET_ROLE } from './constants';

export function getAllRoles() {
  return {
    type: GET_ALL_ROLES,
  };
}

export function getRole(id) {
  return {
    type: GET_ROLE,
    id,
  };
}

export default {
  getAllRoles,
  getRole,
};
