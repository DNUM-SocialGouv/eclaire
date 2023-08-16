import { ModelUtils } from './ModelUtils'
import { AssignerForSecondaryIdentifier } from '../special-purpose-data-types/ReferenceModel'
import { RiphDtoTestFactory } from 'src/shared/test/helpers/RiphDtoTestFactory'

describe('shared | models | custom | ModelUtils', () => {
  describe('#identifyAssigner', () => {
    it.each([
      { assigner: AssignerForSecondaryIdentifier.CTIS, qualification: undefined, regulationCode: 'REG536' },
      { assigner: AssignerForSecondaryIdentifier.ANSM, qualification: undefined, regulationCode: 'REG745' },
      { assigner: AssignerForSecondaryIdentifier.ANSM, qualification: undefined, regulationCode: 'REG746' },
      { assigner: AssignerForSecondaryIdentifier.EUDRACT, qualification: 'Catégorie 1', regulationCode: 'JARDE' },
      { assigner: AssignerForSecondaryIdentifier.ANSM, qualification: 'Catégorie 2', regulationCode: 'JARDE' },
      { assigner: AssignerForSecondaryIdentifier.ANSM, qualification: 'Catégorie 3', regulationCode: 'JARDE' },
    ])('should create an identifier assigned by $assigner', ({
      assigner,
      qualification,
      regulationCode,
    }) => {
      // when
      const result = ModelUtils.identifyAssigner(regulationCode, qualification)

      // then
      expect(result).toBe(assigner)
    })

    it('should throw an error when there is no regulation code', () => {
      expect(() => ModelUtils.identifyAssigner(undefined)).toThrow(
        'A regulation is always given. So, the assigner cannot be unknown'
      )
    })
  })

  describe('#getMostRecentIsoDate', () => {
    it('should return the last date of approval, when the last date of approval is higher than historic date', () => {
      // given
      const riphCtisDto = RiphDtoTestFactory.ctis({
        dates_avis_favorable_ms_mns: '22.00800.000094-SM-1:2022-11-07, 22.00800.000094-SM-2:2023-04-12',
        historique: '2023-03-16:En cours',
      })

      // when
      const mostRecentIsoDate = ModelUtils.getMostRecentIsoDate(riphCtisDto.historique, riphCtisDto.dates_avis_favorable_ms_mns)

      // then
      expect(mostRecentIsoDate).toBe('2023-04-12T00:00:00.000Z')
    })

    it('should return the historic date, when the historic date is higher than last date of approval', () => {
      // given
      const riphCtisDto = RiphDtoTestFactory.ctis({
        dates_avis_favorable_ms_mns: '21.01155.000011-MS03:2022-10-04, 21.01155.000011-MS04.1:2023-04-06',
        historique: '2022-04-28:Suspendue, 2023-11-29:Terminée',
      })

      // when
      const mostRecentIsoDate = ModelUtils.getMostRecentIsoDate(riphCtisDto.historique, riphCtisDto.dates_avis_favorable_ms_mns)

      // then
      expect(mostRecentIsoDate).toBe('2023-11-29T00:00:00.000Z')
    })

    it('should the date of the day date when historic and last date of approval are empty', () => {
      // given
      vi.useFakeTimers()
      vi.setSystemTime(new Date(2022, 0, 1))
      const historique = ModelUtils.NULL_IN_SOURCE
      const datesAvisFavorableMsMns = ModelUtils.NULL_IN_SOURCE

      // when
      const mostRecentIsoDate = ModelUtils.getMostRecentIsoDate(historique, datesAvisFavorableMsMns)

      // then
      expect(mostRecentIsoDate).toBe('2021-12-31T23:00:00.000Z')
    })
  })
})
