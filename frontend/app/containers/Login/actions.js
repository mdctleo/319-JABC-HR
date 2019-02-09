/*
 *
 * Login actions
 *
 */

import { LOGIN, LOGIN_ERROR } from './constants';

export function login(email, password) {
  return {
    type: LOGIN,
    payload: {
      email,
      password,
    },
  };
}

export function loginError(message) {
  return {
    type: LOGIN_ERROR,
    message,
  };
}

const actions = {
  login,
};

export default actions;
