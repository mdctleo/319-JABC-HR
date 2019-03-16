import { put } from 'redux-saga/effects';
import { setResource } from './actions';
import { EmployeeApi, RolesApi } from 'api/swagger-api';
const employeeApi = new EmployeeApi();
const rolesApi = new RolesApi();

export function* getEmployee(id) {
  const employee = yield employeeApi.getEmployee(id);
  yield put(setResource('employee', employee.id, employee));
}

export function* getRole(id) {
  const role = yield rolesApi.getRole(id);
  yield put(setResource('role', role.id, role));
}
