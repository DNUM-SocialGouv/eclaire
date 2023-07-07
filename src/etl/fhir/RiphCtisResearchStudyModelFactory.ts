/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Identifier, Meta } from 'fhir/r4'

import { CodeableConceptModel } from '../../shared/models/fhir/DataType/CodeableConceptModel'
import { IdentifierModel } from '../../shared/models/fhir/DataType/IdentifierModel'
import { GroupModel } from '../../shared/models/fhir/GroupModel'
import { ContactDetailModel } from '../../shared/models/fhir/MetadataType/ContactDetailModel'
import { ResearchStudyModel } from '../../shared/models/fhir/ResearchStudyModel'
import { MetaModel } from '../../shared/models/fhir/SpecialPurposeDataType/MetaModel'
import { ReferenceModel } from '../../shared/models/fhir/SpecialPurposeDataType/ReferenceModel'
import { RiphCtisDto } from '../dto/RiphCtisDto'

export class RiphCtisResearchStudyModelFactory {
  private static readonly unavailable = 'INDISPONIBLE'
  static create(riphCtisDto: RiphCtisDto): ResearchStudyModel {
    const enrollmentGroupId = undefined

    const arm = undefined
    const category = [CodeableConceptModel.createCategory(riphCtisDto.reglementation_code)]
    const condition = [
      CodeableConceptModel.createDiseaseCondition(this.emptyIfNull(riphCtisDto.pathologies_maladies_rares)),
      CodeableConceptModel.createMedDraCondition(this.emptyIfNull(riphCtisDto.informations_meddra)),
    ]
    const contact = [
      ContactDetailModel.create(
        this.emptyIfNull(riphCtisDto.contact_prenom),
        this.emptyIfNull(riphCtisDto.contact_nom),
        this.emptyIfNull(riphCtisDto.contact_telephone),
        this.emptyIfNull(riphCtisDto.contact_courriel)
      ),
    ]
    const contained = [
      GroupModel.createEnrollment(
        enrollmentGroupId,
        this.emptyIfNull(riphCtisDto.sexe),
        this.emptyIfNull(riphCtisDto.tranches_age),
        this.emptyNumberIfNull(riphCtisDto.taille_etude),
        this.emptyIfNull(riphCtisDto.groupes_sujet),
        this.emptyIfNull(riphCtisDto.population_recrutement)
      ),
    ]
    const description = this.unavailable
    const enrollment = [ReferenceModel.createGroup(enrollmentGroupId)]
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
