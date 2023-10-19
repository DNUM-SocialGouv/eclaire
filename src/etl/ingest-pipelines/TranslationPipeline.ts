import { ResearchStudy } from 'fhir/r4'

import { EsResearchStudyRepository } from '../../api/research-study/gateways/EsResearchStudyRepository'

export class TranslationPipeline {
  constructor(
    private readonly repository: EsResearchStudyRepository
  ) {}

  async execute(id: string): Promise<void> {
    const data: ResearchStudy = await this.extractAndTransform(id)
    await this.load([data])
  }

  async extractAndTransform(id: string): Promise<ResearchStudy> {
    const researchStudy: ResearchStudy = await this.repository.findOne(id)
    researchStudy.title = 'blah-blah-blah-traduction'
    return researchStudy
  }

  async load(researchStudies: ResearchStudy[]): Promise<void> {
    await this.repository.update(researchStudies)
  }
}
