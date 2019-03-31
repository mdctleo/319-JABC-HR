import { takeLatest, call, put } from 'redux-saga/effects';
import { GET_TASKS, DOWNLOAD_FILE } from './constants';
import { getOnboardingTasks, getOnboardingTaskFile } from 'api/saga';
import { displayError } from 'containers/App/actions';

export function* getTasks({ selectedEmployeeId }) {
  yield call(getOnboardingTasks, selectedEmployeeId);
}

export function* downloadFile({ id }) {
  try {
    yield call(getOnboardingTaskFile, id);
  } catch (e) {
    yield put(displayError(e.response ? e.response.body.message : e.message));
  }
}

export default function* employeeOnboardingSaga() {
  yield takeLatest(GET_TASKS, getTasks);
  yield takeLatest(DOWNLOAD_FILE, downloadFile);
}
