import { takeLatest, select, call } from 'redux-saga/effects';
import { GET_PROFILE_DATA, SAVE_PROFILE } from './constants';
import {
  getEmployee,
  getRole,
  updateEmployee,
  getCompetenciesForRole,
} from 'api/saga';
import { selectProfile, selectUser } from '../App/selectors';
import { selectRole } from './selectors';

export function* getProfileData() {
  const user = yield select(selectUser());
  yield call(getEmployee, user.id);
  const profile = yield select(selectProfile);
  if (profile.fkRole) {
    yield call(getRole, profile.fkRole);
    const role = yield select(selectRole);
    // yield call(getCompetenciesForRole, role.id);
  }
}

export function* saveProfile(action) {
  yield updateEmployee(action.payload.profile);
}

// Individual exports for testing
export default function* profileSaga() {
  yield takeLatest(GET_PROFILE_DATA, getProfileData);
  yield takeLatest(SAVE_PROFILE, saveProfile);
}
