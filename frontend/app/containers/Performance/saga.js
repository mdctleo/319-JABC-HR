import { select, takeLatest, call, put } from 'redux-saga/effects';
import {
  GET_ALL_PLANS,
  SELECT_PLAN,
  DELETE_PERFORMANCE,
  CREATE_PLAN,
  CREATE_REVIEW,
  SAVE_PLAN,
  SAVE_REVIEW,
} from './constants';
import { selectProfile } from '../App/selectors';
import {
  getPerformancePlans,
  getPerformanceReviews,
  deletePerformancePlan,
  deletePerformanceReview,
  createPerformancePlan,
  createPerformanceReview,
  updatePerformancePlan,
  updatePerformanceReview,
} from 'api/saga';
import { selectResource } from 'api/selector';
import { setPlanCopy, setReviewCopy } from './actions';
import { displayError } from 'containers/App/actions';
import { selectSelectedPlan, selectSelectedReview } from './selectors';

export function* getAllPlans() {
  const profile = yield select(selectProfile);
  try {
    yield call(getPerformancePlans, profile.id);
  } catch (e) {}
  try {
    yield call(getPerformanceReviews, profile.id);
  } catch (e) {}
}

export function* selectPlan(action) {
  const plans = yield select(selectResource('plan'));
  if (plans) {
    yield put(setPlanCopy(plans.get(`${action.id}`)));
  }
  const reviews = yield select(selectResource('review'));
  if (reviews) {
    yield put(
      setReviewCopy(reviews.find(r => r.fkPerformancePlan === action.id)),
    );
  }
}

export function* deletePerformance(action) {
  try {
    if (action.isPlan) {
      const plan = yield select(selectSelectedPlan);
      yield call(deletePerformancePlan, plan.id);
      yield put(setPlanCopy(null));
      yield call(getAllPlans);
    } else {
      const review = yield select(selectSelectedReview);
      yield call(deletePerformanceReview, review.id);
      yield put(setReviewCopy(null));
    }
  } catch (e) {
    yield put(displayError(e.response ? e.response.body.message : e));
  }
}

export function* createPlan({ plan }) {
  try {
    const profile = yield select(selectProfile);
    yield call(createPerformancePlan, profile.id, plan);
    yield call(getAllPlans);
  } catch (e) {
    yield put(displayError(e.response ? e.response.body.message : e));
  }
}

export function* createReview({ review }) {
  try {
    const profile = yield select(selectProfile);
    yield call(createPerformanceReview, profile.id, review);
    yield call(getAllPlans);
  } catch (e) {
    yield put(displayError(e.response ? e.response.body.message : e));
  }
}

export function* savePlan({ isPublished }) {
  try {
    const plan = yield select(selectSelectedPlan);
    plan.status = isPublished ? 1 : 0;
    yield call(updatePerformancePlan, plan);
  } catch (e) {
    yield put(displayError(e.response ? e.response.body.message : e));
  }
}

export function* saveReview({ isPublished }) {
  try {
    const review = yield select(selectSelectedReview);
    review.status = isPublished ? 1 : 0;
    yield call(updatePerformanceReview, review);
  } catch (e) {
    yield put(displayError(e.response ? e.response.body.message : e));
  }
}

export default function* performanceSaga() {
  yield takeLatest(GET_ALL_PLANS, getAllPlans);
  yield takeLatest(SELECT_PLAN, selectPlan);
  yield takeLatest(DELETE_PERFORMANCE, deletePerformance);
  yield takeLatest(CREATE_PLAN, createPlan);
  yield takeLatest(CREATE_REVIEW, createReview);
  yield takeLatest(SAVE_PLAN, savePlan);
  yield takeLatest(SAVE_REVIEW, saveReview);
}
