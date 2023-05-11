import { ContactDetailsModel } from './ContactDetailsModel'

export class ContactModel {
  constructor(
    readonly public_query: ContactDetailsModel,
    readonly scientific_query: ContactDetailsModel
  ) {}
}
