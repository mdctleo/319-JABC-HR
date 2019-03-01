import { call, put } from 'redux-saga/effects';
import request from 'utils/request';
import { setResource } from './actions';

export function* getEmployee(id) {
  const employee = yield call(request, `/api/employee/${id}`);
  yield put(setResource('employee', employee.id, employee));
}
