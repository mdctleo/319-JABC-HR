import { takeLatest, call } from 'redux-saga/effects';
import { GET_HISTORY } from './constants';
import { getEmployeeHistory } from 'api/saga';

export function* getHistory({ selectedEmployee }) {
  if (selectedEmployee) {
    yield call(getEmployeeHistory, selectedEmployee.id);
  }
}

export default function* employeeHistorySaga() {
  yield takeLatest(GET_HISTORY, getHistory);
}
