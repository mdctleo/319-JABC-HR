import { takeLatest, call, put } from 'redux-saga/effects';
import { GET_ALL_EMPLOYEES, ADD_EMPLOYEE } from './constants';
import {
  getEmployees,
  createEmployee,
} from 'api/saga';
import { setEditing } from './actions';
import { displayError } from 'containers/App/actions';

export function* getAllEmployees() {
  yield call(getEmployees);
}

export function* addEmployee(action) {
  try {
    yield call(createEmployee, action.employee);
    yield call(getAllEmployees);
    yield put(setEditing(false));
  } catch (e) {
    if (e.response) yield put(displayError(e.response.body.message));
  }
}

export default function* rolesSaga() {
  yield takeLatest(GET_ALL_EMPLOYEES, getAllEmployees);
  yield takeLatest(ADD_EMPLOYEE, addEmployee);
}
