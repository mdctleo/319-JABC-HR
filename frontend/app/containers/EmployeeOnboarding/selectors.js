import { createSelector } from 'reselect';
import { selectResource, selectCollection } from 'api/selector';

const getSelectedEmployee = (_, props) => props.selectedEmployee;

export const selectTasks = createSelector(
  [selectResource('task'), selectResource('documentType'), getSelectedEmployee],
  (tasks, documentTypes, selectedEmployee) => {
    if (tasks && selectedEmployee) {
      const tasksObj = tasks.toJS();
      return Object.keys(tasksObj)
        .filter(key => {
          const task = tasksObj[key];
          return task.fkEmployee === selectedEmployee.id;
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

export const selectAllDocTypes = createSelector(
  [selectCollection('docTypes')],
  docTypes => {
    if (docTypes) {
      return Object.keys(docTypes).map(key => docTypes[key]);
    }
    return [];
  },
);
