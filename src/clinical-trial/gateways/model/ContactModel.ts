import { ContactDetailsModel } from './ContactDetailsModel'

export class ContactModel {
  constructor(
    readonly public_queries: ContactDetailsModel,
    readonly scientific_queries: ContactDetailsModel
  ) {}
}
