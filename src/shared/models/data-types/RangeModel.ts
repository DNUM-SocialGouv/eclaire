import { Quantity, Range } from 'fhir/r4'

import { QuantityModel } from './QuantityModel'

export class RangeModel implements Range {
  private constructor(
    readonly high: Quantity | undefined,
    readonly low: Quantity | undefined
  ) {}

  static createAgeRange(ageRange: string): Range {
    let low: number
    let lowUnit: string
    let high: number
    let highUnit: string

    switch (ageRange) {
      case '0-17 years':
        low = 0
        lowUnit = 'years'
        high = 17
        highUnit = 'years'
        break

      case '18-64 years':
        low = 18
        lowUnit = 'years'
        high = 64
        highUnit = 'years'
        break

      case '65+ years':
        low = 65
        lowUnit = 'years'
        high = undefined
        highUnit = undefined
        break

      default:
    }

    return new RangeModel(
      QuantityModel.create(high, highUnit),
      QuantityModel.create(low, lowUnit)
    )
  }
}
