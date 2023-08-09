import { IngestPipeline, IndexElasticsearch, ResearchStudyElasticsearchDocument } from './IngestPipeline'
import { ResearchStudyModel } from '../../shared/models/domain-resources/ResearchStudyModel'
import { EclaireDto } from '../dto/EclaireDto'
import { RiphCtisDto } from '../dto/RiphCtisDto'
import { ResearchStudyModelFactory } from '../factories/ResearchStudyModelFactory'

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
      const eclaireDto: EclaireDto = EclaireDto.fromCtis(riphCtisDto)
      const researchStudyModel: ResearchStudyModel = ResearchStudyModelFactory.create(eclaireDto)
      return [indexElasticsearch, researchStudyModel]
    })
  }
}
