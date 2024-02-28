import { Duration } from 'fhir/r4'

export class DurationModel implements Duration {

  constructor(
    readonly code: string | undefined,
    readonly comparator: '<' | '<=' | '>=' | '>' | undefined,
    readonly system: string | undefined,
    readonly unit: string | undefined,
    readonly value: number | undefined
  ) {}

  static create(duration: number): DurationModel {
    return new DurationModel(
      undefined,
      undefined,
      undefined,
      undefined,
      duration
    )
  }
}
