import { errors } from '@elastic/elasticsearch'
import { Injectable } from '@nestjs/common'
import fs from 'fs'

import { IngestPipeline } from './ingest-pipelines/IngestPipeline'
import { IngestPipelineCtis } from './ingest-pipelines/IngestPipelineCtis'
import { IngestPipelineDmDmdiv } from './ingest-pipelines/IngestPipelineDmDmdiv'
import { IngestPipelineJarde } from './ingest-pipelines/IngestPipelineJarde'
import { S3Service } from './s3/S3Service'
import { elasticsearchIndexMapping } from '../shared/elasticsearch/elasticsearchIndexMapping'
import { ElasticsearchService } from '../shared/elasticsearch/ElasticsearchService'
import { LoggerService } from '../shared/logger/LoggerService'

@Injectable()
export class EtlService {
  constructor(
    private readonly logger: LoggerService,
    private readonly elasticsearchService: ElasticsearchService,
    private readonly readerService: S3Service
  ) {}

  async createIndex(): Promise<void> {
    this.logger.info('-- Début de la création de l’index ECLAIRE dans Elasticsearch.')

    try {
      await this.elasticsearchService.createAnIndex(elasticsearchIndexMapping)
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
      try {
        await ingestPipeline.execute()
      } catch (error) {
        if (error instanceof errors.ResponseError) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          if (error.meta.body.failures) {
            // eslint-disable-next-line no-console, @typescript-eslint/no-unsafe-member-access
            console.log(error.meta.body.failures)
          }

          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          throw new Error(error.meta.body.error.reason as string)
        }
        throw error
      }
    }

    this.logger.info('-- Fin de l’import des essais cliniques du RIPH.')
  }

  async medDraImport(): Promise<void> {
    this.logger.info('-- Début de l’import des données de MedDra.')

    const medDraRawData = fs.readFileSync('meddra-utf8.asc', 'utf8')
    const medDraCodeAndLabel = medDraRawData
      .split('\n')
      .map((rawData) => {
        const splitedData = rawData.split('$')

        return {
          code: splitedData[0],
          label: splitedData[1],
        }
      })

    try {
      await this.elasticsearchService.deleteMedDraIndex()
      await this.elasticsearchService.createMedDraIndex()
      await this.elasticsearchService.bulkMedDraDocuments(medDraCodeAndLabel)
      await this.elasticsearchService.createPolicies()
    } catch (error) {
      if (error instanceof errors.ResponseError) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        throw new Error(error.meta.body.error.reason as string)
      }
      throw error
    }

    this.logger.info('-- Fin de l’import des données de MedDra.')
  }

  async createPolicies(): Promise<void> {
    this.logger.info('-- Début de la création des polices dans Elasticsearch.')

    try {
      await this.elasticsearchService.createPolicies()
      this.logger.info('-- Fin de la création des polices dans Elasticsearch.')
    } catch (error) {
      if (error instanceof errors.ResponseError) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        throw new Error(error.meta.body.error.reason as string)
      }
      throw error
    }
  }

  async deletePolicies(): Promise<void> {
    this.logger.info('-- Début de la destruction des polices dans Elasticsearch.')

    try {
      await this.elasticsearchService.deletePolicies()
      this.logger.info('-- Fin de la destruction des polices dans Elasticsearch.')
    } catch (error) {
      if (error instanceof errors.ResponseError) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        throw new Error(error.meta.body.error.reason as string)
      }
      throw error
    }
  }

  async deletePipelines(): Promise<void> {
    this.logger.info('-- Début de la destruction des pipelines dans Elasticsearch.')

    try {
      await this.elasticsearchService.deletePipelines()
      this.logger.info('-- Fin de la destruction des pipelines dans Elasticsearch.')
    } catch (error) {
      if (error instanceof errors.ResponseError) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        throw new Error(error.meta.body.error.reason as string)
      }
      throw error
    }
  }
}
