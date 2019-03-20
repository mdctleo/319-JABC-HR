import { takeLatest, call, select, put, all } from 'redux-saga/effects';
import { GET_ALL_ROLES, GET_ROLE, SAVE_ROLE, DELETE_ROLES } from './constants';
import {
  getRoles,
  getRole as getRoleApi,
  updateRole,
  createRole,
  deleteRole,
} from 'api/saga';
import { selectSelectedRoleId } from './selectors';
import { setEditing } from './actions';
import { displayError } from 'containers/App/actions';

export function* getAllRoles() {
  yield call(getRoles);
}

export function* getRole(action) {
  if (action.id) {
    yield call(getRoleApi, action.id);
  }
}

export function* saveRole(action) {
  const selectedRole = yield select(selectSelectedRoleId);
  try {
    if (selectedRole) {
      yield call(updateRole, action.role);
    } else {
      yield call(createRole, action.role);
      yield call(getAllRoles);
    }
    yield put(setEditing(false));
  } catch (e) {
    if (e.response) yield put(displayError(e.response.body.message));
  }
}

export function* deleteRoles(action) {
  try {
    yield all(action.roles.map(roleId => call(deleteRole, roleId)));
    yield call(getAllRoles);
  } catch (e) {
    if (e.response) yield put(displayError(e.response.body.message));
  }
}

export default function* rolesSaga() {
  yield takeLatest(GET_ALL_ROLES, getAllRoles);
  yield takeLatest(GET_ROLE, getRole);
  yield takeLatest(SAVE_ROLE, saveRole);
  yield takeLatest(DELETE_ROLES, deleteRoles);
}
