import { IngestPipeline } from './IngestPipeline'
import { ResearchStudyModel } from '../../../shared/models/domain-resources/ResearchStudyModel'
import { EclaireDto } from '../../dto/EclaireDto'
import { RiphDmDto } from '../../dto/RiphDmDto'
import { ResearchStudyModelFactory } from '../../factory/ResearchStudyModelFactory'
import { DM_COLUMNS } from '../excel/columnsDm'
import { ExcelSheetUpdater } from '../excel/ExcelSheetUpdater'

export class IngestPipelineDmDmdiv extends IngestPipeline {
  readonly type = 'dm-dmdiv'
  idsToDelete = []

  async execute(): Promise<void> {
    const riphDmDtos: RiphDmDto[] = await super.extract<RiphDmDto>()
    const chunkSize = Number.parseInt(process.env['CHUNK_SIZE'])
    for (let i = 0; i < riphDmDtos.length; i += chunkSize) {
      this.logger.info(`---- Chunk DM-DM/DIV: ${i} / ${riphDmDtos.length} elasticsearch documents`)
      const chunk = riphDmDtos.slice(i, i + chunkSize)
      const researchStudyDocuments: ResearchStudyModel[] = this.transform(chunk)
      await super.load(researchStudyDocuments)
      // Delete documents with status non autorisé (fermé)
      await super.delete(this.idsToDelete.filter((v) => v !== null))
    }
  }

  transform(riphDmDtos: RiphDmDto[]): ResearchStudyModel[] {
    const result: ResearchStudyModel[] = []
    for (const riphDmDto of riphDmDtos) {
      const eclaireDto: EclaireDto = EclaireDto.fromDm(riphDmDto)
      if (eclaireDto && eclaireDto.numero_primaire && !eclaireDto.to_delete) {
        result.push(ResearchStudyModelFactory.create(eclaireDto))
      } else {
        this.idsToDelete.push(eclaireDto.numero_primaire)
      }
    }

    return result.filter((researchStudyModel: ResearchStudyModel) => {
      const startingDate: Date = new Date(this.startingDate)
      const lastUpdated: Date = new Date(researchStudyModel.meta.lastUpdated)
      return lastUpdated >= startingDate
    })
  }

  async import(): Promise<void> {
    // Extraire les données
    const data: RiphDmDto[] = await super.extract<RiphDmDto>()

    // Créer l'updater Excel
    const excelUpdater = new ExcelSheetUpdater(this.logger);

    // Séparer les données selon reglementation_code
    const dm745Data = data.filter(d => d.reglementation_code === 'REG745');
    const dm746Data = data.filter(d => d.reglementation_code === 'REG746');

    // Mettre à jour l'onglet DM (REG745)
    if (dm745Data.length > 0) {
        await excelUpdater.updateSheet('ETUDES DM (2017-745)', dm745Data, DM_COLUMNS);
    }

    // Mettre à jour l'onglet DM-DIV (REG746)
    if (dm746Data.length > 0) {
        await excelUpdater.updateSheet('ETUDES DM-DIV (2017-746)', dm746Data, DM_COLUMNS);
    }
  }

}
