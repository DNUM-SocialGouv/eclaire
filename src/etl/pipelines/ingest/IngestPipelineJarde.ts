import { IngestPipeline } from './IngestPipeline'
import { ResearchStudyModel } from '../../../shared/models/domain-resources/ResearchStudyModel'
import { EclaireDto } from '../../dto/EclaireDto'
import { RiphJardeDto } from '../../dto/RiphJardeDto'
import { ResearchStudyModelFactory } from '../../factory/ResearchStudyModelFactory'

export class IngestPipelineJarde extends IngestPipeline {
  readonly type = 'jarde'
  idsToDelete = []

  async execute(): Promise<void> {
    const batchSize = Number(process.env['CHUNK_SIZE'] ?? 100)

    const total = await this.processInBatches<RiphJardeDto>(
      super.extractStream<RiphJardeDto>(),
      batchSize,
      async (batch) => {
        await this.handleBatch(
          'JARDE',
          batch,
          this.transform.bind(this),
          this.idsToDelete
        )
        this.idsToDelete = []
      }
    )

    this.logger.info(`---- Total records processed For JARDE: ${total}`)
  }

  transform(riphJardeDtos: RiphJardeDto[]): ResearchStudyModel[] {
    const removeRapatrieeCtis = (jarde: RiphJardeDto): boolean => jarde.etat !== 'RAPATRIEE_CTIS'
    const riphJardeDtosWithoutRapatrieeCtis = riphJardeDtos.filter(removeRapatrieeCtis)

    const result: ResearchStudyModel[] = []
    for (const riphJardeDto of riphJardeDtosWithoutRapatrieeCtis) {
      const eclaireDto: EclaireDto = EclaireDto.fromJarde(riphJardeDto)
      if (eclaireDto && eclaireDto.numero_primaire && !eclaireDto.to_delete) {
        result.push(ResearchStudyModelFactory.create(eclaireDto))
      } else {
        this.idsToDelete.push(eclaireDto.numero_primaire)
      }
    }

    return this.filterByDate(result)
  }

  async import(): Promise<void> {
    await this.execute()
  }
}
