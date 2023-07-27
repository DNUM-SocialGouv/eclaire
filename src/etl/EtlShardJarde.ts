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
    readonly riphDtos: RiphJardeDto[]
  ) {}

  async import(): Promise<void> {
    this.logger.info(`[Import] ${this.riphDtos.length} (JARDE)`)
    const riphJardeDtos: RiphJardeDto[] = this.extract()
    const researchStudyDocuments: (IndexElasticsearch | ResearchStudyModel)[] = this.transform(riphJardeDtos)
    await this.load(researchStudyDocuments)
  }

  extract(): RiphJardeDto[] {
    const removeRapatrieeCtis = (jarde: RiphJardeDto): boolean => jarde.etat !== 'RAPATRIEE_CTIS'
    return [...this.riphDtos.filter(removeRapatrieeCtis)]
  }

  transform(riphJardeDtos: RiphJardeDto[]): (IndexElasticsearch | ResearchStudyModel)[] {
    return riphJardeDtos.flatMap((riphJardeDto: RiphJardeDto): (IndexElasticsearch | ResearchStudyModel)[] => {
      const indexElasticsearch: IndexElasticsearch = { create: { _id: riphJardeDto.numero_national } }
      return [indexElasticsearch, RiphJardeResearchStudyModelFactory.create(riphJardeDto)]
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
