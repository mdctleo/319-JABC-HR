/*
 *
 * Employees actions
 *
 */

import {
  GET_ALL_EMPLOYEES,
  SELECT_PROFILE,
  SET_EDITING,
  SAVE_EMPLOYEE,
  DELETE_EMPLOYEES,
  UPDATE_TABLE_SETTINGS,
  ADD_EMPLOYEE,
  SET_GENERATING_REPORT
} from './constants';

export function getAllEmployees() {
  return {
    type: GET_ALL_EMPLOYEES,
  };
}

export function selectEmployee(id) {
  return {
    type: SELECT_PROFILE,
    id,
  };
}

export function setEditing(editing) {
  return {
    type: SET_EDITING,
    editing,
  };
}

export function setGeneratingReport(generatingReport) {
  return {
    type: SET_GENERATING_REPORT,
    generatingReport,
  };
}

export function addEmployee(employee) {
  return {
    type: ADD_EMPLOYEE,
    employee,
  };
}

export function saveEmployee(employee) {
  return {
    type: SAVE_EMPLOYEE,
    employee,
  };
}

export function deleteEmployees(employees) {
  return {
    type: DELETE_EMPLOYEES,
    employees,
  };
}

export function updateTableSettings(tableSettings) {
  return {
    type: UPDATE_TABLE_SETTINGS,
    tableSettings,
  };
}

export default {
  getAllEmployees,
  selectEmployee,
  setEditing,
  saveEmployee,
  deleteEmployees,
  updateTableSettings,
  addEmployee,
  setGeneratingReport,
};