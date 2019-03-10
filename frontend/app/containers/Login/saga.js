import { takeLatest, put } from 'redux-saga/effects';
import { LOGIN } from './constants';
import { setUser } from 'containers/App/actions';
import { loginError } from './actions';

export function* login(action) {
  // TODO: call actual api

  const user = {
    id: 1,
    firstname: 'Janet',
    lastname: 'Johnson',
    sin: '32454344',
    email: 'jant@example.com',
  };
  if (action.payload.email === 'admin') {
    user.adminLevelNum = 3;
  } else if (action.payload.email === 'manager') {
    user.adminLevelNum = 2;
  } else if (action.payload.email === 'employee') {
    user.adminLevelNum = 1;
  } else {
    return yield put(loginError('Email or password is incorrect'));
  }
  yield put(setUser(user));
}

// Individual exports for testing
export default function* loginSaga() {
  yield takeLatest(LOGIN, login);
}
