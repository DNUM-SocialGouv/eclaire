import { IngestPipeline } from './IngestPipeline'
import { RiphCtisDto } from '../../dto/RiphCtisDto'
import { CTIS_COLUMNS } from '../excel/columnsCtis'
import { RiphDmDto } from '../../dto/RiphDmDto'
import { RiphJardeDto } from '../../dto/RiphJardeDto'
import { StreamingExcelExporter } from '../excel/StreamingExcelExporter'
import { DM_COLUMNS } from '../excel/columnsDm'
import { JARDE_COLUMNS } from '../excel/columnsJarde'
import { ResearchStudyModel } from '../../../shared/models/domain-resources/ResearchStudyModel'

export class IngestPipelineImport extends IngestPipeline {
    readonly type = 'dm-dmdiv'

    // Implement execute() with your custom logic
    async execute(): Promise<void> {
        await this.import();
    }

    transform(riphDtos: RiphCtisDto[] | RiphDmDto[] | RiphJardeDto[]): ResearchStudyModel[] {
        // Provide a minimal stub; replace with real mapping if needed
        return riphDtos.map(dto => ({
            id: dto.id,
            title: (dto as any).title ?? '',
            // map other fields as necessary
        } as ResearchStudyModel));
    }

    async import(): Promise<void> {
        // Extraire les données
        const dataDM: RiphDmDto[] = await super.extract<RiphDmDto>();
        const ctisData: RiphCtisDto[] = await super.extract<RiphCtisDto>('ctis');
        const jardeData: RiphJardeDto[] = await super.extract<RiphJardeDto>('jarde');
        // Séparer les données selon reglementation_code
        const dm745Data = dataDM.filter(d => d.reglementation_code === 'REG745');
        const dm746Data = dataDM.filter(d => d.reglementation_code === 'REG746');
        // for test 
        //const bigJardeData = Array.from({ length: 100 }).flatMap(() => jardeData);
        
        const exporter = new StreamingExcelExporter();

        await exporter.exportSheets([
            { name: "ETUDES DM (2017-745)", data: dm745Data, columns: DM_COLUMNS },
            { name: "ETUDES DM-DIV (2017-746)", data: dm746Data, columns: DM_COLUMNS },
            { name: "ETUDES JARDE", data: jardeData, columns: JARDE_COLUMNS },
            { name: "ETUDES CTIS (2014-536)", data: ctisData, columns: CTIS_COLUMNS },
        ]);
    }
}
