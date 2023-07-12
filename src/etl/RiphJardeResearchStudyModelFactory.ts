/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Identifier } from 'fhir/r4'

import { RiphJardeDto } from './dto/RiphJardeDto'
import { CodeableConceptModel } from '../shared/models/fhir/DataType/CodeableConceptModel'
import { IdentifierModel } from '../shared/models/fhir/DataType/IdentifierModel'
import { GroupModel } from '../shared/models/fhir/GroupModel'
import { ContactDetailModel } from '../shared/models/fhir/MetadataType/ContactDetailModel'
import { ResearchStudyModel } from '../shared/models/fhir/ResearchStudyModel'
import { MetaModel } from '../shared/models/fhir/SpecialPurposeDataType/MetaModel'
import { ReferenceModel } from '../shared/models/fhir/SpecialPurposeDataType/ReferenceModel'

export class RiphJardeResearchStudyModelFactory {
  private static readonly unavailable = 'INDISPONIBLE'

  static create(riphJardeDto: RiphJardeDto): ResearchStudyModel {
    const enrollmentGroupId = undefined

    const arm = undefined
    const category = [CodeableConceptModel.createCategory(riphJardeDto.reglementation_code)]
    const condition = [
      CodeableConceptModel.createDiseaseCondition(this.emptyIfNull(this.unavailable)),
      CodeableConceptModel.createMedDraCondition(this.emptyIfNull(this.unavailable)),
    ]
    const contact = [
      ContactDetailModel.create(
        this.emptyIfNull(riphJardeDto.deposant_prenom),
        this.emptyIfNull(riphJardeDto.deposant_nom),
        this.emptyIfNull(this.unavailable),
        this.emptyIfNull(riphJardeDto.deposant_courriel)
      ),
    ]
    const contained = [
      GroupModel.createStudyCharacteristics(
        enrollmentGroupId,
        this.emptyIfNull(this.unavailable),
        this.emptyIfNull(this.unavailable),
        this.emptyNumberIfNull(riphJardeDto.taille_etude),
        this.emptyIfNull(this.unavailable),
        this.emptyIfNull(this.unavailable)
      ),
    ]
    const description = this.unavailable
    const enrollment = [ReferenceModel.createGroupDetailingStudyCharacteristics(enrollmentGroupId)]
    const focus = undefined
    const id = undefined
    const identifier: Identifier[] = [IdentifierModel.createCtisIdentifier(riphJardeDto.numero_national)]
    const implicitRules = undefined
    const keyword = undefined
    const language = undefined
    const location = undefined
    const meta = MetaModel.createWithMostRecentIsoDate(
      this.emptyIfNull(riphJardeDto.historique),
      this.emptyIfNull(riphJardeDto.dates_avis_favorable_ms_mns)
    )
    const objective = undefined
    const partOf = undefined
    const period = undefined
    const phase: CodeableConceptModel = CodeableConceptModel.createResearchStudyPhase(this.unavailable)
    const primaryPurposeType = undefined
    const principalInvestigator = undefined
    const protocol = undefined
    const reasonStopped = undefined
    const relatedArtifact = undefined
    const site = undefined
    const sponsor = undefined
    const status = 'active'
    const text = undefined
    const title = this.emptyIfNull(riphJardeDto.titre_recherche)

    return new ResearchStudyModel(
      arm,
      category,
      condition,
      contact,
      contained,
      description,
      enrollment,
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

  private static emptyNumberIfNull(value: number): number {
    return value === null ? -1 : value
  }
}
