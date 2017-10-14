import { Action } from '@ngrx/store';

export const CHANGE_LANGUAGE = '[Language] Change Language';
export const LOAD_LANGUAGES = '[Language] Load Languages';

export class ChangeLanguage implements Action {
  readonly type = CHANGE_LANGUAGE;

  constructor(public payload: string) {}
}

export class LoadLanguages implements Action {
  readonly type = LOAD_LANGUAGES;
}

export type Actions = ChangeLanguage | LoadLanguages;
