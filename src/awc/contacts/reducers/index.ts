import { createSelector, createFeatureSelector } from '@ngrx/store';
import { FormGroupState } from 'ngrx-forms';
import * as fromCollection from './collection';
import * as fromCountries from './countries';

import * as fromRoot from '../../reducers';

export interface ContactsState {
  collection: fromCollection.State;
  countries: fromCountries.State;
}

export interface State extends fromRoot.State {
  'contacts': ContactsState;
}

export const reducers = {
  collection: fromCollection.reducer,
  countries: fromCountries.reducer,
};

/** ROOT (contacts) */
export const getContactsState = createFeatureSelector<ContactsState>('contacts');

export const getContactsCollectionState = createSelector(
  getContactsState,
  state => state.collection
);

export const getContactsEntities = createSelector(
    getContactsCollectionState,
    fromCollection.getContacts
);

export const getSelectedContact = createSelector(
  getContactsCollectionState,
  fromCollection.getSelectedContact
);

export const getContactLoading = createSelector(
  getContactsCollectionState,
  fromCollection.getLoading
);

/** COUNTRIES */
export const getCountriesCollectionState = createSelector(
  getContactsState,
  state => state.countries
);

export const getCountriesEntities = createSelector(
  getCountriesCollectionState,
  fromCountries.getCountries
);
