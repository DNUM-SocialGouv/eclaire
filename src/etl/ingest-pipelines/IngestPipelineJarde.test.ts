import { IngestPipelineJarde } from './IngestPipelineJarde'
import { ResearchStudyModel } from '../../shared/models/domain-resources/ResearchStudyModel'
import { setupDependencies } from '../../shared/test/helpers/elasticsearchHelper'
import { RiphDtoTestFactory } from '../../shared/test/helpers/RiphDtoTestFactory'
import { RiphJardeDto } from '../dto/RiphJardeDto'

describe('etl | IngestPipelineJarde', () => {
  describe('extract', () => {
    it('should extract raw data into an array', async () => {
      // given
      const riphJardeDtos = [RiphDtoTestFactory.jarde(), RiphDtoTestFactory.jarde(), RiphDtoTestFactory.jarde()]
      const { ingestPipelineJarde, readerService } = setup()
      vi.spyOn(readerService, 'read').mockResolvedValueOnce(riphJardeDtos)

      // when
      const result = await ingestPipelineJarde.extract<RiphJardeDto>()

      // then
      expect(result).toStrictEqual(riphJardeDtos)
    })
  })

  describe('transform', () => {
    it('should transform array of raw data into a collection of research study documents', () => {
      // given
      const riphJardeDtos = [RiphDtoTestFactory.jarde()]
      const { ingestPipelineJarde } = setup()

      // when
      const result = ingestPipelineJarde.transform(riphJardeDtos)

      // then
      expect(result[0]).toBeInstanceOf(ResearchStudyModel)
    })

    it('should not find "RAPATRIEE_CTIS" because it is a duplicate', () => {
      // GIVEN
      const riphJardeDtoWithApprovedAndFromCtisStatuses = [
        RiphDtoTestFactory.jarde({ etat: 'A_DEMARRER' }),
        RiphDtoTestFactory.jarde({ etat: 'RAPATRIEE_CTIS' }),
      ]
      const { ingestPipelineJarde } = setup()

      // WHEN
      const result = ingestPipelineJarde.transform(riphJardeDtoWithApprovedAndFromCtisStatuses)

      // THEN
      expect(result).toHaveLength(1)
      expect(result).not.toContainEqual({ create: { _id: '2021-A01022-59' } })
    })
  })

  describe('load', () => {
    it('should load in bulk a collection of research study documents', async () => {
      // given
      const riphJardeDtos = [RiphDtoTestFactory.jarde(), RiphDtoTestFactory.jarde(), RiphDtoTestFactory.jarde()]
      const { databaseService, ingestPipelineJarde } = setup()
      const documents = ingestPipelineJarde.transform(riphJardeDtos)
      vi.spyOn(databaseService, 'bulkDocuments').mockResolvedValueOnce()

      // when
      await ingestPipelineJarde.load(documents)

      // then
      expect(databaseService.bulkDocuments).toHaveBeenCalledWith(documents)
    })
  })
})

function setup() {
  const {
    databaseService,
    logger,
    readerService,
  } = setupDependencies()

  const ingestPipelineJarde = new IngestPipelineJarde(logger, databaseService, readerService)

  return { databaseService, ingestPipelineJarde, readerService }
}
