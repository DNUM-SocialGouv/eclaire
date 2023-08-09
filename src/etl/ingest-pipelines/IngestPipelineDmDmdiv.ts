import { IngestPipeline, IndexElasticsearch, ResearchStudyElasticsearchDocument } from './IngestPipeline'
import { ResearchStudyModel } from '../../shared/models/domain-resources/ResearchStudyModel'
import { EclaireDto } from '../dto/EclaireDto'
import { RiphDmDto } from '../dto/RiphDmDto'
import { ResearchStudyModelFactory } from '../factories/ResearchStudyModelFactory'

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
      const eclaireDto: EclaireDto = EclaireDto.fromDm(riphDmDto)
      const researchStudyModel: ResearchStudyModel = ResearchStudyModelFactory.create(eclaireDto)
      return [indexElasticsearch, researchStudyModel]
    })
  }
}
