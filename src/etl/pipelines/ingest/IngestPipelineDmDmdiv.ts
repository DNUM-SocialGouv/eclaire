import { IngestPipeline } from './IngestPipeline'
import { ResearchStudyModel } from '../../../shared/models/domain-resources/ResearchStudyModel'
import { EclaireDto } from '../../dto/EclaireDto'
import { RiphDmDto } from '../../dto/RiphDmDto'
import { ResearchStudyModelFactory } from '../../factory/ResearchStudyModelFactory'

export class IngestPipelineDmDmdiv extends IngestPipeline {
  readonly type = 'dm-dmdiv'
  idsToDelete: (string | null)[] = []

  async execute(): Promise<void> {
    const batchSize = Number(process.env['CHUNK_SIZE'] ?? 100)

    const total = await this.processInBatches<RiphDmDto>(
      super.extractStream<RiphDmDto>(),
      batchSize,
      async (batch) => {
        await this.handleBatch(
          'DMDIV',
          batch,
          this.transform.bind(this),
          this.idsToDelete
        )
        this.idsToDelete = []
      }
    )

    this.logger.info(`---- Total records processed For DMDIV: ${total}`)
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

    return this.filterByDate(result)
  }

  async import(): Promise<void> {
    await this.execute()
  }
}
