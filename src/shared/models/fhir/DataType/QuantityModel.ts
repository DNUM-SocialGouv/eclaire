import { Quantity } from 'fhir/r4'

export class QuantityModel implements Quantity {
  constructor(
    readonly code?: string | undefined,
    readonly comparator?: AgeComparator | undefined,
    readonly id?: string | undefined,
    readonly system?: string | undefined,
    readonly unit?: string | undefined,
    readonly value?: number | undefined
  ) {}

  static createResearchStudyQuantity(value: number, ageComparator?: AgeComparator | undefined): QuantityModel {
    return new QuantityModel(
      undefined,
      ageComparator,
      undefined,
      undefined,
      undefined,
      value
    )
  }
}

export type AgeComparator = '<' | '<=' | '>=' | '>'
