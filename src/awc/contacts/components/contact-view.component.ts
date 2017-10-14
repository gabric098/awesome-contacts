import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Contact } from '../models/contact';


@Component({
  selector: 'awc-contact-view',
  templateUrl: './contact-view.component.html',
  styleUrls: ['./contact-view.component.scss']
})

export class ContactViewComponent {
  @Input() contact: Contact;
  @Output() editContact = new EventEmitter<number>();

  onEditContactClick(contactId) {
    this.editContact.emit(contactId);
  }
}
