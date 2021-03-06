import { takeLatest, call, put } from 'redux-saga/effects';
import { GET_TASKS, DOWNLOAD_FILE, CREATE_TASK, GET_ALL_DOC_TYPES } from './constants';
import { getOnboardingTasks, getOnboardingTaskFile, createOnboardingTask, createDocumentType, getDocumentTypes } from 'api/saga';
import { displayError } from 'containers/App/actions';

export function* getAllDocTypes() {
  yield call(getDocumentTypes);
}

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

export function* createTask({ selectedEmployeeId, onboardingTask }) {
  try {
    yield call(createOnboardingTask, selectedEmployeeId, onboardingTask);
    yield call(getTasks, { selectedEmployeeId });
  } catch (e) {
    yield put(displayError(e.response ? e.response.body.message : e.message));
  }
}


export default function* employeeOnboardingSaga() {
  yield takeLatest(GET_TASKS, getTasks);
  yield takeLatest(DOWNLOAD_FILE, downloadFile);
  yield takeLatest(CREATE_TASK, createTask);
  yield takeLatest(GET_ALL_DOC_TYPES, getAllDocTypes);
}
