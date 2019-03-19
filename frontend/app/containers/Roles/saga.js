import { takeLatest, call } from 'redux-saga/effects';
import { GET_ALL_ROLES } from './constants';
import { getRoles } from 'api/saga';

export function* getAllRoles() {
  yield call(getRoles);
}

export default function* rolesSaga() {
  yield takeLatest(GET_ALL_ROLES, getAllRoles);
}
