/*
 *
 * App actions
 *
 */

import { SET_USER, LOGOUT } from './constants';

export function setUser(user) {
  return {
    type: SET_USER,
    user,
  };
}

export function logout() {
  return {
    type: LOGOUT,
  };
}

export default {
  logout,
};
