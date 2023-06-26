import { Identifier, Reference } from 'fhir/r4'

export class ReferenceModel implements Reference {
  constructor(
    readonly display: string | undefined,
    readonly id: string | undefined,
    readonly identifier: Identifier | undefined,
    readonly reference: string | undefined,
    readonly type: string | undefined
  ) {}
}
