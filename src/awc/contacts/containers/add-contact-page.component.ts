import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { FormGroupState } from 'ngrx-forms';

import * as fromCountries from '../reducers';
import * as countries from '../actions/countries';
import { Country } from '../models/country';

@Component({
  selector: 'awc-add-contact-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>
      <h3>Add contact</h3>
    </div>
    <awc-contact-form [countries]="countries$ | async"></awc-contact-form>
  `
})
export class AddContactPageComponent {
  countries$: Observable<Array<Country>>;

  constructor(private store: Store<fromCountries.State>) {
    this.countries$ = store.select(fromCountries.getCountriesEntities);
  }
}
