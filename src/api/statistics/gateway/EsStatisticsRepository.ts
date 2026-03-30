import { Injectable, OnModuleInit } from '@nestjs/common'
import { Cron } from '@nestjs/schedule'

import { ElasticsearchService } from '../../../shared/elasticsearch/ElasticsearchService'
import { StatisticsRepository } from '../application/StatisticsRepository'

@Injectable()
export class EsStatisticsRepository implements StatisticsRepository, OnModuleInit {

  private cachedStats: Record<string, number> = {}

  constructor(
    private readonly databaseService: ElasticsearchService
  ) { }

  async onModuleInit() {
    console.log('Initial statistics calculation...')
    await this.refreshStats()
  }

  @Cron('0 6 * * *', { name: 'daily-statistics-refresh' }) // Every day at 06:00
  async refreshStats() {
    console.log('Refreshing statistics...')

    // Get count total documents and total by etude type
    const [
      total,
      countDM,
      countDMDIV,
      countCtis,
    ] = await Promise.all([
      this.databaseService.countDocuments(),
      this.databaseService.countDocuments({ 'category.coding.code': 'REG745' }),
      this.databaseService.countDocuments({ 'category.coding.code': 'REG746' }),
      this.databaseService.countDocuments({ 'category.coding.code': 'REG536' }),
    ])

    // Get count total documents for Jarde
    const countJarde = total - (countDM + countDMDIV + countCtis)

    // Get count total documents with status "a demarrer" and count total documents by type with status "en cours"
    const [
      countToStart,
      countDMInPogress,
      countDMDIVInPogress,
      countCtisInPogress,
      countJardeInPogress,
    ] = await Promise.all([
      this.databaseService.countDocuments({ status: 'approved' }),

      this.databaseService.countDocuments({
        'category.coding.code': 'REG745',
        status: 'active',
      }),

      this.databaseService.countDocuments({
        'category.coding.code': 'REG746',
        status: 'active',
      }),

      this.databaseService.countDocuments({
        'category.coding.code': 'REG536',
        status: 'active',
      }),

      this.databaseService.countDocuments({
        'category.coding.code': 'JARDE',
        status: 'active',
      }),
    ])

    const countAllInProgress = countDMInPogress + countDMDIVInPogress + countCtisInPogress + countJardeInPogress

    this.cachedStats = {
      Total_etudes: total,
      'Investigations_cliniques_(DM)': countDM,
      'Etudes_performance_(DMDIV)': countDMDIV,
      'Essais_cliniques_médicament_(CTIS)': countCtis,
      'Recherches_impliquant_personnes_humaines_(JARDE)': countJarde,
      Total_Etudes_à_démarrer: countToStart,
      Etudes_en_cours_DM: countDMInPogress,
      Etudes_en_cours_DMDIV: countDMDIVInPogress,
      Etudes_en_cours_CTIS: countCtisInPogress,
      Etudes_en_cours_JARDE: countJardeInPogress,
      Total_Etudes_en_cours: countAllInProgress,
    }
  }

  async findStat(): Promise<Record<string, number>> {
    return this.cachedStats
  }
}
