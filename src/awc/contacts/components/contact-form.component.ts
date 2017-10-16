import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Country } from '../models/country';
import { Contact } from '../models/contact';


@Component({
  selector: 'awc-contact-form',
  templateUrl: 'contact-form.component.html',
  styleUrls: ['contact-form.component.scss']
})

export class ContactFormComponent implements OnInit{
  private _contact: Contact;
  private _errorMessages = {
    name: '',
    surname: '',
    email: ''
  };

  @Input()
  set contact(contact: Contact) {
    this._contact = contact;
    if (contact !== null) {
      this.formContact.setValue({
        id: this._contact.id,
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
    id: new FormControl(''),
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    surname: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    zip: new FormControl(''),
    country: new FormControl('')
  });

  ngOnInit() {
    this.setErrorMsgAndSubscribe(['name', 'surname', 'email']);
  }

  private setErrorMsgAndSubscribe(fieldNames: string[]) {
    fieldNames.map( fieldName => {
      this.setErrorMessage(this.formContact.get(fieldName).status, fieldName);
      this.formContact.get(fieldName).statusChanges.subscribe( data => this.setErrorMessage(data, fieldName));
    });
  }

  private getErrorMessage(errorType) {
    if (errorType.required) {
      return 'This field is required';
    } else if (errorType.minlength) {
      return `Minimum length is ${errorType.minlength.requiredLength}`;
    } else if (errorType.email) {
      return 'Not a valid email';
    }
  }

  private setErrorMessage(status, formField) {
    this._errorMessages[formField] = '';
    if (status === 'INVALID') {
      this._errorMessages[formField] = this.getErrorMessage(this.formContact.get(formField).errors);
    }
  }

  onSubmit($event) {
    $event.preventDefault();
    this.saveContact.emit(this.formContact.value);
  }
}
