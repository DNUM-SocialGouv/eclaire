import { IngestPipeline } from './IngestPipeline'
import { ResearchStudyModel } from '../../../shared/models/domain-resources/ResearchStudyModel'
import { RiphCtisDto } from '../../dto/RiphCtisDto'
import { RiphDmDto } from '../../dto/RiphDmDto'
import { RiphJardeDto } from '../../dto/RiphJardeDto'
import { CTIS_COLUMNS } from '../excel/columnsCtis'
import { DM_COLUMNS } from '../excel/columnsDm'
import { JARDE_COLUMNS } from '../excel/columnsJarde'
import { StreamingExcelExporter } from '../excel/StreamingExcelExporter'

export class IngestPipelineImport extends IngestPipeline {
  readonly type = 'ctis'

  // Implement execute() with your custom logic
  async execute(): Promise<void> {
    await this.import()
  }

  transform(riphDtos: RiphCtisDto[] | RiphDmDto[] | RiphJardeDto[]): ResearchStudyModel[] {
    // Provide a minimal stub; replace with real mapping if needed
    return riphDtos.map((dto) => ({
      id: dto.id,
      title: (dto).title ?? '',
      // map other fields as necessary
    } as ResearchStudyModel))
  }

  async import(): Promise<void> {
    // Extract the data
    const dataDM: RiphDmDto[] = await super.extract<RiphDmDto>()
    const ctisData: RiphCtisDto[] = await super.extract<RiphCtisDto>('ctis')
    const jardeData: RiphJardeDto[] = await super.extract<RiphJardeDto>('jarde')
    // Separate the data according to code regulations
    const dm745Data = dataDM.filter((d) => d.reglementation_code === 'REG745')
    const dm746Data = dataDM.filter((d) => d.reglementation_code === 'REG746')

    const exporter = new StreamingExcelExporter()

    await exporter.exportSheets([
      { columns: DM_COLUMNS, data: dm745Data, name: 'ETUDES DM (2017-745)' },
      { columns: DM_COLUMNS, data: dm746Data, name: 'ETUDES DM-DIV (2017-746)' },
      { columns: JARDE_COLUMNS, data: jardeData, name: 'ETUDES JARDE' },
      { columns: CTIS_COLUMNS, data: ctisData, name: 'ETUDES CTIS (2014-536)' },
    ])
  }
}
