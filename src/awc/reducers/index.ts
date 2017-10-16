import {
  ActionReducerMap,
  createSelector,
  createFeatureSelector,
  ActionReducer,
  MetaReducer,
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { RouterStateUrl } from '../shared/utils';
import * as fromRouter from '@ngrx/router-store';

import { storeFreeze } from 'ngrx-store-freeze';

import * as fromLanguage from '../core/reducers/language';
import * as fromMenu from '../core/reducers/menu';
import * as fromAlert from '../core/reducers/alert';

export interface State {
  language: fromLanguage.State;
  menu: fromMenu.State;
  routerReducer: fromRouter.RouterReducerState<RouterStateUrl>;
  alert: fromAlert.State;
}

export const reducers: ActionReducerMap<State> = {
  language: fromLanguage.reducer,
  menu: fromMenu.reducer,
  routerReducer: fromRouter.routerReducer,
  alert: fromAlert.reducer
};

export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return function(state: State, action: any): State {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<State>[] = !environment.production
? [logger, storeFreeze]
: [];

export const getLanguageState = createFeatureSelector<fromLanguage.State>('language');

export const getAvailableLangs = createSelector(getLanguageState, fromLanguage.getAvailableLanguages);

export const getSelectedLang = createSelector(getLanguageState, fromLanguage.getSelectedLang);

export const getMenuState = createFeatureSelector<fromMenu.State>('menu');

export const getMenuDisplaying = createSelector(getMenuState, fromMenu.getMenuDisplaying);

export const getAlertState = createFeatureSelector<fromAlert.State>('alert');

export const getAlert = createSelector(getAlertState, fromAlert.getAlert);
