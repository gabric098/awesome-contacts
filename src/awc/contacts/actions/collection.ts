import { Action } from '@ngrx/store';
import { Contact } from '../models/contact';

export const LOAD = '[Collection] Load';
export const LOAD_SUCCESS = '[Collection] Load Success';
export const LOAD_FAIL = '[Collection] Load Fail';
export const LOAD_ITEM = '[Collection] Load Item';
export const LOAD_ITEM_SUCCESS = '[Collection] Load Item Success';
export const LOAD_ITEM_FAIL = '[Collection] Load Item Fail';
export const UPDATE_ITEM = '[Collection] Update Item';
export const UPDATE_ITEM_SUCCESS = '[Collection] Update Item Success';
export const UPDATE_ITEM_FAIL = '[Collection] Update Item FAIL';
export const CREATE_ITEM = '[Collection] Create Item';
export const CREATE_ITEM_SUCCESS = '[Collection] Create Item Success';
export const CREATE_ITEM_FAIL = '[Collection] Create Item FAIL';
export const DELETE_ITEM = '[Collection] Delete Item';
export const DELETE_ITEM_SUCCESS = '[Collection] Delete Item Success';
export const DELETE_ITEM_FAIL = '[Collection] Delete Item FAIL';
export const SELECT_ITEM = '[Collection] Select Item';
export const DESELECT_ITEM = '[Collection] Deselect Item';

/**
 * Load Collection Actions
 */
export class Load implements Action {
  readonly type = LOAD;
}

export class LoadSuccess implements Action {
  readonly type = LOAD_SUCCESS;

  constructor(public payload: Contact[]) {}
}

export class LoadFail implements Action {
  readonly type = LOAD_FAIL;

  constructor(public payload: any) {}
}

export class LoadItem implements Action {
  readonly type = LOAD_ITEM;

  constructor(public payload: number) {}
}

export class LoadItemSuccess implements Action {
  readonly type = LOAD_ITEM_SUCCESS;

  constructor(public payload: Contact) {}
}

export class LoadItemFail implements Action {
  readonly type = LOAD_ITEM_FAIL;

  constructor(public payload: any) {}
}

export class UpdateItem implements Action {
  readonly type = UPDATE_ITEM;

  constructor(public payload: Contact) {}
}

export class UpdateItemSuccess implements Action {
  readonly type = UPDATE_ITEM_SUCCESS;

  constructor(public payload: Contact) {}
}

export class UpdateItemFail implements Action {
  readonly type = UPDATE_ITEM_FAIL;

  constructor(public payload: any) {}
}

export class CreateItem implements Action {
  readonly type = CREATE_ITEM;

  constructor(public payload: Contact) {}
}

export class CreateItemSuccess implements Action {
  readonly type = CREATE_ITEM_SUCCESS;

  constructor(public payload: Contact) {}
}

export class CreateItemFail implements Action {
  readonly type = CREATE_ITEM_FAIL;

  constructor(public payload: any) {}
}

export class DeleteItem implements Action {
  readonly type = DELETE_ITEM;

  constructor(public payload: number) {}
}

export class DeleteItemSuccess implements Action {
  readonly type = DELETE_ITEM_SUCCESS;

  constructor(public payload: number) {}
}

export class DeleteItemFail implements Action {
  readonly type = DELETE_ITEM_FAIL;

  constructor(public payload: any) {}
}

export class SelectItem implements Action {
  readonly type = SELECT_ITEM;

  constructor(public payload: number) {}
}

export class DeselectItem implements Action {
  readonly type = DESELECT_ITEM;
}

export type Actions = Load
  | LoadSuccess
  | LoadFail
  | LoadItem
  | LoadItemSuccess
  | LoadItemFail
  | SelectItem
  | UpdateItem
  | UpdateItemFail
  | UpdateItemSuccess
  | CreateItem
  | CreateItemSuccess
  | CreateItemFail
  | DeleteItem
  | DeleteItemSuccess
  | DeleteItemFail
  | DeselectItem;
