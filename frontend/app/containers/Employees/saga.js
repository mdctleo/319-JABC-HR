import { takeLatest, call, put, all } from 'redux-saga/effects';
import {
  GET_ALL_EMPLOYEES,
  ADD_EMPLOYEE,
  SAVE_EMPLOYEE,
  UPDATE_PASSWORD,
  GET_EMPLOYEE_DATA,
} from './constants';
import {
  getEmployees,
  getRolesAsResource,
  createEmployee,
  updateEmployee,
  updateEmployeePassword,
  setEmployeesOfManager,
  setManagersOfEmployee,
  getManagersByEmployee,
  getEmployeesByManager,
} from 'api/saga';
import { setEditing } from './actions';
import { displayError } from 'containers/App/actions';

export function* getAllEmployees() {
  yield all([call(getEmployees), call(getRolesAsResource)]);
}

export function* addEmployee(action) {
  try {
    yield call(createEmployee, action.employee);
    yield call(getEmployees);
    yield put(setEditing(false));
  } catch (e) {
    yield put(displayError(e.response ? e.response.body.message : e.message));
  }
}

export function* saveEmployee(action) {
  try {
    yield call(updateEmployee, action.employee);
    if(action.employees){
      yield call(setEmployeesOfManager, action.employee.id, action.employees);
    }
    if(action.managers){
      yield call(setManagersOfEmployee, action.employee.id, action.managers);
    }
    yield put(setEditing(false));
  } catch (e) {
    yield put(displayError(e.response ? e.response.body.message : e.message));
  }
}

export function* updatePassword(action) {
  try {
    yield call(updateEmployeePassword, action.employee);
  } catch (e) {
    yield put(displayError(e.response ? e.response.body.message : e.message));
  }
}

export function* getEmployeeData(action) {
  try {
    yield call(getManagersByEmployee, action.employee);
    yield call(getEmployeesByManager, action.employee);
  } catch (e) {}
  try {
    yield call(getEmployees);
  } catch (e) {
    yield put(displayError(e.response ? e.response.body.message : e.message));
  }
}

export default function* rolesSaga() {
  yield takeLatest(GET_ALL_EMPLOYEES, getAllEmployees);
  yield takeLatest(GET_EMPLOYEE_DATA, getEmployeeData);
  yield takeLatest(ADD_EMPLOYEE, addEmployee);
  yield takeLatest(SAVE_EMPLOYEE, saveEmployee);
  yield takeLatest(UPDATE_PASSWORD, updatePassword);
}
