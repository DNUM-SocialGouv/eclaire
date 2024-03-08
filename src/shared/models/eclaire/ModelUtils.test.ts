import { ModelUtils } from './ModelUtils'
import { EclaireDto } from '../../../etl/dto/EclaireDto'
import { RiphDtoTestFactory } from '../../test/helpers/RiphDtoTestFactory'
import { AssignerForPrimaryIdentifier } from '../special-purpose-data-types/ReferenceModel'

describe('shared | models | custom | ModelUtils', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  describe('#identifyAssigner', () => {
    it.each([
      { assigner: AssignerForPrimaryIdentifier.CTIS, qualification: undefined, regulationCode: 'REG536' },
      { assigner: AssignerForPrimaryIdentifier.ANSM, qualification: undefined, regulationCode: 'REG745' },
      { assigner: AssignerForPrimaryIdentifier.EUDRACT, qualification: 'Catégorie 1', regulationCode: 'REG745' },
      { assigner: AssignerForPrimaryIdentifier.ANSM, qualification: 'Catégorie 2', regulationCode: 'REG745' },
      { assigner: AssignerForPrimaryIdentifier.ANSM, qualification: 'Catégorie 3', regulationCode: 'REG745' },
      { assigner: AssignerForPrimaryIdentifier.ANSM, qualification: undefined, regulationCode: 'REG746' },
      { assigner: AssignerForPrimaryIdentifier.EUDRACT, qualification: 'Catégorie 1', regulationCode: 'REG746' },
      { assigner: AssignerForPrimaryIdentifier.ANSM, qualification: 'Catégorie 2', regulationCode: 'REG746' },
      { assigner: AssignerForPrimaryIdentifier.ANSM, qualification: 'Catégorie 3', regulationCode: 'REG746' },
      { assigner: AssignerForPrimaryIdentifier.ANSM, qualification: undefined, regulationCode: 'JARDE' },
      { assigner: AssignerForPrimaryIdentifier.ANSM, qualification: 'Catégorie 1', regulationCode: 'JARDE' },
      { assigner: AssignerForPrimaryIdentifier.ANSM, qualification: 'Catégorie 2', regulationCode: 'JARDE' },
      { assigner: AssignerForPrimaryIdentifier.ANSM, qualification: 'Catégorie 3', regulationCode: 'JARDE' },
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
      const riphCtisDto: EclaireDto = EclaireDto.fromCtis(RiphDtoTestFactory.ctis({
        dates_avis_favorable_ms_mns: '22.00800.000094-SM-1:2022-11-07, 22.00800.000094-SM-2:2023-04-12',
        historique: '2023-03-16:En cours',
      }))

      // when
      const mostRecentIsoDate = ModelUtils.getMostRecentIsoDate(
        riphCtisDto.historique,
        riphCtisDto.dates_avis_favorable_ms_mns,
        riphCtisDto.date_theorique_maximale_autorisation_cpp
      )

      // then
      expect(mostRecentIsoDate).toBe('2023-04-12T00:00:00.000Z')
    })

    it('should return the historic date, when the historic date is higher than last date of approval', () => {
      // given
      const riphCtisDto: EclaireDto = EclaireDto.fromCtis(RiphDtoTestFactory.ctis({
        dates_avis_favorable_ms_mns: '21.01155.000011-MS03:2022-10-04, 21.01155.000011-MS04.1:2023-04-06',
        historique: '2022-04-28:Suspendue, 2023-11-29:Terminée',
      }))

      // when
      const mostRecentIsoDate = ModelUtils.getMostRecentIsoDate(
        riphCtisDto.historique,
        riphCtisDto.dates_avis_favorable_ms_mns,
        riphCtisDto.date_theorique_maximale_autorisation_cpp
      )

      // then
      expect(mostRecentIsoDate).toBe('2023-11-29T00:00:00.000Z')
    })

    it('should the date of the theoretical approval date when historic and last date of approval are empty', () => {
      // given
      const historique: string = undefined
      const datesAvisFavorableMsMns: string = undefined
      const theoreticalApprovalDate = '2023-01-02'

      // when
      const mostRecentIsoDate = ModelUtils.getMostRecentIsoDate(
        historique,
        datesAvisFavorableMsMns,
        theoreticalApprovalDate
      )

      // then
      expect(mostRecentIsoDate).toBe('2023-01-02T00:00:00.000Z')
    })
  })
})
