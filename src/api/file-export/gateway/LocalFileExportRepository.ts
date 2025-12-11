import * as path from 'path';
import { FileExportRepository } from '../application/FileExportRepository';

export class LocalFileExportRepository implements FileExportRepository {
    async getExportFilePath(): Promise<string> {
        //const filePath = path.join(process.cwd(), 'Export_suivi_remplissage_ECLAIRE.xlsx');
        const filePath = path.join('/tmp', 'Export_suivi_remplissage_ECLAIRE.xlsx');
        return filePath;
    }
}
