import { IngestPipeline } from './IngestPipeline'
import { EclaireDto } from '../dto/EclaireDto'
import { RiphDmDto } from '../dto/RiphDmDto'
import { ResearchStudyModelFactory } from '../factory/ResearchStudyModelFactory'
import { ResearchStudyModel } from 'src/shared/models/domain-resources/ResearchStudyModel'

export class IngestPipelineDmDmdiv extends IngestPipeline {
  readonly type = 'dm-dmdiv'

  async execute(): Promise<void> {
    const riphDmDtos: RiphDmDto[] = super.extract<RiphDmDto>()
    const researchStudyDocuments: ResearchStudyModel[] = this.transform(riphDmDtos)
    await super.load(researchStudyDocuments)
  }

  transform(riphDmDtos: RiphDmDto[]): ResearchStudyModel[] {
    return riphDmDtos.map((riphDmDto: RiphDmDto): ResearchStudyModel => {
      const eclaireDto: EclaireDto = EclaireDto.fromDm(riphDmDto)
      return ResearchStudyModelFactory.create(eclaireDto)
    })
  }
}
