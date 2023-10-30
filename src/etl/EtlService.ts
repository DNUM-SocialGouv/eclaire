import { errors } from '@elastic/elasticsearch'
import fs from 'fs'

import { IngestPipeline } from './ingest-pipelines/IngestPipeline'
import { IngestPipelineCtis } from './ingest-pipelines/IngestPipelineCtis'
import { IngestPipelineDmDmdiv } from './ingest-pipelines/IngestPipelineDmDmdiv'
import { IngestPipelineJarde } from './ingest-pipelines/IngestPipelineJarde'
import { S3Service } from './s3/S3Service'
import { elasticsearchIndexMapping } from '../shared/elasticsearch/elasticsearchIndexMapping'
import { ElasticsearchService } from '../shared/elasticsearch/ElasticsearchService'
import { LoggerService } from '../shared/logger/LoggerService'

export class EtlService {
  constructor(
    private readonly loggerService: LoggerService,
    private readonly databaseService: ElasticsearchService,
    private readonly readerService: S3Service
  ) {}

  async createIndex(): Promise<void> {
    this.loggerService.info('-- Début de la création de l’index ECLAIRE dans Elasticsearch.')

    try {
      await this.databaseService.createAnIndex(elasticsearchIndexMapping)
      this.loggerService.info('-- Fin de la création de l’index ECLAIRE dans Elasticsearch.')
    } catch (error) {
      if (error instanceof errors.ResponseError) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        throw new Error(error.meta.body.error.reason as string)
      }
      throw error
    }
  }

  async deleteIndex(): Promise<void> {
    this.loggerService.info('-- Début de la destruction de l’index ECLAIRE dans Elasticsearch.')

    try {
      await this.databaseService.deleteAnIndex()
      this.loggerService.info('-- Fin de la destruction de l’index ECLAIRE dans Elasticsearch.')
    } catch (error) {
      if (error instanceof errors.ResponseError) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        throw new Error(error.meta.body.error.reason as string)
      }
      throw error
    }
  }

  async import(): Promise<void> {
    this.loggerService.info('-- Début de l’import des essais cliniques du RIPH.')

    const ingestPipelines: IngestPipeline[] = [
      new IngestPipelineCtis(this.loggerService, this.databaseService, this.readerService),
      new IngestPipelineDmDmdiv(this.loggerService, this.databaseService, this.readerService),
      new IngestPipelineJarde(this.loggerService, this.databaseService, this.readerService),
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

    this.loggerService.info('-- Fin de l’import des essais cliniques du RIPH.')
  }

  async medDraImport(): Promise<void> {
    this.loggerService.info('-- Début de l’import des données de MedDra.')

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
      await this.databaseService.deleteMedDraIndex()
      await this.databaseService.createMedDraIndex()
      await this.databaseService.bulkMedDraDocuments(medDraCodeAndLabel)
      await this.databaseService.createPolicies()
    } catch (error) {
      if (error instanceof errors.ResponseError) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        throw new Error(error.meta.body.error.reason as string)
      }
      throw error
    }

    this.loggerService.info('-- Fin de l’import des données de MedDra.')
  }

  async createPolicies(): Promise<void> {
    this.loggerService.info('-- Début de la création des polices dans Elasticsearch.')

    try {
      await this.databaseService.createPolicies()
      this.loggerService.info('-- Fin de la création des polices dans Elasticsearch.')
    } catch (error) {
      if (error instanceof errors.ResponseError) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        throw new Error(error.meta.body.error.reason as string)
      }
      throw error
    }
  }

  async deletePolicies(): Promise<void> {
    this.loggerService.info('-- Début de la destruction des polices dans Elasticsearch.')

    try {
      await this.databaseService.deletePolicies()
      this.loggerService.info('-- Fin de la destruction des polices dans Elasticsearch.')
    } catch (error) {
      if (error instanceof errors.ResponseError) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        throw new Error(error.meta.body.error.reason as string)
      }
      throw error
    }
  }

  async deletePipelines(): Promise<void> {
    this.loggerService.info('-- Début de la destruction des pipelines dans Elasticsearch.')

    try {
      await this.databaseService.deletePipelines()
      this.loggerService.info('-- Fin de la destruction des pipelines dans Elasticsearch.')
    } catch (error) {
      if (error instanceof errors.ResponseError) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        throw new Error(error.meta.body.error.reason as string)
      }
      throw error
    }
  }
}
