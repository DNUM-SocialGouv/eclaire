import { IngestPipeline } from './IngestPipeline'
import { ResearchStudyModel } from '../../../shared/models/domain-resources/ResearchStudyModel'
import { EclaireDto } from '../../dto/EclaireDto'
import { RiphCtisDto } from '../../dto/RiphCtisDto'
import { ResearchStudyModelFactory } from '../../factory/ResearchStudyModelFactory'
import { CTIS_COLUMNS } from '../excel/columnsCtis'
import { ExcelSheetUpdater } from '../excel/ExcelSheetUpdater'

export class IngestPipelineCtis extends IngestPipeline {
  readonly type = 'ctis'
  idsToDelete = []

  async execute(): Promise<void> {
    const riphCtisDtos: RiphCtisDto[] = await super.extract<RiphCtisDto>()
    const chunkSize = Number.parseInt(process.env['CHUNK_SIZE'])
    for (let i = 0; i < riphCtisDtos.length; i += chunkSize) {
      this.logger.info(`---- Chunk CTIS: ${i} / ${riphCtisDtos.length} elasticsearch documents`)
      const chunk = riphCtisDtos.slice(i, i + chunkSize)
      const researchStudyDocuments: ResearchStudyModel[] = this.transform(chunk)
      await super.load(researchStudyDocuments)
      // Delete documents with status non autorisé (fermé)
      await super.delete(this.idsToDelete.filter((v) => v !== null))
    }
  }

  transform(riphCtisDtos: RiphCtisDto[]): ResearchStudyModel[] {
    const researchStudyModels: ResearchStudyModel[] = []
    for (const riphCtisDto of riphCtisDtos) {
      const eclaireDto: EclaireDto = EclaireDto.fromCtis(riphCtisDto)
      if (eclaireDto && eclaireDto.numero_primaire && !eclaireDto.to_delete) {
        researchStudyModels.push(ResearchStudyModelFactory.create(eclaireDto))
      } else {
        this.idsToDelete.push(eclaireDto.numero_primaire)
      }
    }

    return researchStudyModels.filter((researchStudyModel: ResearchStudyModel) => {
      const startingDate: Date = new Date(this.startingDate)
      const lastUpdated: Date = new Date(researchStudyModel.meta.lastUpdated)
      return lastUpdated >= startingDate
    })
  }

  async import(): Promise<void> {
    // Extraire les données
      const data: RiphCtisDto[] = await super.extract<RiphCtisDto>()

    // Créer l'updater Excel
    const excelUpdater = new ExcelSheetUpdater(this.logger);

    // Mettre à jour l'onglet
    await excelUpdater.updateSheet('ETUDES CTIS (2014-536)', data, CTIS_COLUMNS);
  }
}
