import { Bundle, BundleEntry, CodeableConcept, Extension, ResearchStudy } from 'fhir/r4'

import { FhirQueryParams } from '../../api/research-study/controllers/FhirQueryParams'
import { SearchResearchStudyController } from '../../api/research-study/controllers/SearchResearchStudyController'
import { EsResearchStudyRepository } from '../../api/research-study/gateways/EsResearchStudyRepository'

export class TranslationPipeline {
  constructor(
    private readonly repository: EsResearchStudyRepository,
    private readonly controller: SearchResearchStudyController
  ) {}

  async execute(): Promise<void> {
    const data: ResearchStudy[] = await this.extract()
    const transformedResearchStudies: ResearchStudy[] = this.transform(data)
    await this.load(transformedResearchStudies)
  }

  async extract(): Promise<ResearchStudy[]> {
    const currentDate = '2000-01-01'

    const query: FhirQueryParams = {
      _count: '1000',
      _lastUpdated: `gt${currentDate}`,
      _text: 'REG536',
    } as FhirQueryParams
    const fhirResourceBundle: Bundle = await this.controller.generateBundle(query)
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
    await this.repository.update(researchStudies)
  }
}
