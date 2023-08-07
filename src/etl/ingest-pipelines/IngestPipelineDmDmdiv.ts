import { IngestPipeline, IndexElasticsearch, ResearchStudyElasticsearchDocument } from './IngestPipeline'
import { RiphDmDto } from '../dto/RiphDmDto'
import { RiphDmResearchStudyModelFactory } from '../factories/RiphDmResearchStudyModelFactory'

export class IngestPipelineDmDmdiv extends IngestPipeline {
  readonly type = 'dm-dmdiv'

  async execute(): Promise<void> {
    const riphDmDtos: RiphDmDto[] = super.extract()
    const researchStudyDocuments: ResearchStudyElasticsearchDocument[] = this.transform(riphDmDtos)
    await super.load(researchStudyDocuments)
  }

  transform(riphDmDtos: RiphDmDto[]): ResearchStudyElasticsearchDocument[] {
    return riphDmDtos.flatMap((riphDmDto: RiphDmDto): ResearchStudyElasticsearchDocument[] => {
      const indexElasticsearch: IndexElasticsearch = { create: { _id: riphDmDto.numero_national } }
      return [indexElasticsearch, RiphDmResearchStudyModelFactory.create(riphDmDto)]
    })
  }
}
