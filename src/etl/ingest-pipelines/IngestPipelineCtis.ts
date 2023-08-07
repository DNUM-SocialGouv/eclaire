import { IngestPipeline, IndexElasticsearch, ResearchStudyElasticsearchDocument } from './IngestPipeline'
import { RiphCtisDto } from '../dto/RiphCtisDto'
import { RiphCtisResearchStudyModelFactory } from '../factories/RiphCtisResearchStudyModelFactory'

export class IngestPipelineCtis extends IngestPipeline {
  readonly type = 'ctis'

  async execute(): Promise<void> {
    const riphCtisDtos: RiphCtisDto[] = super.extract()
    const researchStudyDocuments: ResearchStudyElasticsearchDocument[] = this.transform(riphCtisDtos)
    await super.load(researchStudyDocuments)
  }

  transform(riphCtisDtos: RiphCtisDto[]): ResearchStudyElasticsearchDocument[] {
    return riphCtisDtos.flatMap((riphCtisDto: RiphCtisDto): ResearchStudyElasticsearchDocument[] => {
      const indexElasticsearch: IndexElasticsearch = { create: { _id: riphCtisDto.numero_ctis } }
      return [indexElasticsearch, RiphCtisResearchStudyModelFactory.create(riphCtisDto)]
    })
  }
}
