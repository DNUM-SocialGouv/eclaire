/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Identifier } from 'fhir/r4'

import { RiphDmDto } from './dto/RiphDmDto'
import { CodeableConceptModel } from '../shared/models/fhir/DataType/CodeableConceptModel'
import { IdentifierModel } from '../shared/models/fhir/DataType/IdentifierModel'
import { GroupModel } from '../shared/models/fhir/GroupModel'
import { ContactDetailModel } from '../shared/models/fhir/MetadataType/ContactDetailModel'
import { ModelUtils } from '../shared/models/fhir/ModelUtils'
import { OrganizationModel } from '../shared/models/fhir/OrganizationModel'
import { ReferenceContents, ResearchStudyModel, RiphStatus } from '../shared/models/fhir/ResearchStudyModel'
import { MetaModel } from '../shared/models/fhir/SpecialPurposeDataType/MetaModel'
import { ReferenceModel } from '../shared/models/fhir/SpecialPurposeDataType/ReferenceModel'

export class RiphDmResearchStudyModelFactory {
  static create(riphDmDto: RiphDmDto): ResearchStudyModel {
    const enrollmentGroupId = undefined
    const primarySponsorOrganizationId = riphDmDto.numero_national + '-primary-sponsor'

    const arm = undefined
    const category = [CodeableConceptModel.createCategory(riphDmDto.reglementation_code)]
    const condition = [
      CodeableConceptModel.createDiseaseCondition(ModelUtils.UNAVAILABLE),
      CodeableConceptModel.createMedDraCondition(ModelUtils.UNAVAILABLE),
    ]
    const contact = [
      ContactDetailModel.create(
        riphDmDto.deposant_prenom,
        riphDmDto.deposant_nom,
        ModelUtils.UNAVAILABLE,
        riphDmDto.deposant_courriel
      ),
    ]
    const contained = [
      GroupModel.createStudyCharacteristics(
        enrollmentGroupId,
        ModelUtils.UNAVAILABLE,
        ModelUtils.UNAVAILABLE,
        riphDmDto.taille_etude,
        ModelUtils.UNAVAILABLE,
        ModelUtils.UNAVAILABLE,
        ModelUtils.UNAVAILABLE,
        ModelUtils.UNAVAILABLE
      ),
    ]
    const description = ModelUtils.UNAVAILABLE
    const enrollment = [ReferenceModel.createGroupDetailingStudyCharacteristics(enrollmentGroupId)]
    const focus = undefined
    const id = undefined
    const identifier: Identifier[] = [
      IdentifierModel.createPrimarySlice(ModelUtils.UNAVAILABLE),
      IdentifierModel.createSecondarySlice(riphDmDto.numero_national, riphDmDto.reglementation_code, riphDmDto.qualification),
    ]
    const implicitRules = undefined
    const keyword = undefined
    const language = undefined
    const location = undefined
    const meta = MetaModel.create(
      riphDmDto.historique,
      riphDmDto.dates_avis_favorable_ms_mns
    )
    const objective = undefined
    const partOf = undefined
    const period = undefined
    const phase: CodeableConceptModel = CodeableConceptModel.createResearchStudyPhase(ModelUtils.UNAVAILABLE)
    const primaryPurposeType = undefined
    const principalInvestigator = undefined
    const protocol = undefined
    const reasonStopped = undefined
    const relatedArtifact = undefined
    const site = undefined
    const sponsor = ReferenceModel.createPrimarySponsor(primarySponsorOrganizationId)
    const status = riphDmDto.etat as RiphStatus
    const text = undefined
    const title = ModelUtils.emptyIfNull(riphDmDto.titre_recherche)

    const organizations: OrganizationModel[] = [
      OrganizationModel.createPrimarySponsor(
        primarySponsorOrganizationId,
        riphDmDto.deposant_promoteur,
        riphDmDto.deposant_adresse,
        riphDmDto.deposant_ville,
        riphDmDto.deposant_code_postal,
        riphDmDto.deposant_pays,
        riphDmDto.deposant_prenom,
        riphDmDto.deposant_nom,
        ModelUtils.UNAVAILABLE,
        riphDmDto.deposant_courriel
      ),
    ]

    const referenceContents: ReferenceContents = { organizations }

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
      referenceContents,
      relatedArtifact,
      site,
      sponsor,
      status,
      text,
      title
    )
  }
}
