export class ContactDetailsModel {
  constructor(
    readonly name: string,
    readonly firstname: string,
    readonly lastname: string,
    readonly address: string,
    readonly city: string,
    readonly country: string,
    readonly zip: string,
    readonly telephone: string,
    readonly email: string,
    readonly organization: string,
    readonly organization_id: string,
    readonly title: string,
    readonly department: string
  ) {}
}
