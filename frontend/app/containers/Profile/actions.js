/*
 *
 * Profile actions
 *
 */

import { GET_PROFILE_DATA, SAVE_PROFILE, SET_EDITING, UPDATE_PASSWORD } from './constants';

export function getProfileData() {
  return {
    type: GET_PROFILE_DATA,
  };
}

export function saveProfile(profile, employees, managers) {
  return {
    type: SAVE_PROFILE,
    payload: {
      profile,
      employees,
      managers
    },
  };
}

export function setEditing(editing) {
  return {
    type: SET_EDITING,
    editing,
  };
}

export function updatePassword(profile) {
  return {
    type: UPDATE_PASSWORD,
    payload: {
      profile,
    },
  };
}

export default {
  getProfileData,
  saveProfile,
  setEditing,
  updatePassword,
};
