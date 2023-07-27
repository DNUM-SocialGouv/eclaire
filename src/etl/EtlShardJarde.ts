import { RiphJardeDto } from './dto/RiphJardeDto'
import { EtlShard, IndexElasticsearch, ResearchStudyElasticsearchDocument } from './EtlShard'
import { RiphJardeResearchStudyModelFactory } from './RiphJardeResearchStudyModelFactory'

export class EtlShardJarde extends EtlShard {
  async import(): Promise<void> {
    this.logger.info(`[Import] ${this.riphDtos.length} (JARDE)`)
    const riphJardeDtos: RiphJardeDto[] = this.extract()
    const researchStudyDocuments: ResearchStudyElasticsearchDocument[] = this.transform(riphJardeDtos)
    await super.load(researchStudyDocuments)
  }

  override extract(): RiphJardeDto[] {
    const riphJardeDto: RiphJardeDto[] = [...this.riphDtos as RiphJardeDto[]]
    const removeRapatrieeCtis = (jarde: RiphJardeDto): boolean => jarde.etat !== 'RAPATRIEE_CTIS'
    return riphJardeDto.filter(removeRapatrieeCtis)
  }

  transform(riphJardeDtos: RiphJardeDto[]): ResearchStudyElasticsearchDocument[] {
    return riphJardeDtos.flatMap((riphJardeDto: RiphJardeDto): ResearchStudyElasticsearchDocument[] => {
      const indexElasticsearch: IndexElasticsearch = { create: { _id: riphJardeDto.numero_national } }
      return [indexElasticsearch, RiphJardeResearchStudyModelFactory.create(riphJardeDto)]
    })
  }
}
