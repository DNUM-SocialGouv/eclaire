/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Identifier, Meta } from 'fhir/r4'

import { RiphCtisDto } from './dto/RiphCtisDto'
import { CodeableConceptModel } from '../shared/models/fhir/CodeableConceptModel'
import { IdentifierModel } from '../shared/models/fhir/IdentifierModel'
import { MetaModel } from '../shared/models/fhir/MetaModel'
import { ResearchStudyModel } from '../shared/models/fhir/ResearchStudyModel'

export class RiphCtisResearchStudyModelFactory {
  static create(riphCtisDto: RiphCtisDto): ResearchStudyModel {
    const arm = undefined
    const category = [CodeableConceptModel.createCategory(riphCtisDto.reglementation_code)]
    const condition = [
      CodeableConceptModel.createDiseaseCondition(this.emptyIfNull(riphCtisDto.pathologies_maladies_rares)),
      CodeableConceptModel.createMedDraCondition(this.emptyIfNull(riphCtisDto.informations_meddra)),
    ]
    const contact = undefined
    const contained = undefined
    const description = undefined
    const focus = undefined
    const id = undefined
    const identifier: Identifier[] = [IdentifierModel.createCtisIdentifier(riphCtisDto.numero_ctis)]
    const implicitRules = undefined
    const keyword = undefined
    const language = undefined
    const location = undefined
    const meta: Meta = MetaModel.createWithMostRecentDate(
      this.emptyIfNull(riphCtisDto.historique),
      this.emptyIfNull(riphCtisDto.dates_avis_favorable_ms_mns)
    )
    const objective = undefined
    const partOf = undefined
    const period = undefined
    const phase: CodeableConceptModel = CodeableConceptModel.createResearchStudyPhase(this.emptyIfNull(riphCtisDto.phase_recherche))
    const primaryPurposeType = undefined
    const principalInvestigator = undefined
    const protocol = undefined
    const reasonStopped = undefined
    const relatedArtifact = undefined
    const site = undefined
    const sponsor = undefined
    const status = 'active'
    const text = undefined
    const title: string = this.emptyIfNull(riphCtisDto.titre)

    return new ResearchStudyModel(
      arm,
      category,
      condition,
      contact,
      contained,
      description,
      focus,
      id,
      identifier,
      implicitRules,
      keyword,
      language,
      location,
      meta,
      objective,
      partOf,
      period,
      phase,
      primaryPurposeType,
      principalInvestigator,
      protocol,
      reasonStopped,
      relatedArtifact,
      site,
      sponsor,
      status,
      text,
      title
    )
  }

  private static emptyIfNull(value: string): string {
    return value === null ? '' : value
  }
}
