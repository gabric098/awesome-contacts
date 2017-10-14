import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Country } from '../models/country';
import { Contact } from '../models/contact';


@Component({
  selector: 'awc-contact-form',
  templateUrl: 'contact-form.component.html'
})

export class ContactFormComponent {
  private _contact: Contact;

  @Input()
  set contact(contact: Contact) {
    this._contact = contact;
    if (contact !== null) {
      this.formContact.setValue({
        name: this._contact.name,
        surname: this._contact.surname,
        email: this._contact.email,
        zip: this._contact.zip,
        country: this._contact.country
      });
    }
  }

  get contact(): Contact {
    return this._contact;
  }

  @Input() countries: Array<Country> = [];
  @Output() saveContact = new EventEmitter<Contact>();
  formContact: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    surname: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    zip: new FormControl(''),
    country: new FormControl('')
  });

  onSubmit($event) {
    $event.preventDefault();
    this.saveContact.emit(this.formContact.value);
  }
}
