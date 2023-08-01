import { errors } from '@elastic/elasticsearch'
import { Injectable } from '@nestjs/common'

import { RiphCtisDto } from './dto/RiphCtisDto'
import { RiphDmDto } from './dto/RiphDmDto'
import { RiphJardeDto } from './dto/RiphJardeDto'
import { EtlShard } from './EtlShard'
import { EtlShardCtis } from './EtlShardCtis'
import { EtlShardDm } from './EtlShardDm'
import { EtlShardJarde } from './EtlShardJarde'
import { researchStudyIndexMapping } from './researchStudyIndexMapping'
import { ElasticsearchService } from '../shared/elasticsearch/ElasticsearchService'
import { LoggerService } from '../shared/logger/LoggerService'

@Injectable()
export class FhirEtlService {

  constructor(
    private readonly logger: LoggerService,
    private readonly elasticsearchService: ElasticsearchService,
    private readonly riphCtisDto: RiphCtisDto[],
    private readonly riphDmDto: RiphDmDto[],
    private readonly riphJardeDto: RiphJardeDto[]
  ) {}

  async createIndex(): Promise<void> {
    this.logger.info('-- Début de la création de l’index ECLAIRE dans Elasticsearch.')
    try {
      await this.elasticsearchService.createAnIndex(researchStudyIndexMapping)
      this.logger.info('-- Fin de la création de l’index ECLAIRE dans Elasticsearch.')
    } catch (error) {
      if (error instanceof errors.ResponseError) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        throw new Error(error.meta.body.error.reason as string)
      }
      throw error
    }
  }

  async deleteIndex(): Promise<void> {
    this.logger.info('-- Début de la destruction de l’index ECLAIRE dans Elasticsearch.')
    try {
      await this.elasticsearchService.deleteAnIndex()
      this.logger.info('-- Fin de la destruction de l’index ECLAIRE dans Elasticsearch.')
    } catch (error) {
      if (error instanceof errors.ResponseError) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        throw new Error(error.meta.body.error.reason as string)
      }
      throw error
    }
  }

  async import(): Promise<void> {
    this.logger.info('-- Début de l’import des essais cliniques du RIPH.')

    const etlShards: EtlShard[] = [
      new EtlShardCtis(this.logger, this.elasticsearchService, this.riphCtisDto),
      new EtlShardDm(this.logger, this.elasticsearchService, this.riphDmDto),
      new EtlShardJarde(this.logger, this.elasticsearchService, this.riphJardeDto),
    ]

    for (const shard of etlShards) {
      await shard.import()
    }

    this.logger.info('-- Fin de l’import des essais cliniques du RIPH.')
  }
}
