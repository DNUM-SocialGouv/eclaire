import { RiphDmDto } from './dto/RiphDmDto'
import { EtlShard, IndexElasticsearch, ResearchStudyElasticsearchDocument } from './EtlShard'
import { RiphDmResearchStudyModelFactory } from './RiphDmResearchStudyModelFactory'

export class EtlShardDm extends EtlShard {
  async import(): Promise<void> {
    this.logger.info(`[Import] ${this.riphDtos.length} (DM)`)
    const riphDmDtos: RiphDmDto[] = super.extract() as RiphDmDto[]
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
