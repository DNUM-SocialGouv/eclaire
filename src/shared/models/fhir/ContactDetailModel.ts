import { ContactDetail, ContactPoint } from 'fhir/r4'

export class ContactDetailModel implements ContactDetail {
  constructor(
    readonly id: string | undefined,
    readonly name: string | undefined,
    readonly telecom: ContactPoint[] | undefined
  ) {}
}
