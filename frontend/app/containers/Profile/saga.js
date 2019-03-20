import { takeLatest, select, call, put } from 'redux-saga/effects';
import { GET_PROFILE_DATA, SAVE_PROFILE } from './constants';
import { getEmployee, getRole, getRoles, updateEmployee } from 'api/saga';
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
    yield updateEmployee(action.payload.profile);
    yield put(setEditing(false));
  } catch (e) {
    if (e.response) yield put(displayError(e.response.body.message));
  }
}

// Individual exports for testing
export default function* profileSaga() {
  yield takeLatest(GET_PROFILE_DATA, getProfileData);
  yield takeLatest(SAVE_PROFILE, saveProfile);
}
