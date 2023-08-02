/* eslint-disable sort-keys */
import { ModelUtils } from './ModelUtils'
import { AssignerForSecondaryIdentifier } from '../fhir/SpecialPurposeDataType/ReferenceModel'

describe('shared | models | custom | ModelUtils', () => {
  describe('#identifyAssigner', () => {
    it.each([
      { regulationCode: 'REG536', qualification: undefined, assigner: AssignerForSecondaryIdentifier.CTIS },
      { regulationCode: 'REG745', qualification: undefined, assigner: AssignerForSecondaryIdentifier.ANSM },
      { regulationCode: 'REG746', qualification: undefined, assigner: AssignerForSecondaryIdentifier.ANSM },
      { regulationCode: 'JARDE', qualification: 'Catégorie 1', assigner: AssignerForSecondaryIdentifier.EUDRACT },
      { regulationCode: 'JARDE', qualification: 'Catégorie 2', assigner: AssignerForSecondaryIdentifier.ANSM },
      { regulationCode: 'JARDE', qualification: 'Catégorie 3', assigner: AssignerForSecondaryIdentifier.ANSM },
    ])('should create an identifier assigned by $assigner', ({
      regulationCode,
      qualification,
      assigner,
    }) => {
      // when
      const result = ModelUtils.identifyAssigner(regulationCode, qualification)

      // then
      expect(result).toBe(assigner)
    })

    it('should create an identifier without assigner when there is no regulation code', () => {
      // when
      const result = ModelUtils.identifyAssigner(undefined, undefined)

      // then
      expect(result).toBeUndefined()
    })
  })
})
