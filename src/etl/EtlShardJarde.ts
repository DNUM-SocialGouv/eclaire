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
    readonly riphDto: RiphJardeDto[]
  ) {}

  async import(): Promise<void> {
    const riphJardeDtos: RiphJardeDto[] = this.extract(this.riphDto)
    const researchStudyModel = this.transform(riphJardeDtos)
    await this.load(researchStudyModel)
  }

  extract(riphJardeDtos: RiphJardeDto[]): RiphJardeDto[] {
    this.logger.info(`${riphJardeDtos.length} (JARDE)`)
    const removeRapatrieeCtis = (jarde: RiphJardeDto): boolean => jarde.etat !== 'RAPATRIEE_CTIS'
    return [...riphJardeDtos.filter(removeRapatrieeCtis)]
  }

  transform(riphJardeDtos: RiphJardeDto[]): (IndexElasticsearch | ResearchStudyModel)[] {
    return riphJardeDtos.flatMap((riphJardeDto: RiphJardeDto): (IndexElasticsearch | ResearchStudyModel)[] => {
      return [{ create: { _id: riphJardeDto.numero_national } }, RiphJardeResearchStudyModelFactory.create(riphJardeDto)]
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
