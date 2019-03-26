import { select, takeLatest, call, put } from 'redux-saga/effects';
import {GET_ALL_PLANS, SELECT_PLAN} from './constants';
import { selectProfile } from '../App/selectors';
import { getPerformancePlans } from 'api/saga';
import { selectResource } from 'api/selector';
import {setPlanCopy} from './actions';

export function* getAllPlans() {
  const profile = yield select(selectProfile);
  yield call(getPerformancePlans, profile.id);
}

export function* selectPlan(action) {
  const plans = yield select(selectResource('plan'));
  if (plans) {
    yield put(setPlanCopy(plans.get(`${action.id}`)));
  }
}

export default function* performanceSaga() {
  yield takeLatest(GET_ALL_PLANS, getAllPlans);
  yield takeLatest(SELECT_PLAN, selectPlan);
}
