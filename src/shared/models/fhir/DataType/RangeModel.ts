import { Quantity, Range } from 'fhir/r4'

import { AgeComparator, QuantityModel } from './QuantityModel'

export class RangeModel implements Range {
  constructor(
    readonly high?: Quantity | undefined,
    readonly id?: string | undefined,
    readonly low?: Quantity | undefined
  ) {}

  static createAgeRange(ageRange: string): RangeModel {
    let low: number
    let high: number
    let ageComparator: AgeComparator

    switch (ageRange) {
      case '0-17 years':
        low = 0
        high = 17
        break

      case '18-64 years':
        low = 18
        high = 64
        break

      case '65+ years':
        low = 65
        high = undefined
        ageComparator = '>='
        break

      default:
    }

    return new RangeModel(
      QuantityModel.createResearchStudyQuantity(high),
      undefined,
      QuantityModel.createResearchStudyQuantity(low, ageComparator)
    )
  }
}
