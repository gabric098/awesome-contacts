import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AwcComponent } from './cointainers/awc.component';
import { LangSelectComponent } from './components/lang-select.component';
import { LangFlagComponent } from './components/lang-flag.component';

export const COMPONENTS = [
  AwcComponent,
  LangSelectComponent,
  LangFlagComponent
];

@NgModule({
  imports: [RouterModule, CommonModule],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class CoreModule {
  static forRoot() {
    return {
      ngModule: CoreModule,
      providers: [],
    };
  }
}
