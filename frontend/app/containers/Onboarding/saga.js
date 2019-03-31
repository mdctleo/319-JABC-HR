import { takeLatest, call, select, put } from 'redux-saga/effects';
import { GET_TASKS, UPLOAD_DOCUMENT, DOWNLOAD_TEMPLATE, DOWNLOAD_FILE } from './constants';
import {
  getOnboardingTasks,
  updateOnboardingTask,
  completeOnboardingTask,
  getDocumentTypeFile,
  getOnboardingTaskFile,
} from 'api/saga';
import { selectProfile } from '../App/selectors';
import { displayError } from 'containers/App/actions';

export function* getTasks() {
  const profile = yield select(selectProfile);
  yield call(getOnboardingTasks, profile.id);
}

export function* uploadDocument({ document, expiry }) {
  const newDocument = { ...document, expiryDate: expiry };
  const profile = yield select(selectProfile);
  try {
    yield call(updateOnboardingTask, newDocument.id, newDocument);
    yield call(
      completeOnboardingTask,
      profile.id,
      newDocument.id,
      document.fileData,
    );
    yield call(getTasks);
  } catch (e) {
    yield put(displayError(e.response ? e.response.body.message : e.message));
  }
}

export function* downloadTemplate({ id }) {
  try {
    yield call(getDocumentTypeFile, id);
  } catch (e) {
    yield put(displayError(e.response ? e.response.body.message : e.message));
  }
}

export function* downloadFile({ id }) {
  try {
    yield call(getOnboardingTaskFile, id);
  } catch (e) {
    yield put(displayError(e.response ? e.response.body.message : e.message));
  }
}

export default function* onboardingSaga() {
  yield takeLatest(GET_TASKS, getTasks);
  yield takeLatest(UPLOAD_DOCUMENT, uploadDocument);
  yield takeLatest(DOWNLOAD_TEMPLATE, downloadTemplate);
  yield takeLatest(DOWNLOAD_FILE, downloadFile);
}
