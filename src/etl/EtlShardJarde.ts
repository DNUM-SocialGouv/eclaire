import { errors } from '@elastic/elasticsearch'

import { RiphJardeDto } from './dto/RiphJardeDto'
import { EtlShard, IndexElasticsearch } from './EtlShard'
import { RiphJardeResearchStudyModelFactory } from './RiphJardeResearchStudyModelFactory'
import { ElasticsearchService } from '../shared/elasticsearch/ElasticsearchService'
import { LoggerService } from '../shared/logger/LoggerService'
import { ResearchStudyModel } from '../shared/models/fhir/ResearchStudyModel'

export class EtlShardJarde implements EtlShard {
  constructor(
    readonly logger: LoggerService,
    readonly elasticsearchService: ElasticsearchService,
    readonly dto: RiphJardeDto[]
  ) {}

  async import(): Promise<void> {
    const clinicalTrialsDto: RiphJardeDto[] = this.extract(this.dto)
    const researchStudyModel = this.transform(clinicalTrialsDto)
    await this.load(researchStudyModel)
  }

  extract(dto: RiphJardeDto[]): RiphJardeDto[] {
    this.logger.info(`${dto.length} (JARDE)`)
    return [...dto]
  }

  transform(clinicalTrialsDto: RiphJardeDto[]): (IndexElasticsearch | ResearchStudyModel)[] {
    return clinicalTrialsDto.flatMap((clinicalTrialDto: RiphJardeDto): (IndexElasticsearch | ResearchStudyModel)[] => {
      return [{ create: { _id: clinicalTrialDto.numero_national } }, RiphJardeResearchStudyModelFactory.create(clinicalTrialDto)]
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
