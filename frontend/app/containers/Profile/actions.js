/*
 *
 * Profile actions
 *
 */

import { GET_DATA } from './constants';

export function getData() {
  return {
    type: GET_DATA,
  };
}

export default {
  getData,
};
