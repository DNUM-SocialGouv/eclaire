import { errors } from '@elastic/elasticsearch'

import { RiphDmDto } from './dto/RiphDmDto'
import { EtlShard, IndexElasticsearch } from './EtlShard'
import { RiphDmResearchStudyModelFactory } from './RiphDmResearchStudyModelFactory'
import { ElasticsearchService } from '../shared/elasticsearch/ElasticsearchService'
import { LoggerService } from '../shared/logger/LoggerService'
import { ResearchStudyModel } from '../shared/models/fhir/ResearchStudyModel'

export class EtlShardDm implements EtlShard {
  constructor(
    readonly logger: LoggerService,
    readonly elasticsearchService: ElasticsearchService,
    readonly dto: RiphDmDto[]
  ) {}

  async import(): Promise<void> {
    const clinicalTrialsDto: RiphDmDto[] = this.extract(this.dto)
    const researchStudyModel = this.transform(clinicalTrialsDto)
    await this.load(researchStudyModel)
  }

  extract(dto: RiphDmDto[]): RiphDmDto[] {
    this.logger.info(`${dto.length} (DM)`)
    return [...dto]
  }

  transform(clinicalTrialsDto: RiphDmDto[]): (IndexElasticsearch | ResearchStudyModel)[] {
    return clinicalTrialsDto.flatMap((clinicalTrialDto: RiphDmDto): (IndexElasticsearch | ResearchStudyModel)[] => {
      return [{ create: { _id: clinicalTrialDto.numero_national } }, RiphDmResearchStudyModelFactory.create(clinicalTrialDto)]
    })
  }

  async load(researchStudyModel: (IndexElasticsearch | ResearchStudyModel)[]): Promise<void> {
    try {
      await this.elasticsearchService.bulkDocuments<IndexElasticsearch | ResearchStudyModel>(researchStudyModel)
    } catch (error) {
      if (error instanceof errors.ResponseError) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        throw new Error(error.meta.body.error.reason as string)
      }
      throw error
    }
  }
}
