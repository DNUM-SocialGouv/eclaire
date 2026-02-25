/* eslint-disable sort-keys */
import { Injectable } from '@nestjs/common'
import { randomUUID } from 'crypto'

import { ElasticsearchService } from '../../../shared/elasticsearch/ElasticsearchService'
import { exportJobsIndexMapping } from '../../../shared/elasticsearch/exportJobsIndexMapping'

export type JobStatus = 'pending' | 'processing' | 'done' | 'error'

export interface ExportJob {
  id: string
  status: JobStatus
  progress: number
  filePath?: string
  error?: string
  createdAt?: string
  updatedAt?: string
}

@Injectable()
export class ExportJobService {
  private readonly INDEX = 'export_jobs'

  constructor(private readonly esService: ElasticsearchService) { }

  async createIndex(): Promise<void> {
    const exists = await this.esService.client.indices.exists({ index: this.INDEX })
    if (!exists.body) {
      await this.esService.createAnIndex(exportJobsIndexMapping, this.INDEX)
    }
  }

  async createJob(): Promise<ExportJob> {
    // Check if there is a job in progress
    const runningJobs = await this.esService.countDocuments({ status: 'processing' })
    if (runningJobs > 0) throw new Error('Un export est déjà en cours.')

    const job: ExportJob = {
      id: randomUUID(),
      status: 'pending',
      progress: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    await this.esService.indexDocument(this.INDEX, job.id, job)

    return job
  }

  async getJob(id: string): Promise<ExportJob | null> {
    try {
      const res = await this.esService.client.get({ index: this.INDEX, id })
      return res.body._source as ExportJob
    } catch {
      return null
    }
  }

  async updateProgress(id: string, progress: number) {
    const maxRetries = 5
    let attempt = 0
    while (attempt < maxRetries) {
      try {
        await this.esService.client.update({
          index: this.INDEX,
          id,
          body: {
            script: {
              source: `
                if (ctx._source.progress < params.progress) {
                  ctx._source.progress = params.progress;
                  ctx._source.status = 'processing';
                  ctx._source.updatedAt = params.updatedAt;
                }
              `,
              params: { progress, updatedAt: new Date().toISOString() },
            },
          },
          retry_on_conflict: 3,
          refresh: false,
        })
        return
      } catch (err: any) {
        if (err.meta?.statusCode === 409) {
          // version conflict, retry after 50ms
          await new Promise((res) => setTimeout(res, 50))
          attempt++
          continue
        }
        throw err
      }
    }
  }

  async complete(id: string, filePath: string) {
    const maxRetries = 5
    let attempt = 0
    while (attempt < maxRetries) {
      try {
        await this.esService.client.update({
          index: this.INDEX,
          id,
          body: {
            doc: {
              status: 'done',
              progress: 100,
              filePath,
              updatedAt: new Date().toISOString(),
            },
          },
          retry_on_conflict: 5,
          refresh: false,
        })
        return
      } catch (err: any) {
        if (err.meta?.statusCode === 409) {
          await new Promise((res) => setTimeout(res, 50))
          attempt++
          continue
        }
        throw err
      }
    }
  }

  async fail(id: string, error: string) {
    const maxRetries = 5
    let attempt = 0
    while (attempt < maxRetries) {
      try {
        await this.esService.client.update({
          index: this.INDEX,
          id,
          body: {
            doc: {
              status: 'error',
              error,
              updatedAt: new Date().toISOString(),
            },
          },
          retry_on_conflict: 5,
          refresh: false,
        })
        return
      } catch (err: any) {
        if (err.meta?.statusCode === 409) {
          await new Promise((res) => setTimeout(res, 50))
          attempt++
          continue
        }
        throw err
      }
    }
  }
}
