/*
 *
 * Roles actions
 *
 */

import { GET_ALL_ROLES, GET_ROLE, SET_EDITING, SAVE_ROLE, DELETE_ROLES } from './constants';

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

export function setEditing(editing) {
  return {
    type: SET_EDITING,
    editing,
  };
}

export function saveRole(role) {
  return {
    type: SAVE_ROLE,
    role,
  };
}

export function deleteRoles(roles) {
  return {
    type: DELETE_ROLES,
    roles,
  };
}

export default {
  getAllRoles,
  getRole,
  setEditing,
  saveRole,
  deleteRoles,
};
