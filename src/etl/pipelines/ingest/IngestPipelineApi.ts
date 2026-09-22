import { IngestPipeline } from './IngestPipeline'
import { ResearchStudyModel } from '../../../shared/models/domain-resources/ResearchStudyModel'
import { RiphCtisDto } from '../../dto/RiphCtisDto'
import { RiphDmDto } from '../../dto/RiphDmDto'
import { RiphJardeDto } from '../../dto/RiphJardeDto'


interface ApiBundle {
    link?: Array<{
        relation: string
        url: string
    }>
    total?: number
    type?: string
    entry?: Array<{
        fullUrl?: string
        resource?: Record<string, unknown>
    }>
}

export class IngestPipelineApi extends IngestPipeline {
    readonly type = ''
    private readonly pageSize = 20
    private readonly initialUrl = `https://eclaire-api.osc-fr1.scalingo.io/R4/ResearchStudy?_include=group,location&_sort=_id&_count=${this.pageSize}`
    //private readonly apiUrl = 'https://eclaire-api.osc-fr1.scalingo.io/R4/ResearchStudy'
    
    // Délai entre deux appels API.
    private readonly delayBetweenRequests = 2000

    async execute(): Promise<void> {
        await this.import()
    }

    async import(): Promise<void> {
        this.logger.info(
            '-- Début de la récupération des études depuis API ECLAIRE.'
        )

        let nextUrl: string | undefined = this.initialUrl
        let total = 0
        let totalFetched = 0
        let page = 0

        
        while (nextUrl && page < 50) {
            page++

            this.logger.info(
                `-- Appel page ${page} : ${nextUrl}`
            )

            this.logMemoryUsage(`Avant page ${page}`)
            const response = await fetch(nextUrl)

            if (!response.ok) {
                throw new Error(
                    `Erreur API ECLAIRE : HTTP ${response.status} ${response.statusText}`
                )
            }

            const data = await response.json() as ApiBundle

            // Récupération du nombre total d'études.
            if (page === 1) {
                total = data.total ?? 0

                this.logger.info(
                    `-- Nombre total d'études : ${total}`
                )
            }

            const studies = data.entry ?? []

            totalFetched += studies.length

            this.logger.info(
                `-- Page ${page} terminée : ${studies.length} études récupérées. ` +
                `Progression : ${totalFetched}/${total}`
            )

            // Traitement de la page courante.
            await this.processPage(studies)

            this.logMemoryUsage(`Après traitement page ${page}`)

            // Récupération du lien next.
            nextUrl = data.link?.find(
                (link) => link.relation === 'next'
            )?.url

            // Attente avant l'appel suivant.
            if (nextUrl) {
                await this.fakeProcessingDelay()
            }
        }

        this.logger.info(
            `-- Fin de la récupération. Total récupéré : ${totalFetched}/${total}`
        )
    }

    /**
     * Traitement de la page courante.
     */
    private async processPage(
        studies: Array<{
            fullUrl?: string
            resource?: Record<string, unknown>
        }>
    ): Promise<void> {
        for (const study of studies) {
            const resource = study.resource

            if (!resource) {
                continue
            }

            // Ajouter ici le mapping
            // puis l'insertion ou la mise à jour en base.
        }
    }

    /**
     * Fake function pour simuler un délai de traitement.
     */
    private async fakeProcessingDelay(): Promise<void> {
        this.logger.info(
            `-- Attente de ${this.delayBetweenRequests / 1000} secondes avant le prochain appel.`
        )

        await new Promise((resolve) =>
            setTimeout(resolve, this.delayBetweenRequests)
        )
    }

    private logMemoryUsage(label: string): void {
        const memory = process.memoryUsage()

        this.logger.info(
            `[MEMORY] ${label} | ` +
            `RSS: ${(memory.rss / 1024 / 1024).toFixed(2)} MB | ` +
            `Heap used: ${(memory.heapUsed / 1024 / 1024).toFixed(2)} MB | ` +
            `Heap total: ${(memory.heapTotal / 1024 / 1024).toFixed(2)} MB | ` +
            `External: ${(memory.external / 1024 / 1024).toFixed(2)} MB`
        )
    }

    transform(riphDtos: RiphCtisDto[] | RiphDmDto[] | RiphJardeDto[]): ResearchStudyModel[] {
        // Provide a minimal stub; replace with real mapping if needed
        return riphDtos.map((dto) => ({
            id: dto.id,
            title: (dto).title ?? '',
            // map other fields as necessary
        } as ResearchStudyModel))
    }

}
