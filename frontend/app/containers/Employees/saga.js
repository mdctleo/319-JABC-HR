import { takeLatest, call } from 'redux-saga/effects';
import { GET_ALL_EMPLOYEES } from './constants';
import {
  getEmployees,
} from 'api/saga';

export function* getAllEmployees() {
  yield call(getEmployees);
}

export default function* rolesSaga() {
  yield takeLatest(GET_ALL_EMPLOYEES, getAllEmployees);
}
