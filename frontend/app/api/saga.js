import { call, put } from 'redux-saga/effects';
import request from 'utils/request';
import { setResource } from './actions';

export function* getEmployee(id) {
  const employee = yield call(request, `/JABC/1.0.0/employee/${id}`);
  yield put(setResource('employee', employee.id, employee));
}
