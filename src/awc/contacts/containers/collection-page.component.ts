import { Component, ChangeDetectionStrategy, OnInit, ViewEncapsulation, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { MaterializeAction } from 'angular2-materialize';

import * as fromContacts from '../reducers';
import * as fromRoot from '../../reducers';
import * as collection from '../actions/collection';
import * as countries from '../actions/countries';
import * as router from '../../core/actions/router';
import * as menu from '../../core/actions/menu';
import { Contact } from '../models/contact';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './collection-page.component.html',
  styleUrls: ['collection-page.component.scss']
})
export class CollectionPageComponent implements OnInit {
  contacts$: Observable<Contact[]>;
  menuDisplaying$: Observable<boolean>;
  selectedContact$: Observable<Contact>;
  menuActions = new EventEmitter<string|MaterializeAction>();

  constructor(private store: Store<fromContacts.State>) {
    this.contacts$ = store.select(fromContacts.getContactsEntities);
    this.selectedContact$ = store.select(fromContacts.getSelectedContact);
    this.menuDisplaying$ = store.select(fromRoot.getMenuDisplaying);
  }

  ngOnInit() {
    this.store.dispatch(new collection.Load());
    this.store.dispatch(new countries.Load());
    this.menuDisplaying$.subscribe((show) => (show) ? this.showMenu() : this.hideMenu());
  }

  addContact() {
    this.store.dispatch(new collection.DeselectItem());
    this.store.dispatch(new router.Go({
      path: ['/contacts/add']
    }));
    this.store.dispatch(new menu.HideMenu());
  }

  onContactSelected(contactId) {
    this.store.dispatch(new collection.SelectItem(contactId));
    this.store.dispatch(new router.Go({
      path: ['/contacts/view', contactId]
    }));
  }

  onContactDeleted(contactId) {
    this.store.dispatch(new collection.DeleteItem(contactId));
    this.store.dispatch(new router.Go({
      path: ['/contacts']
    }));
  }

  showMenu() {
    this.menuActions.emit({action: 'sideNav', params: ['show']});
  }

  hideMenu() {
    this.menuActions.emit({action: 'sideNav', params: ['hide']});
  }
}
