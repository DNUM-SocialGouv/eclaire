/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Identifier, Meta } from 'fhir/r4'

import { RiphCtisDto } from './dto/RiphCtisDto'
import { CodeableConceptModel } from '../shared/models/fhir/DataType/CodeableConceptModel'
import { IdentifierModel } from '../shared/models/fhir/DataType/IdentifierModel'
import { GroupModel } from '../shared/models/fhir/GroupModel'
import { ContactDetailModel } from '../shared/models/fhir/MetadataType/ContactDetailModel'
import { ModelUtils } from '../shared/models/fhir/ModelUtils'
import { ResearchStudyModel } from '../shared/models/fhir/ResearchStudyModel'
import { MetaModel } from '../shared/models/fhir/SpecialPurposeDataType/MetaModel'
import { ReferenceModel } from '../shared/models/fhir/SpecialPurposeDataType/ReferenceModel'

export class RiphCtisResearchStudyModelFactory {
  static create(riphCtisDto: RiphCtisDto): ResearchStudyModel {
    const enrollmentGroupId = riphCtisDto.numero_ctis + '-enrollment-group-id'

    const arm = undefined
    const category = [CodeableConceptModel.createCategory(riphCtisDto.reglementation_code)]
    const condition = [
      CodeableConceptModel.createDiseaseCondition(riphCtisDto.pathologies_maladies_rares),
      CodeableConceptModel.createMedDraCondition(riphCtisDto.informations_meddra),
    ]
    const contact = [
      ContactDetailModel.create(
        riphCtisDto.contact_prenom,
        riphCtisDto.contact_nom,
        riphCtisDto.contact_telephone,
        riphCtisDto.contact_courriel
      ),
    ]
    const contained = [
      GroupModel.createStudyCharacteristics(
        enrollmentGroupId,
        riphCtisDto.sexe,
        riphCtisDto.tranches_age,
        riphCtisDto.taille_etude,
        riphCtisDto.groupes_sujet,
        riphCtisDto.population_recrutement,
        ModelUtils.UNAVAILABLE,
        ModelUtils.UNAVAILABLE
      ),
    ]
    const description = ModelUtils.UNAVAILABLE
    const enrollment = [ReferenceModel.createGroupDetailingStudyCharacteristics(enrollmentGroupId)]
    const focus = undefined
    const id = riphCtisDto.numero_ctis
    const identifier: Identifier[] = [
      IdentifierModel.createPrimarySlice(ModelUtils.UNAVAILABLE),
      IdentifierModel.createSecondarySlice(riphCtisDto.numero_ctis, riphCtisDto.reglementation_code, undefined),
    ]
    const implicitRules = undefined
    const keyword = undefined
    const language = undefined
    const location = undefined
    const meta: Meta = MetaModel.createWithMostRecentIsoDate(
      riphCtisDto.historique,
      riphCtisDto.dates_avis_favorable_ms_mns
    )
    const objective = undefined
    const partOf = undefined
    const period = undefined
    const phase: CodeableConceptModel = CodeableConceptModel.createResearchStudyPhase(riphCtisDto.phase_recherche)
    const primaryPurposeType = undefined
    const principalInvestigator = undefined
    const protocol = undefined
    const reasonStopped = undefined
    const relatedArtifact = undefined
    const site = undefined
    const sponsor = undefined
    const status = 'active'
    const text = undefined
    const title = ModelUtils.emptyIfNull(riphCtisDto.titre)

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
}
