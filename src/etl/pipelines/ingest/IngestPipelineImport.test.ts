// IngestPipelineImport.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { IngestPipelineImport } from './IngestPipelineImport'
import { ResearchStudyModel } from '../../../shared/models/domain-resources/ResearchStudyModel'
import { RiphCtisDto } from '../../dto/RiphCtisDto'
import { RiphDmDto } from '../../dto/RiphDmDto'
import { RiphJardeDto } from '../../dto/RiphJardeDto'
import { StreamingExcelExporter } from '../excel/StreamingExcelExporter'

describe('IngestPipelineImport', () => {
    let pipeline: IngestPipelineImport
    let exporter: StreamingExcelExporter

    beforeEach(() => {
        // Use dummy services for constructor dependencies
        const dummyLogger = { info: vi.fn(), error: vi.fn() } as any
        const dummyDb = { bulkDocuments: vi.fn(), deleteManyDocument: vi.fn() } as any
        const dummyReader = {
            read: vi.fn().mockResolvedValue([]),
            readStream: vi.fn().mockImplementation(async function* () { })
        } as any

        pipeline = new IngestPipelineImport(dummyLogger, dummyDb, dummyReader)
        exporter = { appendRow: vi.fn() } as any
    })

    it('should transform RiphDtos into ResearchStudyModels', () => {
        const riphDtos: (RiphCtisDto | RiphDmDto | RiphJardeDto)[] = [
            { id: '1', title: 'Study 1' } as unknown as RiphDmDto,
            { id: '2', title: 'Study 2' } as unknown as RiphCtisDto
        ]

        const result: ResearchStudyModel[] = pipeline.transform(riphDtos)
        expect(result).toHaveLength(2)
        expect(result[0].id).toBe('1')
        expect(result[1].title).toBe('Study 2')
    })

    /* it('should call appendRow for each type in runExtractionStreaming', async () => {
        // Spy on extractStream to return simple arrays instead of real streams
        vi.spyOn(pipeline as any, 'extractStream').mockImplementation(async function* (type?: string): any {
            if (type === 'ctis') {
                yield { id: 'ctis1', title: 'CTIS Study' } as unknown as RiphCtisDto
            } else if (type === 'jarde') {
                yield { id: 'jarde1', title: 'JARDE Study' } as unknown as RiphJardeDto
            } else {
                // DM must include reglementation_code
                yield { id: 'dm1', title: 'DM Study', reglementation_code: 'REG745' } as unknown as RiphDmDto
                yield { id: 'dm2', title: 'DM Study 2', reglementation_code: 'REG746' } as unknown as RiphDmDto
            }
        })

        await pipeline.runExtractionStreaming(exporter)

        // DM rows
        //expect(exporter.appendRow).toHaveBeenCalledWith('REG745', expect.any(Object), pipeline.DM_COLUMNS)
        const appendRowSpy = exporter.appendRow as unknown as ReturnType<typeof vi.fn>
        const calls = (appendRowSpy as any).mock.calls
        const reg745Call = calls.find(call => call[0] === 'REG745')

        expect(reg745Call).toBeDefined()
        expect(reg745Call![1]).toBeDefined()           // record object
        expect(Array.isArray(reg745Call![2])).toBe(true) // columns array
        //expect(exporter.appendRow).toHaveBeenCalledWith('REG746', expect.any(Object), pipeline.DM_COLUMNS)
        // CTIS rows
        //expect(exporter.appendRow).toHaveBeenCalledWith('CTIS', expect.any(Object), pipeline.CTIS_COLUMNS)
        // JARDE rows
        //expect(exporter.appendRow).toHaveBeenCalledWith('JARDE', expect.any(Object), pipeline.JARDE_COLUMNS)
    }) */
})