import { IngestPipeline } from './IngestPipeline'
import { ResearchStudyModel } from '../../../shared/models/domain-resources/ResearchStudyModel'
import { EclaireDto } from '../../dto/EclaireDto'
import { RiphCtisDto } from '../../dto/RiphCtisDto'
import { ResearchStudyModelFactory } from '../../factory/ResearchStudyModelFactory'

export class IngestPipelineCtis extends IngestPipeline {
  readonly type = 'ctis'

  async execute(): Promise<void> {
    const riphCtisDtos: RiphCtisDto[] = await super.extract<RiphCtisDto>()
    const chunkSize = Number.parseInt(process.env['CHUNK_SIZE'])
    for (let i = 0; i < riphCtisDtos.length; i += chunkSize) {
      this.logger.info(`---- Chunk CTIS: ${i} / ${riphCtisDtos.length} elasticsearch documents`)
      const chunk = riphCtisDtos.slice(i, i + chunkSize)
      const researchStudyDocuments: ResearchStudyModel[] = this.transform(chunk)
      await super.load(researchStudyDocuments)
    }
  }

  transform(riphCtisDtos: RiphCtisDto[]): ResearchStudyModel[] {
    const researchStudyModels: ResearchStudyModel[] = []
    for (const riphCtisDto of riphCtisDtos) {
      const eclaireDto: EclaireDto = EclaireDto.fromCtis(riphCtisDto)

      if (eclaireDto) {
        researchStudyModels.push(ResearchStudyModelFactory.create(eclaireDto))
      }
    }

    return researchStudyModels.filter((researchStudyModel: ResearchStudyModel) => {
      const startingDate: Date = new Date(this.startingDate)
      const lastUpdated: Date = new Date(researchStudyModel.meta.lastUpdated)
      return lastUpdated >= startingDate
    })
  }
}
