import { RiphDmDto } from './dto/RiphDmDto'
import { EtlShard, IndexElasticsearch, ResearchStudyElasticsearchDocument } from './EtlShard'
import { RiphDmResearchStudyModelFactory } from './factories/RiphDmResearchStudyModelFactory'

export class EtlShardDm extends EtlShard {
  readonly type = 'dm-dmdiv'

  async import(): Promise<void> {
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
