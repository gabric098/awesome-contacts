import { Component, ChangeDetectionStrategy, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import * as fromContacts from '../reducers';
import * as collection from '../actions/collection';
import * as router from '../../core/actions/router';
import { Contact } from '../models/contact';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './detail-page.component.html',
  styleUrls: ['detail-page.component.scss']
})
export class DetailPageComponent implements OnInit {
  contact$: Observable<Contact>;
  loading$: Observable<boolean>;

  constructor(private route: ActivatedRoute, private store: Store<fromContacts.State>) {
    this.loading$ = store.select(fromContacts.getContactLoading);
    this.contact$ = store.select(fromContacts.getSelectedContact);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.store.dispatch(new collection.LoadItem(parseInt(params['id'], 10)));
    });
  }

  onEditContactClick(contactId: number) {
    this.store.dispatch(new collection.SelectItem(contactId));
    this.store.dispatch(new router.Go({
      path: ['/contacts/edit', contactId]
    }));
  }
}
