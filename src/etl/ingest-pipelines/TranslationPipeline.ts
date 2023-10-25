import { Bundle, BundleEntry, ResearchStudy } from 'fhir/r4'

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
    const query: FhirQueryParams = { _count: '1000', _text: 'REG536' } as FhirQueryParams
    const fhirResourceBundle: Bundle = await this.controller.generateBundle(query)
    return fhirResourceBundle.entry.map((fhirResource: BundleEntry) => {
      return fhirResource.resource as ResearchStudy
    })
  }

  transform(researchStudies: ResearchStudy[]): ResearchStudy[] {
    researchStudies.forEach((researchStudy: ResearchStudy) => {
      researchStudy.title = 'blah-blah-blah-traduction'
    })
    return researchStudies
  }

  async load(researchStudies: ResearchStudy[]): Promise<void> {
    await this.repository.update(researchStudies)
  }
}
