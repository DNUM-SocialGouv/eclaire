export interface FileExportRepository {
    getExportFilePath(): Promise<string>;
}
