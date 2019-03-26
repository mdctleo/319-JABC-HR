/*
 *
 * Performance actions
 *
 */

import {
  ADD_ROW,
  ADD_SECTION,
  DELETE_ROWS,
  DELETE_SECTION,
  GET_ALL_PLANS,
  SELECT_PLAN,
  SET_PLAN_COPY,
} from './constants';

export function getAllPlans() {
  return {
    type: GET_ALL_PLANS,
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

export default {
  getAllPlans,
  selectPlan,
  deleteRows,
  addRow,
  addSection,
  deleteSection,
};
