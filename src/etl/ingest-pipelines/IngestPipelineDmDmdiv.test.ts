import { IngestPipelineDmDmdiv } from './IngestPipelineDmDmdiv'
import { ResearchStudyModel } from '../../shared/models/domain-resources/ResearchStudyModel'
import { setupDependencies } from '../../shared/test/helpers/elasticsearchHelper'
import { RiphDtoTestFactory } from '../../shared/test/helpers/RiphDtoTestFactory'
import { RiphDmDto } from '../dto/RiphDmDto'

describe('etl | IngestPipelineDm', () => {
  describe('extract', () => {
    it('should extract raw data into an array', async () => {
      // given
      const riphDmDtos = [RiphDtoTestFactory.dm(), RiphDtoTestFactory.dm(), RiphDtoTestFactory.dm()]
      const { ingestPipelineDm, readerService } = setup()
      vi.spyOn(readerService, 'read').mockResolvedValueOnce(riphDmDtos)

      // when
      const result = await ingestPipelineDm.extract<RiphDmDto>()

      // then
      expect(result).toStrictEqual(riphDmDtos)
    })
  })

  describe('transform', () => {
    it('should transform array of raw data into a collection of research study documents', () => {
      // given
      const riphDmDtos = [RiphDtoTestFactory.dm()]
      const { ingestPipelineDm } = setup()

      // when
      const result = ingestPipelineDm.transform(riphDmDtos)

      // then
      expect(result[0]).toBeInstanceOf(ResearchStudyModel)
    })
  })

  describe('load', () => {
    it('should load in bulk a collection of research study documents', async () => {
      // given
      const riphDmDtos = [RiphDtoTestFactory.dm(), RiphDtoTestFactory.dm(), RiphDtoTestFactory.dm()]
      const { databaseService, ingestPipelineDm } = setup()
      const documents = ingestPipelineDm.transform(riphDmDtos)
      vi.spyOn(databaseService, 'bulkDocuments').mockResolvedValueOnce()

      // when
      await ingestPipelineDm.load(documents)

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

  const ingestPipelineDm = new IngestPipelineDmDmdiv(logger, databaseService, readerService)

  return { databaseService, ingestPipelineDm, readerService }
}
