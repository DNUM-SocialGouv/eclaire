// src/api/file-export/application/ExportJobService.ts
import { Injectable } from '@nestjs/common'
import { randomUUID } from 'crypto'

export type JobStatus = 'pending' | 'processing' | 'done' | 'error'

export interface ExportJob {
  id: string
  status: JobStatus
  progress: number
  filePath?: string
  error?: string
}

@Injectable()
export class ExportJobService {
  private jobs = new Map<string, ExportJob>()
  private isRunning = false

  createJob(): ExportJob {
    if (this.isRunning) {
      throw new Error('Un export est déjà en cours.')
    }

    const id = randomUUID()

    const job: ExportJob = {
      id,
      status: 'pending',
      progress: 0,
    }

    this.jobs.set(id, job)
    this.isRunning = true

    return job
  }

  getJob(id: string): ExportJob | undefined {
    return this.jobs.get(id)
  }

  updateProgress(id: string, progress: number) {
    const job = this.jobs.get(id)
    if (!job) return

    job.status = 'processing'
    job.progress = progress
  }

  complete(id: string, filePath: string) {
    const job = this.jobs.get(id)
    if (!job) return

    job.status = 'done'
    job.progress = 100
    job.filePath = filePath
    this.isRunning = false
  }

  fail(id: string, error: string) {
    const job = this.jobs.get(id)
    if (!job) return

    job.status = 'error'
    job.error = error
    this.isRunning = false
  }

  getAllJobs(): ExportJob[] {
    return Array.from(this.jobs.values())
  }
}