import { RiphCtisDto } from './dto/RiphCtisDto'
import { EtlShard, IndexElasticsearch, ResearchStudyElasticsearchDocument } from './EtlShard'
import { RiphCtisResearchStudyModelFactory } from './factories/RiphCtisResearchStudyModelFactory'

export class EtlShardCtis extends EtlShard {
  async import(): Promise<void> {
    this.logger.info(`[Import] ${this.riphDtos.length} (CTIS)`)
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
