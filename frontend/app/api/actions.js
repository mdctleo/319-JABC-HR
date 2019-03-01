import { SET_RESOURCE } from './constants';

export function setResource(resourceName, id, resource) {
  return {
    type: SET_RESOURCE,
    payload: { resourceName, id, resource },
  };
}
