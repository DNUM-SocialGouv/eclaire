import { IngestPipeline } from './IngestPipeline'
import { ResearchStudyModel } from '../../../shared/models/domain-resources/ResearchStudyModel'
import { RiphCtisDto } from '../../dto/RiphCtisDto'
import { RiphDmDto } from '../../dto/RiphDmDto'
import { RiphJardeDto } from '../../dto/RiphJardeDto'
import { CTIS_COLUMNS } from '../excel/columnsCtis'
import { DM_COLUMNS } from '../excel/columnsDm'
import { JARDE_COLUMNS } from '../excel/columnsJarde'

export class IngestPipelineImport extends IngestPipeline {
  readonly type = 'dm-dmdiv'
  dm745Data: RiphDmDto[] = []
  dm746Data: RiphDmDto[] = []
  jardeData: RiphJardeDto[] = []
  ctisData: RiphCtisDto[] = []

  readonly DM_COLUMNS = DM_COLUMNS
  readonly JARDE_COLUMNS = JARDE_COLUMNS
  readonly CTIS_COLUMNS = CTIS_COLUMNS

  private filePath?: string

  // Implement execute() with your custom logic
  async execute(): Promise<void> {
    await this.import()
  }

  async import(): Promise<void> { }

  transform(riphDtos: RiphCtisDto[] | RiphDmDto[] | RiphJardeDto[]): ResearchStudyModel[] {
    // Provide a minimal stub; replace with real mapping if needed
    return riphDtos.map((dto) => ({
      id: dto.id,
      title: (dto).title ?? '',
      // map other fields as necessary
    } as ResearchStudyModel))
  }

  async runExtractionWithProgress(onProgress?: (p: number) => void): Promise<void> {
    const dataDM: RiphDmDto[] = await super.extract<RiphDmDto>()
    const ctisData: RiphCtisDto[] = await super.extract<RiphCtisDto>('ctis')
    const jardeData: RiphJardeDto[] = await super.extract<RiphJardeDto>('jarde')

    this.dm745Data = dataDM.filter((d) => d.reglementation_code === 'REG745')
    this.dm746Data = dataDM.filter((d) => d.reglementation_code === 'REG746')
    this.jardeData = jardeData
    this.ctisData = ctisData

    const totalRows = this.dm745Data.length + this.dm746Data.length + this.jardeData.length + this.ctisData.length
    let processed = 0

    // juste simuler le traitement par batch pour le callback onProgress
    const batches = [this.dm745Data, this.dm746Data, this.jardeData, this.ctisData]
    for (const batch of batches) {
      for (let i = 0; i < batch.length; i++) {
        processed++

        if (onProgress) {
          const percent = Math.round((processed / totalRows) * 100)
          onProgress(percent)
        }

        await new Promise((r) => setImmediate(r))
      }
    }
  }

  getDataByCode(code: 'REG745' | 'REG746' | 'JARDE' | 'CTIS') {
    switch (code) {
      case 'REG745': return this.dm745Data
      case 'REG746': return this.dm746Data
      case 'JARDE': return this.jardeData
      case 'CTIS': return this.ctisData
      default: return []
    }
  }

  // Getter to retrieve the path after execution
  getFilePath(): string | undefined {
    return this.filePath
  }
}
