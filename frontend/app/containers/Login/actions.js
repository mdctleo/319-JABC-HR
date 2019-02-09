/*
 *
 * Login actions
 *
 */

import { LOGIN } from './constants';

export function login(email, password) {
  return {
    type: LOGIN,
    payload: {
      email,
      password,
    },
  };
}

const actions = {
  login,
};

export default actions;
