/*
 *
 * App actions
 *
 */

import {
  GET_USER,
  SET_USER,
  LOGOUT,
  DISPLAY_ERROR,
  CLEAR_ERROR,
} from './constants';

export function getUser(id) {
  return {
    type: GET_USER,
    id,
  };
}

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
  getUser,
  logout,
  clearError,
};
