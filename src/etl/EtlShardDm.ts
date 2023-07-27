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
    readonly riphDtos: RiphDmDto[]
  ) {}

  async import(): Promise<void> {
    this.logger.info(`[Import] ${this.riphDtos.length} (DM)`)
    const riphDmDtos: RiphDmDto[] = this.extract()
    const researchStudyDocuments: (IndexElasticsearch | ResearchStudyModel)[] = this.transform(riphDmDtos)
    await this.load(researchStudyDocuments)
  }

  extract(): RiphDmDto[] {
    return [...this.riphDtos]
  }

  transform(riphDmDtos: RiphDmDto[]): (IndexElasticsearch | ResearchStudyModel)[] {
    return riphDmDtos.flatMap((riphDmDto: RiphDmDto): (IndexElasticsearch | ResearchStudyModel)[] => {
      const indexElasticsearch: IndexElasticsearch = { create: { _id: riphDmDto.numero_national } }
      return [indexElasticsearch, RiphDmResearchStudyModelFactory.create(riphDmDto)]
    })
  }

  async load(documents: (IndexElasticsearch | ResearchStudyModel)[]): Promise<void> {
    try {
      await this.elasticsearchService.bulkDocuments<IndexElasticsearch | ResearchStudyModel>(documents)
    } catch (error) {
      if (error instanceof errors.ResponseError) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        throw new Error(error.meta.body.error.reason as string)
      }
      throw error
    }
  }
}
