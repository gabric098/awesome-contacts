import { Component, OnInit, ChangeDetectionStrategy, EventEmitter } from '@angular/core';
import { MaterializeAction } from 'angular2-materialize';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../reducers';
import * as languageActions from '../actions/language';
import * as menuActions from '../actions/menu';
import * as alertActions from '../actions/alert';
import { Alert } from '../models/alert';

@Component({
  selector: 'awc-root',
  templateUrl: './awc.component.html',
  styleUrls: ['awc.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AwcComponent implements OnInit {
  availableLangs$: Observable<string[]>;
  selectedLang$: Observable<string>;
  menuDisplaying$: Observable<boolean>;
  alert$: Observable<Alert>;
  globalActions = new EventEmitter<string|MaterializeAction>();

  constructor(private store: Store<fromRoot.State>) {
    this.availableLangs$ = store.select(fromRoot.getAvailableLangs);
    this.selectedLang$ = store.select(fromRoot.getSelectedLang);
    this.menuDisplaying$ = store.select(fromRoot.getMenuDisplaying);
    this.alert$ = store.select(fromRoot.getAlert);
  }

  ngOnInit() {
    this.store.dispatch(new languageActions.LoadLanguages());
    this.alert$.subscribe( alert => {
      if (alert !== null) {
        (<any>window).Materialize.toast(alert.message, 3000);
        this.store.dispatch(new alertActions.HideAlert);
      }
    });
  }

  onLangChange(lang) {
    this.store.dispatch(new languageActions.ChangeLanguage(lang));
  }

  onShowMenu() {
    this.store.dispatch(new menuActions.ShowMenu());
  }
}
