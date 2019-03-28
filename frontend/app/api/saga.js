import { put, all } from 'redux-saga/effects';
import { setResource, setCollection, clearResource } from './actions';
import {
  EmployeeApi,
  IEmployee,
  RolesApi,
  IRole,
  PerformanceApi,
  IPerformancePlan,
  IPerformanceReview,
} from 'api/swagger-api';
const employeeApi = new EmployeeApi();
const rolesApi = new RolesApi();
const performanceApi = new PerformanceApi();

export function* getEmployee(id) {
  const employee = yield employeeApi.getEmployee(id);
  yield put(setResource('employee', employee.id, employee));
}

export function* getEmployees() {
  const employees = yield employeeApi.getEmployees({ inactive: true });
  yield all(employees.map(e => put(setResource('employee', e.id, e))));
}

export function* getManagersByEmployee(employee) {
  const employees = yield employeeApi.getManagersByEmployee(employee.id, { inactive: true });
  yield put(setCollection('managersOfEmployee', employees));
}

export function* getEmployeesByManager(manager) {
  const employees = yield employeeApi.getEmployeesByManager(manager.id, { inactive: true });
  yield put(setCollection('employeesOfManager', employees));
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

export function* updateEmployeePassword(employee) {
  const employeeObj = IEmployee.constructFromObject(employee);
  yield employeeApi.updateEmployeePassword(employee.id, employeeObj);
}

export function* setEmployeesOfManager(idManager, employees) {
  yield employeeApi.setEmployeesOfManager(idManager, employees);
}

export function* setManagersOfEmployee(idEmployee, managers) {
  yield employeeApi.setManagersOfEmployee(idEmployee, managers);
}

export function* createEmployee(employee) {
  const employeeObj = IEmployee.constructFromObject(employee);
  yield employeeApi.createEmployee(employeeObj);
}

export function* getPerformancePlans(id) {
  const plans = yield employeeApi.getPerformancePlans(id);
  yield put(clearResource('plan'));
  yield all(plans.map(p => put(setResource('plan', p.id, p))));
}

export function* getPerformanceReviews(id) {
  const reviews = yield employeeApi.getPerformanceReviews(id);
  yield put(clearResource('review'));
  yield all(reviews.map(r => put(setResource('review', r.id, r))));
}

export function* createPerformancePlan(employeeId, plan) {
  const planObj = IPerformancePlan.constructFromObject(plan);
  yield employeeApi.createPerformancePlan(employeeId, planObj);
}

export function* createPerformanceReview(employeeId, review) {
  const reviewObj = IPerformanceReview.constructFromObject(review);
  yield employeeApi.createPerformanceReview(employeeId, reviewObj);
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

export function* deletePerformancePlan(id) {
  yield performanceApi.deletePerformancePlan(id);
}

export function* deletePerformanceReview(id) {
  yield performanceApi.deletePerformanceReview(id);
}

export function* updatePerformancePlan(plan) {
  const planObj = IPerformancePlan.constructFromObject(plan);
  yield performanceApi.updatePerformancePlan(plan.id, planObj);
}

export function* updatePerformanceReview(review) {
  const reviewObj = IPerformanceReview.constructFromObject(review);
  yield performanceApi.updatePerformanceReview(review.id, reviewObj);
}

export function* linkEmployeeManager(id, idManager) {
  yield employeeApi.linkEmployeeManager(id, idManager);
}

export function* unLinkEmployeeManager(id, idManager) {
  yield employeeApi.unLinkEmployeeManager(id, idManager);
}
