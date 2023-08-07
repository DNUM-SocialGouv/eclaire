import { IngestPipeline, IndexElasticsearch, ResearchStudyElasticsearchDocument } from './IngestPipeline'
import { RiphJardeDto } from '../dto/RiphJardeDto'
import { RiphJardeResearchStudyModelFactory } from '../factories/RiphJardeResearchStudyModelFactory'

export class IngestPipelineJarde extends IngestPipeline {
  readonly type = 'jarde'

  async execute(): Promise<void> {
    const riphJardeDtos: RiphJardeDto[] = super.extract()
    const researchStudyDocuments: ResearchStudyElasticsearchDocument[] = this.transform(riphJardeDtos)

    const chunkSize = 200
    for (let i = 0; i < researchStudyDocuments.length; i += chunkSize) {
      this.logger.info(`---- Chunk JARDE: ${i} / ${researchStudyDocuments.length} elasticsearch documents`)
      const chunk = researchStudyDocuments.slice(i, i + chunkSize)
      await super.load(chunk)
    }
  }

  transform(riphJardeDtos: RiphJardeDto[]): ResearchStudyElasticsearchDocument[] {
    const removeRapatrieeCtis = (jarde: RiphJardeDto): boolean => jarde.etat !== 'RAPATRIEE_CTIS'
    const riphJardeDtosWithoutRapatrieeCtis = riphJardeDtos.filter(removeRapatrieeCtis)

    return riphJardeDtosWithoutRapatrieeCtis.flatMap((riphJardeDto: RiphJardeDto): ResearchStudyElasticsearchDocument[] => {
      const indexElasticsearch: IndexElasticsearch = { create: { _id: riphJardeDto.numero_national } }
      return [indexElasticsearch, RiphJardeResearchStudyModelFactory.create(riphJardeDto)]
    })
  }
}
