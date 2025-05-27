import { IngestPipeline } from './IngestPipeline'
import { ResearchStudyModel } from '../../../shared/models/domain-resources/ResearchStudyModel'
import { EclaireDto } from '../../dto/EclaireDto'
import { RiphJardeDto } from '../../dto/RiphJardeDto'
import { ResearchStudyModelFactory } from '../../factory/ResearchStudyModelFactory'

export class IngestPipelineJarde extends IngestPipeline {
  readonly type = 'jarde'

  async execute(): Promise<void> {
    const riphJardeDtos: RiphJardeDto[] = await super.extract<RiphJardeDto>()

    const chunkSize = Number.parseInt(process.env['CHUNK_SIZE'])
    for (let i = 0; i < riphJardeDtos.length; i += chunkSize) {
      this.logger.info(`---- Chunk JARDE: ${i} / ${riphJardeDtos.length} elasticsearch documents`)
      const chunk = riphJardeDtos.slice(i, i + chunkSize)
      const researchStudyDocuments: ResearchStudyModel[] = this.transform(chunk)
      await super.load(researchStudyDocuments)
    }
  }

  transform(riphJardeDtos: RiphJardeDto[]): ResearchStudyModel[] {
    const removeRapatrieeCtis = (jarde: RiphJardeDto): boolean => jarde.etat !== 'RAPATRIEE_CTIS'
    const riphJardeDtosWithoutRapatrieeCtis = riphJardeDtos.filter(removeRapatrieeCtis)

    const researchStudyModels: ResearchStudyModel[] = []
    for (const riphJardeDto of riphJardeDtosWithoutRapatrieeCtis) {
      const eclaireDto: EclaireDto = EclaireDto.fromJarde(riphJardeDto)
      if (eclaireDto) {
        researchStudyModels.push(ResearchStudyModelFactory.create(eclaireDto))
      }
    }
    return researchStudyModels
  }
}
