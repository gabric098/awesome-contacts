import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';

import { Country } from '../models/country';
import 'rxjs/add/operator/map';

@Injectable()
export class CountriesService {
  private API_PATH = '/api/countries';

  constructor(private http: Http) {}

  getCountries(): Observable<Country[]> {
    return this.http
      .get(this.API_PATH)
      .map(res => res.json());
  }
}
