import { takeLatest, call } from 'redux-saga/effects';
import { GET_ALL_ROLES, GET_ROLE } from './constants';
import { getRoles, getRole as getRoleApi } from 'api/saga';

export function* getAllRoles() {
  yield call(getRoles);
}

export function* getRole(action) {
  if (action.id) {
    yield call(getRoleApi, action.id);
  }
}

export default function* rolesSaga() {
  yield takeLatest(GET_ALL_ROLES, getAllRoles);
  yield takeLatest(GET_ROLE, getRole);
}
