/*
 *
 * Profile actions
 *
 */

import { GET_PROFILE_DATA, SAVE_PROFILE, SET_EDITING } from './constants';

export function getProfileData() {
  return {
    type: GET_PROFILE_DATA,
  };
}

export function saveProfile(profile) {
  return {
    type: SAVE_PROFILE,
    payload: {
      profile,
    },
  };
}

export function setEditing(editing) {
  return {
    type: SET_EDITING,
    editing,
  };
}

export default {
  getProfileData,
  saveProfile,
  setEditing,
};
