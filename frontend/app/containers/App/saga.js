import { takeLatest, call } from 'redux-saga/effects';
import { GET_USER, LOGOUT } from './constants';
import { getEmployee } from 'api/saga';

export function* getUser(action) {
  yield call(getEmployee, action.id);
}

export function* logout() {
  sessionStorage.removeItem('user');
}

export default function* profileSaga() {
  yield takeLatest(GET_USER, getUser);
  yield takeLatest(LOGOUT, logout);
}
