import { select, takeLatest, call, put } from 'redux-saga/effects';
import {
  GET_ALL_PLANS,
  SELECT_PLAN,
  DELETE_PERFORMANCE,
  CREATE_PLAN,
  CREATE_REVIEW,
  SAVE_PLAN,
  SAVE_REVIEW,
  GET_ROLE
} from './constants';
import {
  getPerformancePlans,
  getPerformanceReviews,
  deletePerformancePlan,
  deletePerformanceReview,
  createPerformancePlan,
  createPerformanceReview,
  updatePerformancePlan,
  updatePerformanceReview,
  getRole
} from 'api/saga';
import { selectResource } from 'api/selector';
import { setPlanCopy, setReviewCopy } from './actions';
import { displayError } from 'containers/App/actions';
import { selectSelectedPlan, selectSelectedReview } from './selectors';

export function* getAllPlans({ selectedEmployee }) {
  try {
    yield call(getPerformancePlans, selectedEmployee.id);
  } catch (e) {}
  try {
    yield call(getPerformanceReviews, selectedEmployee.id);
  } catch (e) {}
}

export function* selectPlan(action) {
  const plans = yield select(selectResource('plan'));
  if (plans) {
    yield put(setPlanCopy(plans.get(`${action.id}`)));
  }
  const reviews = yield select(selectResource('review'));
  if (reviews) {
    const review = reviews.find(r => r.fkPerformancePlan === action.id);
    if (review) {
      yield put(setReviewCopy(review));
    }
  }
}

export function* deletePerformance(action) {
  try {
    if (action.isPlan) {
      const plan = yield select(selectSelectedPlan);
      yield call(deletePerformancePlan, plan.id);
      yield put(setPlanCopy(null));
      yield call(getAllPlans, { selectedEmployee: action.selectedEmployee });
    } else {
      const review = yield select(selectSelectedReview);
      yield call(deletePerformanceReview, review.id);
      yield put(setReviewCopy(null));
    }
  } catch (e) {
    yield put(displayError(e.response ? e.response.body.message : e.message));
  }
}

export function* createPlan({ plan, selectedEmployee }) {
  try {
    yield call(createPerformancePlan, selectedEmployee.id, plan);
    yield call(getAllPlans, { selectedEmployee });
    const plans = yield select(selectResource('plan'));
    if (plans) {
      const newPlan = plans.find(
        p =>
          p.createDate === plan.createDate &&
          p.endYear === plan.endYear &&
          p.startYear === plan.startYear &&
          p.fkEmployee === plan.fkEmployee,
      );
      if (newPlan) {
        yield put(setPlanCopy(newPlan));
      }
    }
    const reviews = yield select(selectResource('review'));
    if (reviews) {
      yield put(
        setReviewCopy(
          reviews.find(r => r.fkPerformancePlan === selectedEmployee.id),
        ),
      );
    }
  } catch (e) {
    yield put(displayError(e.response ? e.response.body.message : e.message));
  }
}

export function* createReview({ review, selectedEmployee }) {
  try {
    yield call(createPerformanceReview, selectedEmployee.id, review);
    yield call(getAllPlans, { selectedEmployee });
    const reviews = yield select(selectResource('review'));
    if (reviews) {
      yield put(
        setReviewCopy(
          reviews.find(r => r.fkPerformancePlan === review.fkPerformancePlan),
        ),
      );
    }
  } catch (e) {
    yield put(displayError(e.response ? e.response.body.message : e.message));
  }
}

export function* savePlan({ isPublished }) {
  try {
    const plan = yield select(selectSelectedPlan);
    plan.status = isPublished ? 1 : 0;
    yield call(updatePerformancePlan, plan);
  } catch (e) {
    yield put(displayError(e.response ? e.response.body.message : e.message));
  }
}

export function* saveReview({ isPublished }) {
  try {
    const review = yield select(selectSelectedReview);
    review.status = isPublished ? 1 : 0;
    yield call(updatePerformanceReview, review);
  } catch (e) {
    yield put(displayError(e.response ? e.response.body.message : e.message));
  }
}

export function* getPerformanceRole({ selectedEmployee }) {
  try {
    yield call(getRole, selectedEmployee.fkRole);
  } catch (e) {
    yield put(displayError(e.response ? e.response.body.message : e.message));
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
  yield takeLatest(GET_ROLE, getPerformanceRole);
}
