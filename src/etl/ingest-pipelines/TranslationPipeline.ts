import { ResearchStudy } from 'fhir/r4'

import { EsResearchStudyRepository } from '../../api/research-study/gateways/EsResearchStudyRepository'

export class TranslationPipeline {
  constructor(
    private readonly repository: EsResearchStudyRepository
  ) {}

  async execute(): Promise<void> {
    const data: ResearchStudy[] = await this.extract()
    const transformedResearchStudies: ResearchStudy[] = this.transform(data)
    await this.load(transformedResearchStudies)
  }

  async extract() {
    return undefined
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
