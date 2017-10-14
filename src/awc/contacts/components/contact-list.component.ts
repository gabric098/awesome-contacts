import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Contact } from '../models/contact';

@Component({
  selector: 'awc-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})

export class ContactListComponent {
  @Input() contacts: Contact[] = [];
  @Input() selectedContact: number = -1;
  @Output() selectContact = new EventEmitter<string>();
  @Output() deleteContact = new EventEmitter<string>();

  onContactClick(contactId) {
    this.selectContact.emit(contactId);
  }

  onDeleteContactClick($event, contactId) {
    $event.stopPropagation();
    this.deleteContact.emit(contactId);
  }
}
