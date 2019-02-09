import { takeLatest, put } from 'redux-saga/effects';
import { LOGIN } from './constants';
import { setUser } from 'containers/App/actions';
import { loginError } from './actions';

export function* login(action) {
  // TODO: call actual api
  if (action.payload.email === 'admin') {
    yield put(setUser({ email: action.payload.email, role: 3 }));
  } else if (action.payload.email === 'manager') {
    yield put(setUser({ email: action.payload.email, role: 2 }));
  } else if (action.payload.email === 'employee') {
    yield put(setUser({ email: action.payload.email, role: 1 }));
  } else {
    yield put(loginError('Email or password is incorrect'));
  }
}

// Individual exports for testing
export default function* loginSaga() {
  yield takeLatest(LOGIN, login);
}
