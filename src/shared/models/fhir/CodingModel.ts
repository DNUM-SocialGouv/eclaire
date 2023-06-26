import { Coding } from 'fhir/r4'

export class CodingModel implements Coding {
  constructor(
    readonly code: string | undefined,
    readonly display: string | undefined,
    readonly id: string | undefined,
    readonly system: string | undefined,
    readonly userSelected: boolean | undefined,
    readonly version: string | undefined
  ) {}
}
