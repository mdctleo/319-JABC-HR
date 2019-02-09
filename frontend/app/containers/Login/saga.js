import { takeLatest, call, put, select } from 'redux-saga/effects';
import { LOGIN } from './constants';
import { setUser } from 'containers/App/actions';

export function* login(action) {
  // TODO: call actual api
  console.log(action.payload);
  yield put(setUser({name: 'Bob'}));
}

// Individual exports for testing
export default function* loginSaga() {
  yield takeLatest(LOGIN, login);
}
