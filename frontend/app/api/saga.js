import { put, all } from 'redux-saga/effects';
import { setResource } from './actions';
import { displayError } from 'containers/App/actions';
import { EmployeeApi, IEmployee, RolesApi, IRole } from 'api/swagger-api';
const employeeApi = new EmployeeApi();
const rolesApi = new RolesApi();

export function* getEmployee(id) {
  const employee = yield employeeApi.getEmployee(id);
  yield put(setResource('employee', employee.id, employee));
}

export function* updateEmployee(employee) {
  try {
    const employeeObj = IEmployee.constructFromObject(employee);
    const response = yield employeeApi.updateEmployee(employee.id, employeeObj);
    if (response.type === 'SUCCESS') {
      yield put(setResource('employee', employee.id, employeeObj));
    }
  } catch (e) {
    yield put(displayError(e.response.body.message));
  }
}

export function* getRole(id) {
  const role = yield rolesApi.getRole(id);
  yield put(setResource('role', role.id, role));
}

export function* getRoles() {
  const roles = yield rolesApi.getRoles();
  yield all(roles.map(role => put(setResource('role', role.id, role))));
}

export function* updateRole(role) {
  const roleObj = IRole.constructFromObject(role);
  const response = yield rolesApi.updateRole(role.id, roleObj);
  if (response.type === 'SUCCESS') {
    yield put(setResource('role', role.id, roleObj));
  }
}

export function* createRole(role) {
  const roleObj = IRole.constructFromObject(role);
  yield rolesApi.createRole(roleObj);
}
