import { Component, ChangeDetectionStrategy, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import * as fromContacts from '../reducers';
import * as collection from '../actions/collection';
import * as countries from '../actions/countries';
import * as router from '../../core/actions/router';
import { Contact } from '../models/contact';
import { Country } from '../models/country';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './edit-page.component.html',
  styleUrls: ['edit-page.component.scss']
})
export class EditPageComponent implements OnInit {
  contact$: Observable<Contact>;
  loading$: Observable<boolean>;
  countries$: Observable<Country[]>;

  constructor(private route: ActivatedRoute, private store: Store<fromContacts.State>) {
    this.loading$ = store.select(fromContacts.getContactLoading);
    this.contact$ = store.select(fromContacts.getSelectedContact);
    this.countries$ = store.select(fromContacts.getCountriesEntities);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.store.dispatch(new collection.LoadItem(parseInt(params['id'], 10)));
      }
    });
    this.store.dispatch(new countries.Load());
  }

  onSaveContact(contact: Contact) {
    if (contact.id) {
      this.store.dispatch(new collection.UpdateItem(contact));
    } else {
      this.store.dispatch(new collection.CreateItem(contact));
    }
  }
}
