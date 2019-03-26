/*
 *
 * Performance reducer
 *
 */

import { fromJS } from 'immutable';
import {
  ADD_ROW,
  ADD_SECTION,
  DELETE_ROWS,
  DELETE_SECTION,
  SET_PLAN_COPY,
} from './constants';

export const initialState = fromJS({});

const deleteRows = (state, sectionId, rowIds, isPlan) => {
  const performanceName = isPlan ? 'selectedPlan' : 'selectedReview';
  const performance = state.get(performanceName);
  const sectionIndex = performance
    .get('sections')
    .findIndex(s => s.get('id') === sectionId);
  if (sectionIndex >= 0) {
    const newSections = performance
      .get('sections')
      .update(sectionIndex, section =>
        section.setIn(
          ['data', 'rows'],
          section
            .getIn(['data', 'rows'])
            .filter(r => !rowIds.includes(r.get('id'))),
        ),
      );
    const newPerformance = performance.set('sections', newSections);
    return state.set(performanceName, newPerformance);
  }
  return state;
};

const addRow = (state, sectionId, row, isPlan) => {
  const performanceName = isPlan ? 'selectedPlan' : 'selectedReview';
  const performance = state.get(performanceName);
  const sectionIndex = performance
    .get('sections')
    .findIndex(s => s.get('id') === sectionId);
  if (sectionIndex >= 0) {
    const newSections = performance
      .get('sections')
      .update(sectionIndex, section =>
        section.setIn(
          ['data', 'rows'],
          section.getIn(['data', 'rows']).push(row),
        ),
      );
    const newPerformance = performance.set('sections', newSections);
    return state.set(performanceName, newPerformance);
  }
  return state;
};

const addSection = (state, section, isPlan) => {
  const performanceName = isPlan ? 'selectedPlan' : 'selectedReview';
  const performance = state.get(performanceName);
  const sections = performance.get('sections');
  const maxId =
    sections.size > 0 ? sections.maxBy(s => parseInt(s.sectionId, 10)) : 0;
  const newSection = fromJS({ ...section, id: maxId.get('id') + 1 });
  const newPerformance = performance.set('sections', sections.push(newSection));
  return state.set(performanceName, newPerformance);
};

const deleteSection = (state, sectionId, isPlan) => {
  const performanceName = isPlan ? 'selectedPlan' : 'selectedReview';
  const performance = state.get(performanceName);
  const sections = performance.get('sections');
  const sectionIndex = sections.findIndex(s => s.get('id') === sectionId);
  if (sectionIndex >= 0) {
    const newPerformance = performance.set(
      'sections',
      sections.delete(sectionIndex),
    );
    return state.set(performanceName, newPerformance);
  }
  return state;
};

function performanceReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PLAN_COPY:
      return state.set(
        'selectedPlan',
        fromJS(JSON.parse(JSON.stringify(action.plan))),
      );
    case DELETE_ROWS:
      return deleteRows(state, action.sectionId, action.rowIds, action.isPlan);
    case ADD_ROW:
      return addRow(state, action.sectionId, action.row, action.isPlan);
    case ADD_SECTION:
      return addSection(state, action.section, action.isPlan);
    case DELETE_SECTION:
      return deleteSection(state, action.sectionId, action.isPlan);
    default:
      return state;
  }
}

export default performanceReducer;
