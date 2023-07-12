import { expect } from 'vitest'

import { MetaModel } from './MetaModel'
import { riphCtisDto } from '../../../test/helpers/elasticsearchHelper'

describe('shared | models | fhir | MetaModel', () => {
  describe('#createWithMostRecentIsoDate', () => {
    it('should create a properly formatted model', () => {
      // when
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const result = MetaModel.createWithMostRecentIsoDate(riphCtisDto[0].historique, riphCtisDto[0].dates_avis_favorable_ms_mns)

      // then
      expect(result).toMatchInlineSnapshot(`
        MetaModel {
          "id": undefined,
          "lastUpdated": "2023-04-12T00:00:00.000Z",
          "profile": undefined,
          "security": undefined,
          "source": undefined,
          "tag": undefined,
          "versionId": undefined,
        }
      `)
    })

    it('should create a model with empty last updated date when historic and last date of approval are empty', () => {
      // given
      const historique = ''
      const datesAvisFavorableMsMns = ''

      // when
      const metaModel = MetaModel.createWithMostRecentIsoDate(historique, datesAvisFavorableMsMns)

      // then
      expect(metaModel.lastUpdated).toBe('')
    })

    it('should create a model with the last date of approval, when the last date of approval is higher than historic date', () => {
      // when
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const result = MetaModel.createWithMostRecentIsoDate(riphCtisDto[0].historique, riphCtisDto[0].dates_avis_favorable_ms_mns)

      // then
      expect(result.lastUpdated).toBe('2023-04-12T00:00:00.000Z')
    })

    it('should create a properly formatted model with the historic date, when the historic date is higher than last date of approval', () => {
      // when
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const result = MetaModel.createWithMostRecentIsoDate(riphCtisDto[2].historique, riphCtisDto[2].dates_avis_favorable_ms_mns)

      // then
      expect(result.lastUpdated).toBe('2023-11-29T00:00:00.000Z')
    })
  })
})
