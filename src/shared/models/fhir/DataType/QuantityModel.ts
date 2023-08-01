import { Quantity } from 'fhir/r4'

export class QuantityModel implements Quantity {
  constructor(
    readonly code: string | undefined,
    readonly comparator: QuantityComparator | undefined,
    readonly id: string | undefined,
    readonly system: string | undefined,
    readonly unit: string | undefined,
    readonly value: number | undefined
  ) {}

  static create(value: number, unit: string, comparator?: QuantityComparator): QuantityModel {
    return new QuantityModel(
      undefined,
      comparator,
      undefined,
      undefined,
      unit,
      value
    )
  }
}

export type QuantityComparator = '<' | '<=' | '>=' | '>'
