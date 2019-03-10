import { takeLatest, select } from 'redux-saga/effects';
import { GET_DATA } from './constants';
import { getEmployee } from 'api/saga';
import { selectUser } from '../App/selectors';

export function* getData() {
  const user = yield select(selectUser());
  yield getEmployee(user.id);
}

// Individual exports for testing
export default function* profileSaga() {
  yield takeLatest(GET_DATA, getData);
}
