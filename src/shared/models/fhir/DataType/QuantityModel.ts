import { Quantity } from 'fhir/r4'

export class QuantityModel implements Quantity {
  constructor(
    readonly comparator: QuantityComparator | undefined,
    readonly unit: string | undefined,
    readonly value: number | undefined
  ) {}

  static create(value: number, unit: string, comparator?: QuantityComparator): QuantityModel | undefined {
    if (value === undefined) return undefined

    return new QuantityModel(
      comparator,
      unit,
      value
    )
  }
}

export type QuantityComparator = '<' | '<=' | '>=' | '>'
