/*
 *
 * Performance actions
 *
 */

import {
  ADD_ROW,
  ADD_SECTION,
  CREATE_PLAN,
  CREATE_REVIEW,
  DELETE_PERFORMANCE,
  DELETE_ROWS,
  DELETE_SECTION,
  GET_ALL_PLANS,
  RESET,
  SAVE_PLAN,
  SAVE_REVIEW,
  SELECT_PLAN,
  SET_PLAN_COPY,
  SET_REVIEW_COPY,
} from './constants';

export function getAllPlans(selectedEmployee) {
  return {
    type: GET_ALL_PLANS,
    selectedEmployee,
  };
}

export function selectPlan(id) {
  return {
    type: SELECT_PLAN,
    id,
  };
}

export function setPlanCopy(plan) {
  return {
    type: SET_PLAN_COPY,
    plan,
  };
}

export function setReviewCopy(review) {
  return {
    type: SET_REVIEW_COPY,
    review,
  };
}

export function deleteRows(sectionId, rowIds, isPlan) {
  return {
    type: DELETE_ROWS,
    sectionId,
    rowIds,
    isPlan,
  };
}

export function addRow(sectionId, row, isPlan) {
  return {
    type: ADD_ROW,
    sectionId,
    row,
    isPlan,
  };
}

export function addSection(section, isPlan) {
  return {
    type: ADD_SECTION,
    section,
    isPlan,
  };
}

export function deleteSection(sectionId, isPlan) {
  return {
    type: DELETE_SECTION,
    sectionId,
    isPlan,
  };
}

export function deletePerformance(isPlan, selectedEmployee) {
  return {
    type: DELETE_PERFORMANCE,
    isPlan,
    selectedEmployee,
  };
}

export function createPlan(plan, selectedEmployee) {
  return {
    type: CREATE_PLAN,
    plan,
    selectedEmployee,
  };
}

export function createReview(review, selectedEmployee) {
  return {
    type: CREATE_REVIEW,
    review,
    selectedEmployee,
  };
}

export function savePlan(isPublished) {
  return {
    type: SAVE_PLAN,
    isPublished,
  };
}

export function saveReview(isPublished) {
  return {
    type: SAVE_REVIEW,
    isPublished,
  };
}

export function reset() {
  return {
    type: RESET,
  };
}

export default {
  getAllPlans,
  selectPlan,
  deleteRows,
  addRow,
  addSection,
  deleteSection,
  deletePerformance,
  createPlan,
  createReview,
  savePlan,
  saveReview,
  reset,
};
