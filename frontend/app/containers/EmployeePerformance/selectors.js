import { createSelector } from 'reselect';
import { selectResource } from 'api/selector';
import { initialState } from './reducer';

const selectPerformanceDomain = state => state.get('employeePerformance', initialState);

export const selectPerofrmanceDomainJS = createSelector(
  [selectPerformanceDomain],
  performanceDomain => performanceDomain.toJS(),
);

export const selectPlanList = createSelector(
  [selectResource('plan')],
  plans => {
    if (plans) {
      const plansObj = plans.toJS();
      return Object.keys(plansObj)
        .map(key => {
          const plan = plansObj[key];
          return {
            id: plan.id,
            startYear: plan.startYear,
            endYear: plan.endYear,
          };
        })
        .sort((a, b) => {
          if (a.startYear === b.startYear) {
            return a.endYear - b.endYear;
          }
          return a.startYear - b.startYear;
        });
    }
    return [];
  },
);

export const selectSelectedPlan = createSelector(
  [selectPerformanceDomain],
  performanceDomain => {
    const selectedPlan = performanceDomain.get('selectedPlan');
    return selectedPlan && selectedPlan.toJS();
  },
);

export const selectSelectedReview = createSelector(
  [selectPerformanceDomain],
  performanceDomain => {
    const selectedReview = performanceDomain.get('selectedReview');
    return selectedReview && selectedReview.toJS();
  },
);
