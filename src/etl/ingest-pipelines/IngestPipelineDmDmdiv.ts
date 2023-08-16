import { ResearchStudy } from 'fhir/r4'

import { IngestPipeline, IndexElasticsearch, ResearchStudyElasticsearchDocument } from './IngestPipeline'
import { EclaireDto } from '../dto/EclaireDto'
import { RiphDmDto } from '../dto/RiphDmDto'
import { ResearchStudyModelFactory } from '../factory/ResearchStudyModelFactory'

export class IngestPipelineDmDmdiv extends IngestPipeline {
  readonly type = 'dm-dmdiv'

  async execute(): Promise<void> {
    const riphDmDtos: RiphDmDto[] = super.extract<RiphDmDto>()
    const researchStudyDocuments: ResearchStudyElasticsearchDocument[] = this.transform(riphDmDtos)
    await super.load(researchStudyDocuments)
  }

  transform(riphDmDtos: RiphDmDto[]): ResearchStudyElasticsearchDocument[] {
    return riphDmDtos.flatMap((riphDmDto: RiphDmDto): ResearchStudyElasticsearchDocument[] => {
      const indexElasticsearch: IndexElasticsearch = { create: { _id: riphDmDto.numero_national } }
      const eclaireDto: EclaireDto = EclaireDto.fromDm(riphDmDto)
      const researchStudyModel: ResearchStudy = ResearchStudyModelFactory.create(eclaireDto)
      return [indexElasticsearch, researchStudyModel]
    })
  }
}
