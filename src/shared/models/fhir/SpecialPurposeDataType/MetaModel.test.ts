import { expect } from 'vitest'

import { MetaModel } from './MetaModel'
import { riphCtisDto } from '../../../test/helpers/elasticsearchHelper'

describe('shared | models | fhir | MetaModel', () => {
  describe('#createWithMostRecentIsoDate', () => {
    it('should create a properly formatted model', () => {
      // when
      const result = MetaModel.create(riphCtisDto[0].historique, riphCtisDto[0].dates_avis_favorable_ms_mns)

      // then
      expect(result).toMatchInlineSnapshot(`
        MetaModel {
          "id": undefined,
          "lastUpdated": "2023-04-12T00:00:00.000Z",
          "profile": [
            "https://interop.esante.gouv.fr/ig/fhir/eclaire/StructureDefinition/eclaire-researchstudy",
          ],
          "security": undefined,
          "source": undefined,
          "tag": undefined,
          "versionId": undefined,
        }
      `)
    })

    it('should create a model with date of the day date when historic and last date of approval are empty', () => {
      // given
      vi.useFakeTimers()
      vi.setSystemTime(new Date(2022, 0, 1))
      const historique = ''
      const datesAvisFavorableMsMns = ''

      // when
      const metaModel = MetaModel.create(historique, datesAvisFavorableMsMns)

      // then
      expect(metaModel.lastUpdated).toBe('2021-12-31T23:00:00.000Z')
    })

    it('should create a model with the last date of approval, when the last date of approval is higher than historic date', () => {
      // when
      const result = MetaModel.create(riphCtisDto[0].historique, riphCtisDto[0].dates_avis_favorable_ms_mns)

      // then
      expect(result.lastUpdated).toBe('2023-04-12T00:00:00.000Z')
    })

    it('should create a properly formatted model with the historic date, when the historic date is higher than last date of approval', () => {
      // when
      const result = MetaModel.create(riphCtisDto[2].historique, riphCtisDto[2].dates_avis_favorable_ms_mns)

      // then
      expect(result.lastUpdated).toBe('2023-11-29T00:00:00.000Z')
    })
  })
})
