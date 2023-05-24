import { errors } from '@elastic/elasticsearch'

import { EsClinicalTrialRepository } from './EsClinicalTrialRepository'
import { clinicalTrialIndexMapping } from '../../../../etl/clinicalTrialIndexMapping'
import { setupClientAndElasticsearchService } from '../../../../shared/test/helpers/elasticsearchHelper'
import { ClinicalTrial } from '../../application/entities/ClinicalTrial'
import { NotFoundClinicalTrialError } from '../../application/errors/NotFoundClinicalTrialError'
import { ClinicalTrialModelTestingFactory } from '../ClinicalTrialModelTestingFactory'

describe('clinical trial file repository', () => {
  it('should retrieve one clinical trial', async () => {
    // GIVEN
    const { esClinicalTrialRepository } = await setup()

    // WHEN
    const clinicalTrial = await esClinicalTrialRepository.findOne('fakeId2')

    // THEN
    expect(clinicalTrial).toBeInstanceOf(ClinicalTrial)
  })

  it('should not retrieve one clinical trial if it does not exist', async () => {
    // GIVEN
    const unknownId = '0fc962d4-705f-4c7f-9fe1-6ecbfc58187d'
    const { esClinicalTrialRepository } = await setup()

    try {
      // WHEN
      await esClinicalTrialRepository.findOne(unknownId)
      throw new Error('Should not be triggered')
    } catch (error) {
      // THEN
      expect(error).toBeInstanceOf(NotFoundClinicalTrialError)
    }
  })

  it('should not retrieve one clinical trial if there is a problem with elasticsearch response', async () => {
    // GIVEN
    const { elasticsearchService, esClinicalTrialRepository } = await setup()
    // @ts-ignore
    jest.spyOn(elasticsearchService, 'findOneDocument').mockRejectedValueOnce(new errors.ResponseError('Elasticsearch operation has failed'))

    try {
      // WHEN
      await esClinicalTrialRepository.findOne('fakeId1')
      throw new Error('Should not be triggered')
    } catch (error) {
      // THEN
      // @ts-ignore
      expect(error.meta).toBe('Elasticsearch operation has failed')
      expect(error).toBeInstanceOf(errors.ResponseError)
    }
  })

  it('should not retrieve one clinical trial if there is a problem with elasticsearch client', async () => {
    // GIVEN
    const { elasticsearchService, esClinicalTrialRepository } = await setup()
    // @ts-ignore
    jest.spyOn(elasticsearchService, 'findOneDocument').mockRejectedValueOnce(new errors.ElasticsearchClientError('Elasticsearch operation has failed'))

    try {
      // WHEN
      await esClinicalTrialRepository.findOne('fakeId1')
      throw new Error('Should not be triggered')
    } catch (error) {
      // THEN
      // @ts-ignore
      expect(error.message).toBe('Elasticsearch operation has failed')
      expect(error).toBeInstanceOf(errors.ElasticsearchClientError)
    }
  })
})

async function setup() {
  const { elasticsearchService } = await setupClientAndElasticsearchService()

  await elasticsearchService.createAnIndex(clinicalTrialIndexMapping)
  await elasticsearchService.bulkDocuments([
    { index: { _id: 'fakeId1' } },
    ClinicalTrialModelTestingFactory.create(),
    { index: { _id: 'fakeId2' } },
    ClinicalTrialModelTestingFactory.create(),
  ])

  const esClinicalTrialRepository = new EsClinicalTrialRepository(elasticsearchService)

  return { elasticsearchService, esClinicalTrialRepository }
}
