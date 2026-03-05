import { IngestPipeline } from './IngestPipeline'
import { ResearchStudyModel } from '../../../shared/models/domain-resources/ResearchStudyModel'
import { EclaireDto } from '../../dto/EclaireDto'
import { RiphCtisDto } from '../../dto/RiphCtisDto'
import { ResearchStudyModelFactory } from '../../factory/ResearchStudyModelFactory'

export class IngestPipelineCtis extends IngestPipeline {
  readonly type = 'ctis'
  idsToDelete = []
  readonly excludeIds = [
    '2022-500024-30-00',
    '2022-500116-18-00',
    '2022-500177-13-00',
    '2022-500085-96-00',
    '2022-500628-31-00',
    '2022-501132-42-00',
    '2022-501142-30-00',
    '2022-501029-19-00',
    '2022-500520-30-00',
    '2022-501217-31-00',
    '2022-501363-40-00',
    '2022-500339-35-01',
    '2022-501261-46-00',
    '2022-500881-80-00',
    '2022-501074-19-00',
    '2023-503565-36-00',
    '2022-502045-10-00',
    '2022-501855-97-00',
    '2022-500823-61-00',
    '2022-502921-16-00',
    '2023-503494-38-00',
    '2022-502595-23-00',
    '2022-503060-33-00',
    '2022-503067-15-00',
    '2022-501263-41-00',
    '2022-502370-17-00',
    '2022-502853-32-00',
    '2022-502339-20-00',
    '2022-502810-10-00',
    '2023-504257-12-00',
    '2022-502880-39-00',
    '2022-502348-11-00',
    '2022-502881-25-00',
    '2022-502440-12-00',
    '2022-501621-20-00',
    '2023-504644-34-00',
    '2023-505108-52-00',
    '2022-502540-12-00',
    '2023-503554-12-00',
    '2023-503737-22-00',
    '2023-504178-39-00',
    '2023-504545-31-00',
    '2023-505745-16-00',
    '2024-511535-97-00',
    '2024-519779-24-00',
    '2022-500642-25-00',
    '2025-521371-31-00',
    '2023-505126-34-00',
    '2023-507519-36-00',
  ]

  async execute(): Promise<void> {
    const riphCtisDtos: RiphCtisDto[] = await super.extract<RiphCtisDto>()
    const chunkSize = Number.parseInt(process.env['CHUNK_SIZE'])
    for (let i = 0; i < riphCtisDtos.length; i += chunkSize) {
      this.logger.info(`---- Chunk CTIS: ${i} / ${riphCtisDtos.length} elasticsearch documents`)
      const chunk = riphCtisDtos.slice(i, i + chunkSize)
      const researchStudyDocuments: ResearchStudyModel[] = this.transform(chunk)
      this.logger.info(`---- Chunk CTIS: number of documents to update : ${researchStudyDocuments.length}`)
      await super.load(researchStudyDocuments)
      // Delete documents with status non autorisé (fermé)
      await super.delete(this.idsToDelete.filter((v) => v !== null))
      this.logger.info(`////// Chunk CTIS: number of documents to delete : ${this.idsToDelete.length}`)
      this.idsToDelete = []
    }
  }

  transform(riphCtisDtos: RiphCtisDto[]): ResearchStudyModel[] {
    const researchStudyModels: ResearchStudyModel[] = []
    for (const riphCtisDto of riphCtisDtos) {
      const eclaireDto: EclaireDto = EclaireDto.fromCtis(riphCtisDto)
      if (eclaireDto && eclaireDto.numero_primaire && !eclaireDto.to_delete && !this.excludeIds.includes(eclaireDto.numero_primaire)) {
        researchStudyModels.push(ResearchStudyModelFactory.create(eclaireDto))
      } else {
        this.idsToDelete.push(eclaireDto.numero_primaire)
      }
    }

    return researchStudyModels.filter((researchStudyModel: ResearchStudyModel) => {
      const startingDate: Date = new Date(this.startingDate)
      const lastUpdated: Date = new Date(researchStudyModel.meta.lastUpdated)
      return lastUpdated >= startingDate
    })
  }

  async import(): Promise<void> {
    await this.execute()
  }

}
