import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterializeModule } from 'angular2-materialize';

import { ContactsService } from './services/contacts.service';
import { CountriesService } from './services/countries.service';
import { CollectionEffects } from './effects/collection';
import { CountriesEffects } from './effects/countries';
import { CollectionPageComponent } from './containers/collection-page.component';
import { ContactListComponent } from './components/contact-list.component';
import { AddContactPageComponent } from './containers/add-contact-page.component';
import { ContactFormComponent } from './components/contact-form.component';
import { DetailPageComponent } from './containers/detail-page.component';
import { EditPageComponent } from './containers/edit-page.component';
import { ContactViewComponent } from './components/contact-view.component';

import { reducers } from './reducers';

@NgModule({
  imports: [
    CommonModule,
    MaterializeModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: CollectionPageComponent,
        children: [
          {
            path: 'add',
            component: EditPageComponent,
          },
          {
            path: 'view/:id',
            component: DetailPageComponent,
          },
          {
            path: 'edit/:id',
            component: EditPageComponent,
          }
        ]
      },
    ]),
    StoreModule.forFeature('contacts', reducers),
    EffectsModule.forFeature([CollectionEffects, CountriesEffects]),
  ],
  declarations: [
    CollectionPageComponent,
    ContactListComponent,
    AddContactPageComponent,
    ContactFormComponent,
    DetailPageComponent,
    ContactViewComponent,
    EditPageComponent
  ],
  exports: [
    ReactiveFormsModule
  ],
  providers: [ContactsService, CountriesService],
})
export class ContactsModule { }

