import { RiphJardeDto } from './dto/RiphJardeDto'
import { EtlShard, IndexElasticsearch, ResearchStudyElasticsearchDocument } from './EtlShard'
import { RiphJardeResearchStudyModelFactory } from './RiphJardeResearchStudyModelFactory'

export class EtlShardJarde extends EtlShard {
  async import(): Promise<void> {
    this.logger.info(`[Import] ${this.riphDtos.length} (JARDE)`)
    const riphJardeDtos: RiphJardeDto[] = super.extract()
    const researchStudyDocuments: ResearchStudyElasticsearchDocument[] = this.transform(riphJardeDtos)
    await super.load(researchStudyDocuments)
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
