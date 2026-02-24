import { errors } from '@opensearch-project/opensearch'
import * as console from 'console'
import fs from 'fs'

import { JsonFileReaderService } from './json-file-reader/JsonFileReaderService'
import { IngestPipeline } from './pipelines/ingest/IngestPipeline'
import { IngestPipelineCtis } from './pipelines/ingest/IngestPipelineCtis'
import { IngestPipelineDmDmdiv } from './pipelines/ingest/IngestPipelineDmDmdiv'
import { IngestPipelineImport } from './pipelines/ingest/IngestPipelineImport'
import { IngestPipelineJarde } from './pipelines/ingest/IngestPipelineJarde'
import { MedDraPipeline } from './pipelines/translation/MedDraPipeline'
import { TranslationPipeline } from './pipelines/translation/TranslationPipeline'
import { TranslationPipelineCtis } from './pipelines/translation/TranslationPipelineCtis'
import { S3Service } from './s3/S3Service'
import { elasticsearchIndexMapping } from '../shared/elasticsearch/elasticsearchIndexMapping'
import { ElasticsearchService } from '../shared/elasticsearch/ElasticsearchService'
import { LoggerService } from '../shared/logger/LoggerService'
import { TranslationService } from '../shared/translation/TranslationService'

export class EtlService {
  constructor(
    private readonly loggerService: LoggerService,
    private readonly databaseService: ElasticsearchService,
    private readonly readerService: S3Service | JsonFileReaderService,
    private readonly translationService: TranslationService
  ) { }

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

  async importData(startingDate?: string): Promise<void> {
    this.loggerService.info('-- Début de la mise à jour total des essais cliniques du RIPH.')
    await this.import(startingDate)
    this.loggerService.info('-- Fin de la mise à jour total des essais cliniques du RIPH.')
  }

  async dailyUpdate(startingDate?: string): Promise<void> {
    this.loggerService.info('-- Début de la mise à jour quotidienne des essais cliniques du RIPH.')
    await this.import(startingDate)
    await this.translateCtis(startingDate)
    await this.translate(startingDate)
    await this.updateMeddraLabels(startingDate)
    this.loggerService.info('-- Fin de la mise à jour quotidienne des essais cliniques du RIPH.')
  }

  async import(startingDate?: string): Promise<void> {
    this.loggerService.info('-- Début de l’import des essais cliniques du RIPH.')

    const ingestPipelines: IngestPipeline[] = [
      new IngestPipelineCtis(this.loggerService, this.databaseService, this.readerService, startingDate),
      new IngestPipelineDmDmdiv(this.loggerService, this.databaseService, this.readerService, startingDate),
      new IngestPipelineJarde(this.loggerService, this.databaseService, this.readerService, startingDate),
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
          throw new Error(error.meta.body?.error?.reason as string)
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

  async translate(startingDate?: string): Promise<void> {
    this.loggerService.info('-- Début de la traduction des essais cliniques JARDE / DM / DMDIV')

    try {
      const translationPipeline: TranslationPipeline = new TranslationPipeline(this.databaseService, this.translationService, this.loggerService)
      this.loggerService.info('-- Get translationPipeline JARDE / DM / DMDIV.')
      await translationPipeline.execute(startingDate)
    } catch (error) {
      if (error instanceof errors.ResponseError) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        throw new Error(error.meta.body.error.reason as string)
      }
      throw error
    }

    this.loggerService.info('-- Fin de la traduction des essais cliniques JARDE / DM / DMDIV')
  }

  async translateCtis(startingDate?: string): Promise<void> {
    this.loggerService.info('-- Début de la traduction des essais cliniques CTIS.')

    try {
      const translationPipelineCtis: TranslationPipelineCtis = new TranslationPipelineCtis(this.databaseService, this.translationService, this.loggerService)
      this.loggerService.info('-- Get translationPipeline CTIS.')
      await translationPipelineCtis.execute(startingDate)
    } catch (error) {
      if (error instanceof errors.ResponseError) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        throw new Error(error.meta.body.error.reason as string)
      }
      throw error
    }

    this.loggerService.info('-- Fin de la traduction des essais cliniques CTIS.')
  }

  async updateMeddraLabels(startingDate?: string): Promise<void> {
    this.loggerService.info('-- Début de la mise à jour des labels Meddra pour les essais cliniques CTIS.')

    try {
      const medDraPipeline: MedDraPipeline = new MedDraPipeline(this.databaseService, this.loggerService)
      await medDraPipeline.execute(startingDate)
    } catch (error) {
      if (error instanceof errors.ResponseError) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        throw new Error(error.meta.body.error.reason as string)
      }
      throw error
    }

    this.loggerService.info('-- Fin de la mise à jour des labels Meddra pour les essais cliniques CTIS.')
  }

  async importDataOnXLS(
    onProgress?: (p: number) => void
  ): Promise<string> {
    const pipeline = new IngestPipelineImport(this.loggerService, this.databaseService, this.readerService)
    await pipeline.runWithProgress(onProgress)

    const filePath = pipeline.getFilePath()
    if (!filePath) throw new Error('File generation failed')

    return filePath
  }
}
