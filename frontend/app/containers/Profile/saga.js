import { takeLatest, select, call } from 'redux-saga/effects';
import { GET_PROFILE_DATA, SAVE_PROFILE } from './constants';
import { getEmployee, getRole, updateEmployee } from 'api/saga';
import { selectProfile, selectUser } from '../App/selectors';

export function* getProfileData() {
  const user = yield select(selectUser());
  yield call(getEmployee, user.id);
  const profile = yield select(selectProfile);
  if (profile.fkRole) {
    yield call(getRole, profile.fkRole);
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
