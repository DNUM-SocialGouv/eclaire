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
  readonly type = 'dm-dmdiv'
  readonly DM_COLUMNS = DM_COLUMNS
  readonly JARDE_COLUMNS = JARDE_COLUMNS
  readonly CTIS_COLUMNS = CTIS_COLUMNS

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

  async runExtractionStreaming(
    exporter: StreamingExcelExporter,
    onProgress?: (p: number) => void
  ): Promise<void> {
    let processed = 1

    // ===== DM =====
    for await (const record of super.extractStream<RiphDmDto>()) {
      if (record.reglementation_code === 'REG745') {
        exporter.appendRow('REG745', record, DM_COLUMNS)
      } else if (record.reglementation_code === 'REG746') {
        exporter.appendRow('REG746', record, DM_COLUMNS)
      }

      processed++
      if (processed % 1000 === 0 && onProgress) {
        onProgress(processed)
      }
    }

    // ===== CTIS =====
    for await (const record of super.extractStream<RiphCtisDto>('ctis')) {
      exporter.appendRow('CTIS', record, CTIS_COLUMNS)
      processed++
    }

    // ===== JARDE =====
    for await (const record of super.extractStream<RiphJardeDto>('jarde')) {
      exporter.appendRow('JARDE', record, JARDE_COLUMNS)
      processed++
    }
  }

}
