/*
 *
 * Profile actions
 *
 */

import { GET_PROFILE_DATA, SAVE_PROFILE } from './constants';

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

export default {
  getProfileData,
  saveProfile,
};
