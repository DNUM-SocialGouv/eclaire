import { RiphJardeDto } from './dto/RiphJardeDto'
import { EtlShard, IndexElasticsearch, ResearchStudyElasticsearchDocument } from './EtlShard'
import { RiphJardeResearchStudyModelFactory } from './factories/RiphJardeResearchStudyModelFactory'

export class EtlShardJarde extends EtlShard {
  async import(): Promise<void> {
    this.logger.info(`[Import] ${this.riphDtos.length} riphDtos (JARDE)`)
    const riphJardeDtos: RiphJardeDto[] = super.extract()
    const researchStudyDocuments: ResearchStudyElasticsearchDocument[] = this.transform(riphJardeDtos)

    const chunkSize = 200
    for (let i = 0; i < researchStudyDocuments.length; i += chunkSize) {
      this.logger.info(`---- Chunk JARDE: ${i} / ${researchStudyDocuments.length} elasticsearch documents`)
      const chunk = researchStudyDocuments.slice(i, i + chunkSize)
      await super.load(chunk)
    }
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
