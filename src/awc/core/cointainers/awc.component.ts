import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../reducers';
import * as languageActions from '../actions/language';
import * as menuActions from '../actions/menu';

@Component({
  selector: 'awc-root',
  templateUrl: './awc.component.html',
  styleUrls: ['awc.component.scss'],
})
export class AwcComponent implements OnInit {
  availableLangs$: Observable<string[]>;
  selectedLang$: Observable<string>;
  menuDisplaying$: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>) {
    this.availableLangs$ = store.select(fromRoot.getAvailableLangs);
    this.selectedLang$ = store.select(fromRoot.getSelectedLang);
    this.menuDisplaying$ = store.select(fromRoot.getMenuDisplaying);
  }

  ngOnInit() {
    this.store.dispatch(new languageActions.LoadLanguages());
  }

  onLangChange(lang) {
    this.store.dispatch(new languageActions.ChangeLanguage(lang));
  }

  onShowMenu() {
    this.store.dispatch(new menuActions.ShowMenu());
  }
}
