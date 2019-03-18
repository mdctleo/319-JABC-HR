/*
 *
 * App actions
 *
 */

import {SET_USER, LOGOUT, DISPLAY_ERROR, CLEAR_ERROR} from './constants';

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

export function displayError(message) {
  return {
    type: DISPLAY_ERROR,
    message,
  };
}

export function clearError() {
  return {
    type: CLEAR_ERROR,
  };
}

export default {
  logout,
  clearError,
};
