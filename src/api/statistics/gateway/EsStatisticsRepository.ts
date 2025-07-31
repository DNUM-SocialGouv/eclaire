import { ElasticsearchService } from '../../../shared/elasticsearch/ElasticsearchService'
import { StatisticsRepository } from '../application/StatisticsRepository'

export class EsStatisticsRepository implements StatisticsRepository {
  constructor(
        private readonly databaseService: ElasticsearchService
  ) { }

  async findStat(): Promise<Record<string, number>> {
    // Get count of total documents
    const total = await this.databaseService.countDocuments()
    // Get count total for DM documents
    const countDM = await this.databaseService.countDocuments({ 'category.coding.code': 'REG745' })
    // Get count total for DM-DIV documents
    const countDMDIV = await this.databaseService.countDocuments({ 'category.coding.code': 'REG746' })
    // Get count total for CTIS documents
    const countCtis = await this.databaseService.countDocuments({ 'category.coding.code': 'REG536' })
    // Get count total documents for Jarde
    const countJarde = total - (countDM + countDMDIV + countCtis)

    // Get count total documents with status "a demarrer"
    const countToStart = await this.databaseService.countDocuments({ status: 'approved' })

    // Get count total documents for DM "en cours"
    const countDMInPogress = await this.databaseService.countDocuments({
      'category.coding.code': 'REG745',
      status: 'active',
    })
    // Get count total documents for DM-DIV "en cours"
    const countDMDIVInPogress = await this.databaseService.countDocuments({
      'category.coding.code': 'REG746',
      status: 'active',
    })
    // Get count total documents for CTIS "en cours"
    const countCtisInPogress = await this.databaseService.countDocuments({
      'category.coding.code': 'REG536',
      status: 'active',
    })
    // Get count total documents for JARDE "en cours"
    const countJardeInPogress = await this.databaseService.countDocuments({
      'category.coding.code': 'JARDE',
      status: 'active',
    })

    const countAllInProgress = countDMInPogress + countDMDIVInPogress + countCtisInPogress + countJardeInPogress

    /* eslint-disable sort-keys */
    return {
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
    /* eslint-enable sort-keys */
  }
}
