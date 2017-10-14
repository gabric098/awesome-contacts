import { Action } from '@ngrx/store';
import { Country } from '../models/country';

export const LOAD = '[Country] Load';
export const LOAD_SUCCESS = '[Country] Load Success';
export const LOAD_FAIL = '[Country] Load Fail';

/**
 * Load Collection Actions
 */
export class Load implements Action {
  readonly type = LOAD;
}

export class LoadSuccess implements Action {
  readonly type = LOAD_SUCCESS;

  constructor(public payload: Country[]) {}
}

export class LoadFail implements Action {
  readonly type = LOAD_FAIL;

  constructor(public payload: any) {}
}

export type Actions = Load
  | LoadSuccess
  | LoadFail;
