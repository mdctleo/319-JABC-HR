import { createSelector } from 'reselect';
import { initialState } from './reducer';

export const selectResources = state => state.get('resources', initialState);

export const selectResource = resourceName =>
  createSelector(selectResources, state => state.get(resourceName));

export const selectCollection = collectionName =>
  createSelector(selectResources, state =>
    state.getIn(['collections', collectionName]),
  );
