import {
  CodeableConcept,
  Identifier,
  Period,
  Reference,
} from 'fhir/r4'

import { ReferenceModel } from '../SpecialPurposeDataType/ReferenceModel'

enum REGULATION_CODES {
  CTIS = 'REG536',
  DM = 'REG745',
  DMDIV = 'REG746',
  JARDE = 'JARDE',
}

export class IdentifierModel implements Identifier {
  constructor(
    readonly assigner: Reference | undefined,
    readonly id: string | undefined,
    readonly period: Period | undefined,
    readonly type: CodeableConcept | undefined,
    readonly use:
      | 'usual'
      | 'official'
      | 'temp'
      | 'secondary'
      | 'old'
      | undefined,
    readonly system: string | undefined,
    readonly value: string | undefined
  ) {}

  static createPrimarySlice(number: string): IdentifierModel {
    return new IdentifierModel(
      ReferenceModel.createAssignerForPrimaryIdentifier(),
      undefined,
      undefined,
      undefined,
      'official',
      undefined,
      number
    )
  }

  static createSecondarySlice(
    number: string,
    regulationCode: string,
    qualification: string | undefined
  ): IdentifierModel {
    let assigner: Reference

    switch (regulationCode) {
      case REGULATION_CODES.CTIS:
        assigner = ReferenceModel.createCtisAssigner(number)
        break
      case REGULATION_CODES.DM:
        assigner = ReferenceModel.createAnsmAssigner()
        break
      case REGULATION_CODES.DMDIV:
        assigner = ReferenceModel.createAnsmAssigner()
        break
      case REGULATION_CODES.JARDE:
        if (qualification === 'Catégorie 1') {
          assigner = ReferenceModel.createEudraCtAssigner()
        } else {
          assigner = ReferenceModel.createAnsmAssigner()
        }
        break
      default:
        assigner = undefined
    }

    return new IdentifierModel(
      assigner,
      undefined,
      undefined,
      undefined,
      'secondary',
      undefined,
      number
    )
  }
}
