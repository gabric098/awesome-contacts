import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, RouterLink, RouterLinkActive } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { HttpModule } from '@angular/http';
import {
  StoreRouterConnectingModule,
  RouterStateSerializer,
} from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { MaterializeModule } from 'angular2-materialize';
import { CoreModule } from './core/core.module';
import { RouterEffects } from './core/effects/router';
import { routes } from './routes';
import { reducers, metaReducers } from './reducers';
import { CustomRouterStateSerializer } from './shared/utils';

import { AwcComponent } from './core/cointainers/awc.component';
import { environment } from '../environments/environment';

const imports = [
  BrowserModule,
  HttpModule,
  EffectsModule.forRoot([RouterEffects]),
  StoreModule.forRoot(reducers, { metaReducers }),
  RouterModule.forRoot(routes, { enableTracing: false }),
  StoreRouterConnectingModule,
  !environment.production ? StoreDevtoolsModule.instrument() : [],
  CoreModule.forRoot(),
  MaterializeModule
];

@NgModule({
  imports: [...imports],
  providers: [{
    provide: RouterStateSerializer,
    useClass: CustomRouterStateSerializer
  }],
  bootstrap: [AwcComponent]
})
export class AwcModule { }
