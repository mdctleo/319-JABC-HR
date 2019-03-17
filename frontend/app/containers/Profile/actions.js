/*
 *
 * Profile actions
 *
 */

import { GET_PROFILE_DATA } from './constants';

export function getProfileData() {
  return {
    type: GET_PROFILE_DATA,
  };
}

export default {
  getProfileData,
};
