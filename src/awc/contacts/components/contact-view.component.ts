import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Contact } from '../models/contact';
import { Country } from '../models/country';


@Component({
  selector: 'awc-contact-view',
  templateUrl: './contact-view.component.html',
  styleUrls: ['./contact-view.component.scss']
})

export class ContactViewComponent {
  @Input() contact: Contact;
  @Input() country: Contact;
  @Output() editContact = new EventEmitter<number>();

  onEditContactClick(contactId) {
    this.editContact.emit(contactId);
  }
}
