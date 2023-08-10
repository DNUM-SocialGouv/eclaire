import { ResearchStudy } from 'fhir/r4'

import { IngestPipeline, IndexElasticsearch, ResearchStudyElasticsearchDocument } from './IngestPipeline'
import { EclaireDto } from '../dto/EclaireDto'
import { RiphJardeDto } from '../dto/RiphJardeDto'
import { ResearchStudyModelFactory } from '../factory/ResearchStudyModelFactory'

export class IngestPipelineJarde extends IngestPipeline {
  readonly type = 'jarde'

  async execute(): Promise<void> {
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
      const eclaireDto: EclaireDto = EclaireDto.fromJarde(riphJardeDto)
      const researchStudyModel: ResearchStudy = ResearchStudyModelFactory.create(eclaireDto)
      return [indexElasticsearch, researchStudyModel]
    })
  }
}
