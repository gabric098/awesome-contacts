import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import { Country } from '../models/country';
import { CountriesService } from '../services/countries.service';
import { of } from 'rxjs/observable/of';
import * as countries from '../actions/countries';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class CountriesEffects {

  constructor(private actions$: Actions, private countriesService: CountriesService) {}

  @Effect()
  loadCollection$: Observable<Action> = this.actions$
    .ofType(countries.LOAD)
    .switchMap(() =>
      this.countriesService
        .getCountries()
        .map((countriesList: Country[]) => {
          return new countries.LoadSuccess(countriesList);
        })
        .catch(error => of(new countries.LoadFail(error)))
  );
}
