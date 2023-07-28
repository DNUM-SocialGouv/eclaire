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
    readonly riphDto: RiphDmDto[]
  ) {}

  async import(): Promise<void> {
    const riphDmDtos: RiphDmDto[] = this.extract()
    const researchStudyModel = this.transform(riphDmDtos)
    await this.load(researchStudyModel)
  }

  extract(): RiphDmDto[] {
    this.logger.info(`${this.riphDto.length} (DM)`)
    return [...this.riphDto]
  }

  transform(riphDmDtos: RiphDmDto[]): (IndexElasticsearch | ResearchStudyModel)[] {
    return riphDmDtos.flatMap((riphDmDto: RiphDmDto): (IndexElasticsearch | ResearchStudyModel)[] => {
      return [{ create: { _id: riphDmDto.numero_national } }, RiphDmResearchStudyModelFactory.create(riphDmDto)]
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
