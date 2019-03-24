import { takeLatest, select, call, put } from 'redux-saga/effects';
import { GET_PROFILE_DATA, SAVE_PROFILE, UPDATE_PASSWORD } from './constants';
import {
  getEmployee,
  getRole,
  getRoles,
  updateEmployee,
  updateEmployeePassword,
} from 'api/saga';
import { selectProfile, selectUser } from '../App/selectors';
import { displayError } from 'containers/App/actions';
import { setEditing } from './actions';

export function* getProfileData() {
  const user = yield select(selectUser());
  yield call(getEmployee, user.id);
  const profile = yield select(selectProfile);
  yield call(getRoles);
  if (profile.fkRole) {
    yield call(getRole, profile.fkRole);
  }
}

export function* saveProfile(action) {
  try {
    yield call(updateEmployee, action.payload.profile);
    yield put(setEditing(false));
    yield call(getProfileData);
  } catch (e) {
    if (e.response) yield put(displayError(e.response.body.message));
  }
}

export function* updatePassword(action) {
  try {
    yield call(updateEmployeePassword, action.payload.profile);
  } catch (e) {
    console.log(e);
    if (e.response) yield put(displayError(e.response.body.message));
  }
}

// Individual exports for testing
export default function* profileSaga() {
  yield takeLatest(GET_PROFILE_DATA, getProfileData);
  yield takeLatest(SAVE_PROFILE, saveProfile);
  yield takeLatest(UPDATE_PASSWORD, updatePassword);
}
