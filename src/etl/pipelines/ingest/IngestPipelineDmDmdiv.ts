import { IngestPipeline } from './IngestPipeline'
import { ResearchStudyModel } from '../../../shared/models/domain-resources/ResearchStudyModel'
import { EclaireDto } from '../../dto/EclaireDto'
import { RiphDmDto } from '../../dto/RiphDmDto'
import { ResearchStudyModelFactory } from '../../factory/ResearchStudyModelFactory'

export class IngestPipelineDmDmdiv extends IngestPipeline {
  readonly type = 'dm-dmdiv'
  idsToDelete = []

  async execute(): Promise<void> {
    let i = 0
    const batchSize = Number(process.env['CHUNK_SIZE'] ?? 100)
    let buffer: RiphDmDto[] = []

    for await (const record of super.extractStream<RiphDmDto>()) {
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
    this.logger.info(`---- Total records processed For DMDIV: ${i}`);
  }

  private async processBatch(buffer: RiphDmDto[]): Promise<void> {
    if (!buffer.length) return

    this.logger.info(`---- DMDIV Processing batch of ${buffer.length} records`)

    const researchStudyDocuments = this.transform(buffer)

    this.logger.info(`---- Chunk DMDIV: number of documents to update : ${researchStudyDocuments.length}`)

    if (researchStudyDocuments.length > 0) {
      await super.load(researchStudyDocuments)
    }

    // Delete documents with status non autorisé (fermé)
    const idsToDeleteFiltered = this.idsToDelete.filter((v) => v !== null)
    if (idsToDeleteFiltered.length > 0) {
      await super.delete(idsToDeleteFiltered)
    }

    this.logger.info(`////// Chunk DMDIV: number of documents to delete : ${this.idsToDelete.length}`)

    this.idsToDelete = []
  }

  transform(riphDmDtos: RiphDmDto[]): ResearchStudyModel[] {
    const result: ResearchStudyModel[] = []
    for (const riphDmDto of riphDmDtos) {
      const eclaireDto: EclaireDto = EclaireDto.fromDm(riphDmDto)
      if (eclaireDto && eclaireDto.numero_primaire && !eclaireDto.to_delete) {
        result.push(ResearchStudyModelFactory.create(eclaireDto))
      } else {
        this.idsToDelete.push(eclaireDto.numero_primaire)
      }
    }

    return result.filter((researchStudyModel: ResearchStudyModel) => {
      const startingDate: Date = new Date(this.startingDate)
      const lastUpdated: Date = new Date(researchStudyModel.meta.lastUpdated)
      return lastUpdated >= startingDate
    })
  }

  async import(): Promise<void> {
    await this.execute()
  }

}
