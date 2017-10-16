import { Action } from '@ngrx/store';
import { Alert } from '../models/alert';

export const SHOW_ALERT = '[Alert] Show Alert';
export const HIDE_ALERT = '[Alert] Hide Alert';

export class ShowAlert implements Action {
  readonly type = SHOW_ALERT;

  constructor(public payload: Alert) {}
}

export class HideAlert implements Action {
  readonly type = HIDE_ALERT;
}

export type Actions = ShowAlert | HideAlert;
