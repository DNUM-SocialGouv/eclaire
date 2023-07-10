import { errors } from '@elastic/elasticsearch'
import { Injectable } from '@nestjs/common'

import { RiphCtisDto } from './dto/RiphCtisDto'
import { RiphDmDto } from './dto/RiphDmDto'
import { RiphJardeDto } from './dto/RiphJardeDto'
import { researchStudyIndexMapping } from './researchStudyIndexMapping'
import { RiphCtisResearchStudyModelFactory } from './RiphCtisResearchStudyModelFactory'
import { ElasticsearchService } from '../shared/elasticsearch/ElasticsearchService'
import { LoggerService } from '../shared/logger/LoggerService'
import { ResearchStudyModel } from '../shared/models/fhir/ResearchStudyModel'

@Injectable()
export class FhirEtlService {
  private readonly ctisCode = 'REG536'

  constructor(
    private readonly logger: LoggerService,
    private readonly elasticsearchService: ElasticsearchService,
    private readonly riphCtisDto: RiphCtisDto[]
  ) {}

  async createIndex(): Promise<void> {
    this.logger.info('-- Début de la création de l’index ECLAIRE dans Elasticsearch.')
    try {
      await this.elasticsearchService.createAnIndex(researchStudyIndexMapping)
      this.logger.info('-- Fin de la création de l’index ECLAIRE dans Elasticsearch.')
    } catch (error) {
      if (error instanceof errors.ResponseError) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        throw new Error(error.meta.body.error.reason as string)
      }

      throw error
    }
  }

  async import(): Promise<void> {
    this.logger.info('-- Début de l’import des essais cliniques du RIPH.')

    const clinicalTrialsDto = this.extract()
    const researchStudyModel = this.transform(clinicalTrialsDto)
    await this.load(researchStudyModel)

    this.logger.info('-- Fin de l’import des essais cliniques du RIPH.')
  }

  private extract(): RiphDto[] {
    const clinicalTrialsDto = [...this.riphCtisDto]

    this.logger.info(`${this.riphCtisDto.length} (CTIS) = ${clinicalTrialsDto.length}`)

    return clinicalTrialsDto
  }

  private transform(clinicalTrialsDto: RiphDto[]): (IndexElasticsearch | ResearchStudyModel)[] {
    return clinicalTrialsDto.flatMap((clinicalTrialDto: RiphDto): (IndexElasticsearch | ResearchStudyModel)[] => {
      let _id = ''
      let researchStudyModel: ResearchStudyModel

      if (clinicalTrialDto.reglementation_code === this.ctisCode) {
        _id = (clinicalTrialDto as RiphCtisDto).numero_ctis
        researchStudyModel = RiphCtisResearchStudyModelFactory.create(clinicalTrialDto as RiphCtisDto)
      }

      return [{ create: { _id } }, researchStudyModel]
    })
  }

  private async load(researchStudyModel: (IndexElasticsearch | ResearchStudyModel)[]): Promise<void> {
    try {
      await this.elasticsearchService.bulkDocuments<IndexElasticsearch | ResearchStudyModel>(researchStudyModel)
    } catch (error) {
      if (error instanceof errors.ResponseError) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        throw new Error(error.meta.body.error.reason as string)
      }

      throw error
    }
  }
}

type IndexElasticsearch = Readonly<{
  create: {
    _id: string
  }
}>

type RiphDto = RiphCtisDto | RiphDmDto | RiphJardeDto
