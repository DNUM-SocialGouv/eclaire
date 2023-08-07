import { Quantity, Range } from 'fhir/r4'

import { QuantityComparator, QuantityModel } from './QuantityModel'

export class RangeModel implements Range {
  constructor(
    readonly high: Quantity | undefined,
    readonly low: Quantity | undefined
  ) {}

  static createAgeRange(ageRange: string): RangeModel {
    let low: number
    let lowComparator: QuantityComparator
    let lowUnit: string
    let high: number
    let highComparator: QuantityComparator
    let highUnit: string

    switch (ageRange) {
      case '0-17 years':
        low = 0
        lowComparator = '>='
        lowUnit = 'years'
        high = 17
        highComparator = '<='
        highUnit = 'years'
        break

      case '18-64 years':
        low = 18
        lowComparator = '>='
        lowUnit = 'years'
        high = 64
        highComparator = '<='
        highUnit = 'years'
        break

      case '65+ years':
        low = 65
        lowComparator = '>='
        lowUnit = 'years'
        high = undefined
        highComparator = undefined
        highUnit = undefined
        break

      default:
    }

    return new RangeModel(
      QuantityModel.create(high, highUnit, highComparator),
      QuantityModel.create(low, lowUnit, lowComparator)
    )
  }
}
