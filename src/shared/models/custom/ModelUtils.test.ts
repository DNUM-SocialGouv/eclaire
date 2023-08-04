/* eslint-disable sort-keys */
import { ModelUtils } from './ModelUtils'
import { AssignerForSecondaryIdentifier } from '../fhir/SpecialPurposeDataTypes/ReferenceModel'
import { riphCtisDto } from 'src/shared/test/helpers/elasticsearchHelper'

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

    it('should throw an error when there is no regulation code', () => {
      expect(() => ModelUtils.identifyAssigner(undefined, undefined)).toThrow(
        'A regulation is always given. So, the assigner cannot be unknown'
      )
    })
  })

  describe('#getMostRecentIsoDate', () => {
    it('should return the last date of approval, when the last date of approval is higher than historic date', () => {
      // when
      const mostRecentIsoDate = ModelUtils.getMostRecentIsoDate(riphCtisDto[0].historique, riphCtisDto[0].dates_avis_favorable_ms_mns)

      // then
      expect(mostRecentIsoDate).toBe('2023-04-12T00:00:00.000Z')
    })

    it('should return the historic date, when the historic date is higher than last date of approval', () => {
      // when
      const mostRecentIsoDate = ModelUtils.getMostRecentIsoDate(riphCtisDto[2].historique, riphCtisDto[2].dates_avis_favorable_ms_mns)

      // then
      expect(mostRecentIsoDate).toBe('2023-11-29T00:00:00.000Z')
    })

    it('should the date of the day date when historic and last date of approval are empty', () => {
      // given
      vi.useFakeTimers()
      vi.setSystemTime(new Date(2022, 0, 1))
      const historique = ''
      const datesAvisFavorableMsMns = ''

      // when
      const mostRecentIsoDate = ModelUtils.getMostRecentIsoDate(historique, datesAvisFavorableMsMns)

      // then
      expect(mostRecentIsoDate).toBe('2021-12-31T23:00:00.000Z')
    })
  })
})
