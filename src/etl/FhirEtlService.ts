import { errors } from '@elastic/elasticsearch'
import { Injectable } from '@nestjs/common'

import { RiphCtisDto } from './dto/RiphCtisDto'
import { RiphDmDto } from './dto/RiphDmDto'
import { RiphJardeDto } from './dto/RiphJardeDto'
import { researchStudyIndexMapping } from './researchStudyIndexMapping'
import { RiphCtisResearchStudyModelFactory } from './RiphCtisResearchStudyModelFactory'
import { RiphDmResearchStudyModelFactory } from './RiphDmResearchStudyModelFactory'
import { RiphJardeResearchStudyModelFactory } from './RiphJardeResearchStudyModelFactory'
import { ElasticsearchService } from '../shared/elasticsearch/ElasticsearchService'
import { LoggerService } from '../shared/logger/LoggerService'
import { ResearchStudyModel } from '../shared/models/fhir/ResearchStudyModel'

@Injectable()
export class FhirEtlService {
  private readonly ctisCode = 'REG536'
  private readonly jardeCode = 'JARDE'

  constructor(
    private readonly logger: LoggerService,
    private readonly elasticsearchService: ElasticsearchService,
    private readonly riphCtisDto: RiphCtisDto[],
    private readonly riphDmDto: RiphDmDto[],
    private readonly riphJardeDto1: RiphJardeDto[],
    private readonly riphJardeDto2: RiphJardeDto[]
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
    const clinicalTrialsDto = [
      ...this.riphCtisDto,
      ...this.riphDmDto,
      ...this.riphJardeDto1,
      ...this.riphJardeDto2,
    ]

    this.logger.info(`${this.riphCtisDto.length} (CTIS) + ${this.riphDmDto.length} (DM) + ${this.riphJardeDto1.length + this.riphJardeDto2.length} (JARDE) = ${clinicalTrialsDto.length}`)

    return clinicalTrialsDto
  }

  private transform(clinicalTrialsDto: RiphDto[]): (IndexElasticsearch | ResearchStudyModel)[] {
    return clinicalTrialsDto.flatMap((clinicalTrialDto: RiphDto): (IndexElasticsearch | ResearchStudyModel)[] => {
      let _id = ''
      let researchStudyModel: ResearchStudyModel

      if (clinicalTrialDto.reglementation_code === this.ctisCode) {
        _id = (clinicalTrialDto as RiphCtisDto).numero_ctis
        researchStudyModel = RiphCtisResearchStudyModelFactory.create(clinicalTrialDto as RiphCtisDto)
      } else if (clinicalTrialDto.reglementation_code === this.jardeCode) {
        _id = (clinicalTrialDto as RiphJardeDto).numero_national
        researchStudyModel = RiphJardeResearchStudyModelFactory.create(clinicalTrialDto as RiphJardeDto)
      } else {
        _id = (clinicalTrialDto as RiphDmDto).numero_national
        researchStudyModel = RiphDmResearchStudyModelFactory.create(clinicalTrialDto as RiphDmDto)
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
