import { put, all } from 'redux-saga/effects';
import { setResource, setCollection } from './actions';
import { EmployeeApi, IEmployee, RolesApi, IRole } from 'api/swagger-api';
const employeeApi = new EmployeeApi();
const rolesApi = new RolesApi();

export function* getEmployee(id) {
  const employee = yield employeeApi.getEmployee(id);
  yield put(setResource('employee', employee.id, employee));
}

export function* getEmployees() {
  const employees = yield employeeApi.getEmployees();
  yield all(employees.map(e => put(setResource('employee', e.id, e))));
}

export function* updateEmployee(employee) {
  if (employee.birthdate === '') employee.birthdate = null;
  if (employee.dateJoined === '') employee.dateJoined = null;
  const employeeObj = IEmployee.constructFromObject(employee);
  const response = yield employeeApi.updateEmployee(employee.id, employeeObj);
  if (response.type === 'SUCCESS') {
    yield put(setResource('employee', employee.id, employeeObj));
  }
}

export function* createEmployee(employee) {
  const employeeObj = IEmployee.constructFromObject(employee);
  yield employeeApi.createEmployee(employeeObj);
}

export function* getRole(id) {
  const role = yield rolesApi.getRole(id);
  yield put(setResource('role', role.id, role));
}

export function* deleteRole(id) {
  yield rolesApi.deleteRole(id);
}

export function* getRoles() {
  const roles = yield rolesApi.getRoles();
  yield put(setCollection('roles', roles));
}

export function* getRolesAsResource() {
  const roles = yield rolesApi.getRoles();
  yield all(roles.map(r => put(setResource('role', r.id, r))));
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
