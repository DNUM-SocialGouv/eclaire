import { IngestPipeline } from './IngestPipeline'
import { ResearchStudyModel } from '../../../shared/models/domain-resources/ResearchStudyModel'
import { EclaireDto } from '../../dto/EclaireDto'
import { RiphDmDto } from '../../dto/RiphDmDto'
import { ResearchStudyModelFactory } from '../../factory/ResearchStudyModelFactory'

export class IngestPipelineDmDmdiv extends IngestPipeline {
  readonly type = 'dm-dmdiv'

  async execute(): Promise<void> {
    const riphDmDtos: RiphDmDto[] = await super.extract<RiphDmDto>()

    /* const findResult = riphDmDtos.find((obj: any) => obj.numero_national === "8753-385746-41"); // 2024-JA1108-99 8753-385746-41  8753-385746-43
    console.log("docs dm ////", findResult) */

    const chunkSize = Number.parseInt(process.env['CHUNK_SIZE'])
    for (let i = 0; i < riphDmDtos.length; i += chunkSize) {
      this.logger.info(`---- Chunk DM-DM/DIV: ${i} / ${riphDmDtos.length} elasticsearch documents`)
      const chunk = riphDmDtos.slice(i, i + chunkSize)
      const researchStudyDocuments: ResearchStudyModel[] = this.transform(chunk)
      await super.load(researchStudyDocuments)
    }
  }

  transform(riphDmDtos: RiphDmDto[]): ResearchStudyModel[] {
    const result: ResearchStudyModel[] = []
    for (const riphDmDto of riphDmDtos) {
      const eclaireDto: EclaireDto = EclaireDto.fromDm(riphDmDto)
      if (eclaireDto) {
        result.push(ResearchStudyModelFactory.create(eclaireDto))
      }
    }
    return result
  }
}
