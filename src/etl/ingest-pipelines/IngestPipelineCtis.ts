import { ResearchStudy } from 'fhir/r4'

import { IngestPipeline, IndexElasticsearch, ResearchStudyElasticsearchDocument } from './IngestPipeline'
import { EclaireDto } from '../dto/EclaireDto'
import { RiphCtisDto } from '../dto/RiphCtisDto'
import { ResearchStudyModelFactory } from '../factory/ResearchStudyModelFactory'

export class IngestPipelineCtis extends IngestPipeline {
  readonly type = 'ctis'

  async execute(): Promise<void> {
    const riphCtisDtos: RiphCtisDto[] = super.extract<RiphCtisDto>()
    const researchStudyDocuments: ResearchStudyElasticsearchDocument[] = this.transform(riphCtisDtos)
    await super.load(researchStudyDocuments)
  }

  transform(riphCtisDtos: RiphCtisDto[]): ResearchStudyElasticsearchDocument[] {
    return riphCtisDtos.flatMap((riphCtisDto: RiphCtisDto): ResearchStudyElasticsearchDocument[] => {
      const indexElasticsearch: IndexElasticsearch = { create: { _id: riphCtisDto.numero_ctis } }
      const eclaireDto: EclaireDto = EclaireDto.fromCtis(riphCtisDto)
      const researchStudyModel: ResearchStudy = ResearchStudyModelFactory.create(eclaireDto)
      return [indexElasticsearch, researchStudyModel]
    })
  }
}
