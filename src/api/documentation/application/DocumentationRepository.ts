export interface DocumentationRepository {
    getFilePath(filename: string): Promise<string>;
}
