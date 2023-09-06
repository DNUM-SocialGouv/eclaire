import { Quantity } from 'fhir/r4'

export class QuantityModel implements Quantity {
  private constructor(
    readonly unit: string | undefined,
    readonly value: number | undefined
  ) {}

  static create(value: number, unit: string): Quantity | undefined {
    if (value === undefined) return undefined

    return new QuantityModel(
      unit,
      value
    )
  }
}
