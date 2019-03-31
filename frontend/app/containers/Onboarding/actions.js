/*
 *
 * Onboarding actions
 *
 */

import {
  GET_TASKS,
  UPLOAD_DOCUMENT,
  DOWNLOAD_TEMPLATE,
  DOWNLOAD_FILE,
} from './constants';

export function getTasks() {
  return {
    type: GET_TASKS,
  };
}

export function uploadDocument(document, expiry) {
  return {
    type: UPLOAD_DOCUMENT,
    document,
    expiry,
  };
}

export function downloadTemplate(id) {
  return {
    type: DOWNLOAD_TEMPLATE,
    id,
  };
}

export function downloadFile(id) {
  return {
    type: DOWNLOAD_FILE,
    id,
  };
}

export default {
  getTasks,
  uploadDocument,
  downloadTemplate,
  downloadFile,
};
