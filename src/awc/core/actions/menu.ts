import { Action } from '@ngrx/store';

export const TOGGLE_MENU = '[Menu] Toggle Menu';
export const HIDE_MENU = '[Menu] Hide Menu';
export const SHOW_MENU = '[Menu] Show Menu';

export class ToggleMenu implements Action {
  readonly type = TOGGLE_MENU;
}

export class ShowMenu implements Action {
  readonly type = SHOW_MENU;
}

export class HideMenu implements Action {
  readonly type = HIDE_MENU;
}

export type Actions = ToggleMenu |
  HideMenu |
  ShowMenu;
