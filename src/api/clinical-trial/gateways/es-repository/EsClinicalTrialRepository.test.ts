import { errors } from '@elastic/elasticsearch'

import { EsClinicalTrialRepository } from './EsClinicalTrialRepository'
import { clinicalTrialIndexMapping } from '../../../../etl/clinicalTrialIndexMapping'
import { setupClientAndElasticsearchService } from '../../../../shared/test/helpers/elasticsearchHelper'
import { ClinicalTrial } from '../../application/entities/ClinicalTrial'
import { NotFoundClinicalTrialError } from '../../application/errors/NotFoundClinicalTrialError'
import { ClinicalTrialFactory } from '../ClinicalTrialFactory'
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
    const unknownId = '2022-500014-26-99'
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
    vi.spyOn(elasticsearchService, 'findOneDocument').mockRejectedValueOnce(new errors.ResponseError('Elasticsearch operation has failed'))

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
    vi.spyOn(elasticsearchService, 'findOneDocument').mockRejectedValueOnce(new errors.ElasticsearchClientError('Elasticsearch operation has failed'))

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

  it('should find a clinical trial when filter on a field is given', async () => {
    // GIVEN
    const { esClinicalTrialRepository } = await setup()
    const requestBody = { query: { match: { 'public_title.value': 'Circuler l’ADN' } } }

    // WHEN
    const response = await esClinicalTrialRepository.search(requestBody)

    // THEN
    const clinicalTrialModel = ClinicalTrialModelTestingFactory.create()
    const clinicalTrial = ClinicalTrialFactory.create(clinicalTrialModel)

    expect(response).toStrictEqual({
      hits: [clinicalTrial],
      total: 1,
    })
  })

  it('should not find a clinical trial when wrong filter on a field is given', async () => {
    // GIVEN
    const { elasticsearchService, esClinicalTrialRepository } = await setup()
    const requestBody = { query: { match: { 'blah-blah.value': 'Circuler l’ADN' } } }
    vi.spyOn(elasticsearchService, 'search').mockRejectedValueOnce(new errors.ElasticsearchClientError('Elasticsearch operation has failed'))

    try {
      // WHEN
      await esClinicalTrialRepository.search(requestBody)
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
    ClinicalTrialModelTestingFactory.create({ public_title: { acronym: '', value: 'un autre titre' } }),
  ])

  const esClinicalTrialRepository = new EsClinicalTrialRepository(elasticsearchService)

  return { elasticsearchService, esClinicalTrialRepository }
}
