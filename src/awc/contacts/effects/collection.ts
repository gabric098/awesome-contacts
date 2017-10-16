import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import { Contact } from '../models/contact';
import { Alert, AlertType } from '../../core/models/alert';
import { ContactsService } from '../services/contacts.service';
import { of } from 'rxjs/observable/of';
import * as collection from '../actions/collection';
import * as router from '../../core/actions/router';
import * as menu from '../../core/actions/menu';
import * as alert from '../../core/actions/alert';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';

@Injectable()
export class CollectionEffects {

  constructor(private actions$: Actions, private contactsService: ContactsService) {}

  @Effect()
  loadCollection$: Observable<Action> = this.actions$
    .ofType(collection.LOAD)
    .switchMap(() =>
      this.contactsService
        .getContacts()
        .map((contacts: Contact[]) => {
          return new collection.LoadSuccess(contacts);
        })
        .catch(error => of(new collection.LoadFail(error)))
  );

  @Effect()
  loadItem$: Observable<Action> = this.actions$
    .ofType(collection.LOAD_ITEM)
    .map((action: collection.LoadItem) => action.payload)
    .switchMap((contactId: number) => this.contactsService
      .getContact(contactId)
      .map((contact: Contact) => {
        return new collection.LoadItemSuccess(contact);
      })
      .catch(error => of(new collection.LoadItemFail(error)))
  );

  @Effect()
  updateItem$: Observable<Action> = this.actions$
    .ofType(collection.UPDATE_ITEM)
    .map((action: collection.UpdateItem) => action.payload)
    .switchMap((contact: Contact) => this.contactsService
      .updateContact(contact)
      .map((contactR: Contact) => {
        return new collection.UpdateItemSuccess(contactR);
      })
      .catch(error => of(new collection.UpdateItemFail(error)))
  );

  @Effect()
  createItem$: Observable<Action> = this.actions$
    .ofType(collection.CREATE_ITEM)
    .map((action: collection.CreateItem) => action.payload)
    .switchMap((contact: Contact) => this.contactsService
      .createContact(contact)
      .map((contactR: Contact) => {
        return new collection.CreateItemSuccess(contactR);
      })
      .catch(error => of(new collection.CreateItemFail(error)))
  );

  @Effect()
  deleteItem$: Observable<Action> = this.actions$
    .ofType(collection.DELETE_ITEM)
    .map((action: collection.DeleteItem) => action.payload)
    .switchMap((contactId: number) => this.contactsService
      .deleteContact(contactId)
      .map((contactR: Contact) => {
        return new collection.DeleteItemSuccess(contactId);
      })
      .catch(error => of(new collection.DeleteItemFail(error)))
  );

  @Effect()
  onDeleteItemResult: Observable<Action> = this.actions$
    .ofType(collection.DELETE_ITEM_SUCCESS || collection.DELETE_ITEM_FAIL)
    .map((action: collection.DeleteItemSuccess | collection.DeleteItemFail) => {
      if (action.type === collection.DELETE_ITEM_SUCCESS) {
        return new alert.ShowAlert({ message: 'Contact deleted', type: AlertType.Notice});
      } else {
        return new alert.ShowAlert({ message: 'Error deleting contact', type: AlertType.Error});
      }
  });

  @Effect()
  onCreateItemResult: Observable<Action> = this.actions$
    .ofType(collection.CREATE_ITEM_SUCCESS || collection.CREATE_ITEM_SUCCESS)
    .map((action: collection.CreateItemSuccess | collection.CreateItemFail) => {
      if (action.type === collection.CREATE_ITEM_SUCCESS) {
        return new alert.ShowAlert({ message: 'Contact created', type: AlertType.Notice});
      } else {
        return new alert.ShowAlert({ message: 'Error creating contact', type: AlertType.Error});
      }
  });

  @Effect()
  onUpdateItemResult: Observable<Action> = this.actions$
    .ofType(collection.UPDATE_ITEM_SUCCESS || collection.UPDATE_ITEM_FAIL)
    .map((action: collection.UpdateItemSuccess | collection.UpdateItemFail) => {
      if (action.type === collection.UPDATE_ITEM_SUCCESS) {
        return new alert.ShowAlert({ message: 'Contact updated', type: AlertType.Notice});
      } else {
        return new alert.ShowAlert({ message: 'Error updating contact', type: AlertType.Error});
      }
  });

  @Effect()
  onSaveSuccess$: Observable<Action> = this.actions$
    .ofType(collection.CREATE_ITEM_SUCCESS || collection.UPDATE_ITEM_SUCCESS)
    .map((action: collection.CreateItemSuccess | collection.UpdateItemSuccess) => action.payload)
    .map((contact: Contact) => new router.Go({
      path: ['/contacts/view', contact.id]
    }));

  @Effect()
  onLoadItemSuccess$: Observable<Action> = this.actions$
    .ofType(collection.LOAD_ITEM_SUCCESS)
    .map((action: collection.LoadItemSuccess) => new menu.HideMenu());

  @Effect()
  onLoadItemFail$: Observable<Action> = this.actions$
    .ofType(collection.LOAD_ITEM_FAIL)
    .map((action: collection.LoadItemFail) => new alert.ShowAlert({ message: 'Error loading contact', type: AlertType.Notice}));

  @Effect()
  onCreateItem$: Observable<Action> = this.actions$
    .ofType(collection.CREATE_ITEM)
    .map((action: collection.LoadItemSuccess) => new menu.HideMenu());

}
