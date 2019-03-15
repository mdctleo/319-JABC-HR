import { takeLatest, select, call } from 'redux-saga/effects';
import { GET_PROFILE_DATA } from './constants';
import { getEmployee, getRole} from 'api/saga';
import { selectUser } from '../App/selectors';
import { selectProfile } from './selectors';

export function* getProfileData() {
  const user = yield select(selectUser());
  yield call(getEmployee, user.id);
  const profile = yield select(selectProfile);
  if (profile.fkRole) {
    yield call(getRole, profile.fkRole);
  }
}

// Individual exports for testing
export default function* profileSaga() {
  yield takeLatest(GET_PROFILE_DATA, getProfileData);
}
