import { takeLatest, call, select } from 'redux-saga/effects';
import { GET_TASKS } from './constants';
import { getOnboardingTasks } from 'api/saga';
import { selectProfile } from '../App/selectors';

export function* getTasks() {
  const profile = yield select(selectProfile);
  yield call(getOnboardingTasks, profile.id);
}

export default function* onboardingSaga() {
  yield takeLatest(GET_TASKS, getTasks);
}
