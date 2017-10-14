import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';

import { Contact } from '../models/contact';
import 'rxjs/add/operator/map';

@Injectable()
export class ContactsService {
  private API_PATH = '/api/contacts';

  constructor(private http: Http) {}

  getContacts(): Observable<Contact[]> {
    return this.http
      .get(this.API_PATH)
      .map(res => res.json());
  }

  getContact(contactId: number): Observable<Contact> {
    return this.http
      .get(`${this.API_PATH}/${contactId}`)
      .map(res => res.json());
  }

  updateContact(contact: Contact): Observable<Contact> {
    return this.http
      .put(`${this.API_PATH}/${contact.id}`, contact)
      .map(res => res.json());
  }

  createContact(contact: Contact): Observable<Contact> {
    return this.http
      .post(this.API_PATH, contact)
      .map(res => res.json());
  }

  deleteContact(contactId: number): Observable<Contact> {
    return this.http
      .delete(`${this.API_PATH}/${contactId}`)
      .map(res => res.json());
  }
}
