import { IngestPipeline } from './IngestPipeline'
import { EclaireDto } from '../dto/EclaireDto'
import { RiphCtisDto } from '../dto/RiphCtisDto'
import { ResearchStudyModelFactory } from '../factory/ResearchStudyModelFactory'
import { ResearchStudyModel } from 'src/shared/models/domain-resources/ResearchStudyModel'

export class IngestPipelineCtis extends IngestPipeline {
  readonly type = 'ctis'

  async execute(): Promise<void> {
    const riphCtisDtos: RiphCtisDto[] = await super.extract<RiphCtisDto>()
    const researchStudyDocuments: ResearchStudyModel[] = this.transform(riphCtisDtos)
    await super.load(researchStudyDocuments)
  }

  transform(riphCtisDtos: RiphCtisDto[]): ResearchStudyModel[] {
    return riphCtisDtos.map((riphCtisDto: RiphCtisDto): ResearchStudyModel => {
      const eclaireDto: EclaireDto = EclaireDto.fromCtis(riphCtisDto)
      return ResearchStudyModelFactory.create(eclaireDto)
    })
  }
}
