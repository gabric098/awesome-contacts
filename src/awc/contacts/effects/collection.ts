import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import { Contact } from '../models/contact';
import { ContactsService } from '../services/contacts.service';
import { of } from 'rxjs/observable/of';
import * as collection from '../actions/collection';
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

  /*@Effect()
  navigateToContactDetail$: Observable<Action> = this.actions$
    .ofType(collection.SELECT_ITEM)
    .map((action: collection.SelectItem) => action.payload)
    .mergeMap((contactId: number) => {
      return new navigation.Go({
        path: ['/contacts', contactId]
      });
    });*/
}
