import { Bundle, BundleEntry, CodeableConcept, Extension, ResearchStudy } from 'fhir/r4'

import { FhirQueryParams } from '../../api/research-study/controllers/FhirQueryParams'
import { SearchResearchStudyController } from '../../api/research-study/controllers/SearchResearchStudyController'
import { ElasticsearchService } from '../../shared/elasticsearch/ElasticsearchService'

export class TranslationPipeline {
  constructor(
    private readonly databaseService: ElasticsearchService,
    private readonly controller: SearchResearchStudyController
  ) {}

  async execute(): Promise<void> {
    const data: ResearchStudy[] = await this.extract()
    const transformedResearchStudies: ResearchStudy[] = this.transform(data)
    await this.load(transformedResearchStudies)
  }

  async extract(): Promise<ResearchStudy[]> {
    const date: Date = new Date()
    const yesterdayDate = date.getDate() - 1
    date.setDate(yesterdayDate)

    const formattedYesterdayDate = date.toISOString().split('T')[0]

    const everyCtisResearchStudySinceYesterdayQuery: FhirQueryParams = {
      _count: '1000',
      _lastUpdated: `gt${formattedYesterdayDate}`,
      _text: 'REG536',
    } as FhirQueryParams
    const fhirResourceBundle: Bundle = await this.controller.generateBundle(everyCtisResearchStudySinceYesterdayQuery)
    return fhirResourceBundle.entry.map((fhirResource: BundleEntry) => {
      return fhirResource.resource as ResearchStudy
    })
  }

  transform(researchStudies: ResearchStudy[]): ResearchStudy[] {
    researchStudies.forEach((researchStudy: ResearchStudy) => {
      researchStudy.title = 'blah-blah-blah-traduction'

      researchStudy.extension.find((value: Extension) => {
        return value.url.includes('eclaire-therapeutic-area')
      }).valueString = 'traduction du domaine thérapeutique'

      researchStudy.condition.find((value: CodeableConcept) => {
        return value.text === 'diseaseCondition'
      }).coding[0].display = 'traduction de la pathologie maladie rare'
    })
    return researchStudies
  }

  async load(researchStudies: ResearchStudy[]): Promise<void> {
    await this.databaseService.bulkDocuments(researchStudies)
  }
}
