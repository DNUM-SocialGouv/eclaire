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
    readonly riphDtos: RiphCtisDto[]
  ) {}

  async import(): Promise<void> {
    this.logger.info(`[Import] ${this.riphDtos.length} (CTIS)`)
    const riphCtisDtos: RiphCtisDto[] = this.extract()
    const researchStudyDocuments: (IndexElasticsearch | ResearchStudyModel)[] = this.transform(riphCtisDtos)
    await this.load(researchStudyDocuments)
  }

  extract(): RiphCtisDto[] {
    return [...this.riphDtos]
  }

  transform(riphCtisDtos: RiphCtisDto[]): (IndexElasticsearch | ResearchStudyModel)[] {
    return riphCtisDtos.flatMap((riphCtisDto: RiphCtisDto): (IndexElasticsearch | ResearchStudyModel)[] => {
      const indexElasticsearch: IndexElasticsearch = { create: { _id: riphCtisDto.numero_ctis } }
      return [indexElasticsearch, RiphCtisResearchStudyModelFactory.create(riphCtisDto)]
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
