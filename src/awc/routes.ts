import { Routes } from '@angular/router';

import { AwcComponent } from './core/cointainers/awc.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/contacts',
    pathMatch: 'full'
  },
  {
    path: 'contacts',
    loadChildren: './contacts/contacts.module#ContactsModule',
  },
  { path: '**', redirectTo: '' }
];
