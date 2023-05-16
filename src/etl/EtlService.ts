import { Injectable } from '@nestjs/common'

import { clinicalTrialIndexMapping } from './clinicalTrialIndexMapping'
import { ClinicalTrialModelFactory } from './ClinicalTrialModelFactory'
import { RiphCtisDto } from './dto/RiphCtisDto'
import { RiphDmDto } from './dto/RiphDmDto'
import { RiphJardeDto } from './dto/RiphJardeDto'
import { ElasticsearchService } from '../shared/elasticsearch/ElasticsearchService'
import { LoggerService } from '../shared/logger/LoggerService'
import { ClinicalTrialModel } from '../shared/models/ClinicalTrialModel'

@Injectable()
export class EtlService {
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
    await this.elasticsearchService.createAnIndex(clinicalTrialIndexMapping)
    this.logger.info('-- Fin de la création de l’index ECLAIRE dans Elasticsearch.')
  }

  async import(): Promise<void> {
    this.logger.info('-- Début de l’import des essais cliniques du RIPH.')

    const clinicalTrialsDto = this.extract()
    const clinicalTrialsModel = this.transform(clinicalTrialsDto)
    await this.load(clinicalTrialsModel)

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

  private transform(clinicalTrialsDto: RiphDto[]): (IndexElasticsearch | ClinicalTrialModel)[] {
    return clinicalTrialsDto.flatMap((clinicalTrialDto: RiphDto): (IndexElasticsearch | ClinicalTrialModel)[] => {
      let _id = ''
      let clinicalTrialModel: ClinicalTrialModel

      if (clinicalTrialDto.reglementation_code === this.ctisCode) {
        _id = (clinicalTrialDto as RiphCtisDto).numero_ctis
        clinicalTrialModel = ClinicalTrialModelFactory.fromRiphCtis(clinicalTrialDto as RiphCtisDto)
      } else if (clinicalTrialDto.reglementation_code === this.jardeCode) {
        _id = (clinicalTrialDto as RiphJardeDto).numero_national
        clinicalTrialModel = ClinicalTrialModelFactory.fromRiphJarde(clinicalTrialDto as RiphJardeDto)
      } else {
        _id = (clinicalTrialDto as RiphDmDto).numero_national
        clinicalTrialModel = ClinicalTrialModelFactory.fromRiphDm(clinicalTrialDto as RiphDmDto)
      }

      return [{ create: { _id } }, clinicalTrialModel]
    })
  }

  private async load(clinicalTrialsModel: (IndexElasticsearch | ClinicalTrialModel)[]): Promise<void> {
    await this.elasticsearchService.bulkDocuments<IndexElasticsearch | ClinicalTrialModel>(clinicalTrialsModel)
  }
}

type IndexElasticsearch = {
  create: {
    _id: string
  }
}

type RiphDto = RiphCtisDto | RiphDmDto | RiphJardeDto
