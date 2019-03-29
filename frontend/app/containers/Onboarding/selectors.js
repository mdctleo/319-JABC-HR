import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { selectResource } from 'api/selector';
import { selectProfile } from '../App/selectors';

const selectOnboardingDomain = state => state.get('onboarding', initialState);

const makeSelectOnboarding = () =>
  createSelector(selectOnboardingDomain, substate => substate.toJS());

const selectTasks = createSelector(
  [selectResource('task'), selectResource('documentType'), selectProfile],
  (tasks, documentTypes, profile) => {
    if (tasks && profile) {
      const tasksObj = tasks.toJS();
      return Object.keys(tasksObj)
        .filter(key => {
          const task = tasksObj[key];
          return task.fkEmployee === profile.id;
        })
        .map(key => {
          const task = tasksObj[key];
          let documentType = null;
          if (task.fkDocumentType && documentTypes) {
            documentType = documentTypes.get(`${task.fkDocumentType}`);
          }
          return { ...task, documentType };
        });
    }
    return [];
  },
);

export const selectPendingTasks = createSelector(selectTasks, tasks =>
  tasks.filter(t => t.status === 0),
);

export const selectDoneTasks = createSelector(selectTasks, tasks =>
  tasks.filter(t => t.status === 1),
);
