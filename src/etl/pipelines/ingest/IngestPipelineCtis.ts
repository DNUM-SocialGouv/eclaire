import { IngestPipeline } from './IngestPipeline'
import { ResearchStudyModel } from '../../../shared/models/domain-resources/ResearchStudyModel'
import { EclaireDto } from '../../dto/EclaireDto'
import { RiphCtisDto } from '../../dto/RiphCtisDto'
import { ResearchStudyModelFactory } from '../../factory/ResearchStudyModelFactory'

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
    }).filter((researchStudyModel: ResearchStudyModel) => {
      const startingDate: Date = new Date(this.startingDate)
      const lastUpdated: Date = new Date(researchStudyModel.meta.lastUpdated)
      return lastUpdated >= startingDate
    })
  }
}
