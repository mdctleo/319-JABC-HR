import { takeLatest, call, put } from 'redux-saga/effects';
import { GET_USER, LOGOUT } from './constants';
import { getEmployee } from 'api/saga';
import { logout as logoutAction } from './actions';
import { push } from 'react-router-redux';

export function* getUser(action) {
  try {
    yield call(getEmployee, action.id);
  } catch (e) {
    yield put(logoutAction());
  }
}

export function* logout() {
  sessionStorage.removeItem('user');
  yield put(push('/'));
}

export default function* profileSaga() {
  yield takeLatest(GET_USER, getUser);
  yield takeLatest(LOGOUT, logout);
}
