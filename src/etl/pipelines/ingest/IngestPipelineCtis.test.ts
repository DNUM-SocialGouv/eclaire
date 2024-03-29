import { afterEach } from 'vitest'

import { IngestPipelineCtis } from './IngestPipelineCtis'
import { ResearchStudyModel } from '../../../shared/models/domain-resources/ResearchStudyModel'
import { setupDependencies } from '../../../shared/test/helpers/elasticsearchHelper'
import { RiphDtoTestFactory } from '../../../shared/test/helpers/RiphDtoTestFactory'
import { RiphCtisDto } from '../../dto/RiphCtisDto'

describe('etl | IngestPipelineCtis', () => {
  describe('extract', () => {
    it('should extract raw data into an array', async () => {
      // given
      const riphCtisDtos = [RiphDtoTestFactory.ctis(), RiphDtoTestFactory.ctis(), RiphDtoTestFactory.ctis()]
      const { ingestPipelineCtis, readerService } = setup()
      vi.spyOn(readerService, 'read').mockResolvedValueOnce(riphCtisDtos)

      // when
      const result = await ingestPipelineCtis.extract<RiphCtisDto>()

      // then
      expect(result).toStrictEqual(riphCtisDtos)
    })
  })

  describe('transform', () => {
    afterEach(() => {
      vi.useRealTimers()
    })

    it('should transform array of raw data into a collection of research study documents', () => {
      // given
      vi.useFakeTimers()
      vi.setSystemTime(new Date('2022-10-07'))
      const riphCtisDtos = [RiphDtoTestFactory.ctis()]
      const { ingestPipelineCtis } = setup()

      // when
      const result = ingestPipelineCtis.transform(riphCtisDtos)

      // then
      expect(result[0]).toBeInstanceOf(ResearchStudyModel)
    })
  })

  describe('load', () => {
    it('should load in bulk a collection of research study documents', async () => {
      // given
      const riphCtisDtos = [RiphDtoTestFactory.ctis(), RiphDtoTestFactory.ctis(), RiphDtoTestFactory.ctis()]
      const { databaseService, ingestPipelineCtis } = setup()
      const documents = ingestPipelineCtis.transform(riphCtisDtos)
      vi.spyOn(databaseService, 'bulkDocuments').mockResolvedValueOnce()

      // when
      await ingestPipelineCtis.load(documents)

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

  const ingestPipelineCtis = new IngestPipelineCtis(logger, databaseService, readerService, '1970-01-01')

  return { databaseService, ingestPipelineCtis, readerService }
}
