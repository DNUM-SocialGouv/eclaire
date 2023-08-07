import { errors } from '@elastic/elasticsearch'
import { Injectable } from '@nestjs/common'

import { IngestPipeline } from './ingest-pipelines/IngestPipeline'
import { IngestPipelineCtis } from './ingest-pipelines/IngestPipelineCtis'
import { IngestPipelineDmDmdiv } from './ingest-pipelines/IngestPipelineDmDmdiv'
import { IngestPipelineJarde } from './ingest-pipelines/IngestPipelineJarde'
import { ReaderService } from './reader/ReaderService'
import { researchStudyIndexMapping } from './researchStudyIndexMapping'
import { ElasticsearchService } from '../shared/elasticsearch/ElasticsearchService'
import { LoggerService } from '../shared/logger/LoggerService'

@Injectable()
export class EtlService {

  constructor(
    private readonly logger: LoggerService,
    private readonly elasticsearchService: ElasticsearchService,
    private readonly readerService: ReaderService
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

    const ingestPipelines: IngestPipeline[] = [
      new IngestPipelineCtis(this.logger, this.elasticsearchService, this.readerService),
      new IngestPipelineDmDmdiv(this.logger, this.elasticsearchService, this.readerService),
      new IngestPipelineJarde(this.logger, this.elasticsearchService, this.readerService),
    ]

    for (const ingestPipeline of ingestPipelines) {
      await ingestPipeline.execute()
    }

    this.logger.info('-- Fin de l’import des essais cliniques du RIPH.')
  }
}
