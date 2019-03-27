import { takeLatest, call, put, all } from 'redux-saga/effects';
import { GET_ALL_EMPLOYEES, ADD_EMPLOYEE, SAVE_EMPLOYEE, GET_EMPLOYEE_DATA } from './constants';
import { getEmployees, getRolesAsResource, createEmployee, updateEmployee, getManagersByEmployee, getEmployeesByManager } from 'api/saga';
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
    if (e.response) yield put(displayError(e.response.body.message));
  }
}

export function* saveEmployee(action) {
  try {
    yield call(updateEmployee, action.employee);
    yield put(setEditing(false));
  } catch (e) {
    if (e.response) yield put(displayError(e.response.body.message));
  }
}

export function* getEmployeeData(action) {
  yield call(getManagersByEmployee, action.employee);
  yield call(getEmployeesByManager, action.employee);
  yield call(getEmployees);
}

export default function* rolesSaga() {
  yield takeLatest(GET_ALL_EMPLOYEES, getAllEmployees);
  yield takeLatest(GET_EMPLOYEE_DATA, getEmployeeData);
  yield takeLatest(ADD_EMPLOYEE, addEmployee);
  yield takeLatest(SAVE_EMPLOYEE, saveEmployee);
}