import { SET_RESOURCE, SET_COLLECTION, CLEAR_RESOURCE } from './constants';

export function setResource(resourceName, id, resource) {
  return {
    type: SET_RESOURCE,
    payload: { resourceName, id, resource },
  };
}

export function clearResource(resourceName) {
  return {
    type: CLEAR_RESOURCE,
    payload: { resourceName },
  };
}

export function setCollection(collectionName, collection) {
  return {
    type: SET_COLLECTION,
    payload: { collectionName, collection },
  };
}
