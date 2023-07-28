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
    readonly riphDto: RiphCtisDto[]
  ) {}

  async import(): Promise<void> {
    const riphCtisDtos: RiphCtisDto[] = this.extract()
    const researchStudyModel = this.transform(riphCtisDtos)
    await this.load(researchStudyModel)
  }

  extract(): RiphCtisDto[] {
    this.logger.info(`${this.riphDto.length} (CTIS)`)
    return [...this.riphDto]
  }

  transform(riphCtisDtos: RiphCtisDto[]): (IndexElasticsearch | ResearchStudyModel)[] {
    return riphCtisDtos.flatMap((riphCtisDto: RiphCtisDto): (IndexElasticsearch | ResearchStudyModel)[] => {
      return [{ create: { _id: riphCtisDto.numero_ctis } }, RiphCtisResearchStudyModelFactory.create(riphCtisDto)]
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
