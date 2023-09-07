import { IngestPipeline } from './IngestPipeline'
import { EclaireDto } from '../dto/EclaireDto'
import { RiphJardeDto } from '../dto/RiphJardeDto'
import { ResearchStudyModelFactory } from '../factory/ResearchStudyModelFactory'
import { ResearchStudyModel } from 'src/shared/models/domain-resources/ResearchStudyModel'

export class IngestPipelineJarde extends IngestPipeline {
  readonly type = 'jarde'

  async execute(): Promise<void> {
    const riphJardeDtos: RiphJardeDto[] = super.extract<RiphJardeDto>()
    const researchStudyDocuments: ResearchStudyModel[] = this.transform(riphJardeDtos)

    const chunkSize = 200
    for (let i = 0; i < researchStudyDocuments.length; i += chunkSize) {
      this.logger.info(`---- Chunk JARDE: ${i} / ${researchStudyDocuments.length} elasticsearch documents`)
      const chunk = researchStudyDocuments.slice(i, i + chunkSize)
      await super.load(chunk)
    }
  }

  transform(riphJardeDtos: RiphJardeDto[]): ResearchStudyModel[] {
    const removeRapatrieeCtis = (jarde: RiphJardeDto): boolean => jarde.etat !== 'RAPATRIEE_CTIS'
    const riphJardeDtosWithoutRapatrieeCtis = riphJardeDtos.filter(removeRapatrieeCtis)

    return riphJardeDtosWithoutRapatrieeCtis.flatMap((riphJardeDto: RiphJardeDto): ResearchStudyModel => {
      const eclaireDto: EclaireDto = EclaireDto.fromJarde(riphJardeDto)
      return ResearchStudyModelFactory.create(eclaireDto)
    })
  }
}
