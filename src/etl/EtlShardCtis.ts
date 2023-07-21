import { errors } from '@elastic/elasticsearch'

import { RiphCtisDto } from './dto/RiphCtisDto'
import { EtlShard, IndexElasticsearch } from './EtlShard'
import { RiphCtisResearchStudyModelFactory } from './RiphCtisResearchStudyModelFactory'
import { ElasticsearchService } from '../shared/elasticsearch/ElasticsearchService'
import { LoggerService } from '../shared/logger/LoggerService'
import { ResearchStudyModel } from '../shared/models/fhir/ResearchStudyModel'

export class EtlShardCtis implements EtlShard {
  constructor(
    readonly logger: LoggerService,
    readonly elasticsearchService: ElasticsearchService,
    readonly dto: RiphCtisDto[]
  ) {}

  async import(): Promise<void> {
    const clinicalTrialsDto: RiphCtisDto[] = this.extract(this.dto)
    const researchStudyModel = this.transform(clinicalTrialsDto)
    await this.load(researchStudyModel)
  }

  extract(dto: RiphCtisDto[]): RiphCtisDto[] {
    this.logger.info(`${dto.length} (CTIS)`)
    return [...dto]
  }

  transform(clinicalTrialsDto: RiphCtisDto[]): (IndexElasticsearch | ResearchStudyModel)[] {
    return clinicalTrialsDto.flatMap((clinicalTrialDto: RiphCtisDto): (IndexElasticsearch | ResearchStudyModel)[] => {
      return [{ create: { _id: clinicalTrialDto.numero_ctis } }, RiphCtisResearchStudyModelFactory.create(clinicalTrialDto)]
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
