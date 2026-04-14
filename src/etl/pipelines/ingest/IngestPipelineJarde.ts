import { IngestPipeline } from './IngestPipeline'
import { ResearchStudyModel } from '../../../shared/models/domain-resources/ResearchStudyModel'
import { EclaireDto } from '../../dto/EclaireDto'
import { RiphJardeDto } from '../../dto/RiphJardeDto'
import { ResearchStudyModelFactory } from '../../factory/ResearchStudyModelFactory'

export class IngestPipelineJarde extends IngestPipeline {
  readonly type = 'jarde'
  idsToDelete = []

  async execute(): Promise<void> {
    let i = 0
    const batchSize = Number(process.env['CHUNK_SIZE'] ?? 100)
    let buffer: RiphJardeDto[] = []

    for await (const record of super.extractStream<RiphJardeDto>()) {
      buffer.push(record);
      i++;

      if (buffer.length === batchSize) {
        await this.processBatch(buffer)
        buffer = []; // reset        
      }
    }

    // Final batch
    if (buffer.length > 0) {
      await this.processBatch(buffer)
    }
    this.logger.info(`---- Total records processed For JARDE: ${i}`);
  }

  private async processBatch(buffer: RiphJardeDto[]): Promise<void> {
    if (!buffer.length) return

    this.logger.info(`---- JARDE Processing batch of ${buffer.length} records`)

    const researchStudyDocuments = this.transform(buffer)

    this.logger.info(`---- Chunk JARDE: number of documents to update : ${researchStudyDocuments.length}`)

    if (researchStudyDocuments.length > 0) {
      await super.load(researchStudyDocuments)
    }

    // Delete documents with status non autorisé (fermé)
    const idsToDeleteFiltered = this.idsToDelete.filter((v) => v !== null)
    if (idsToDeleteFiltered.length > 0) {
      await super.delete(idsToDeleteFiltered)
    }

    this.logger.info(`////// Chunk JARDE: number of documents to delete : ${this.idsToDelete.length}`)

    this.idsToDelete = []
  }

  transform(riphJardeDtos: RiphJardeDto[]): ResearchStudyModel[] {
    const removeRapatrieeCtis = (jarde: RiphJardeDto): boolean => jarde.etat !== 'RAPATRIEE_CTIS'
    const riphJardeDtosWithoutRapatrieeCtis = riphJardeDtos.filter(removeRapatrieeCtis)

    const researchStudyModels: ResearchStudyModel[] = []
    for (const riphJardeDto of riphJardeDtosWithoutRapatrieeCtis) {
      const eclaireDto: EclaireDto = EclaireDto.fromJarde(riphJardeDto)
      if (eclaireDto && eclaireDto.numero_primaire && !eclaireDto.to_delete) {
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
