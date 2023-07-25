/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Identifier, Organization } from 'fhir/r4'

import { RiphJardeDto } from './dto/RiphJardeDto'
import { ModelUtils } from '../shared/models/custom/ModelUtils'
import { ReferenceContentsModel } from '../shared/models/custom/ReferenceContentsModel'
import { CodeableConceptModel } from '../shared/models/fhir/DataType/CodeableConceptModel'
import { IdentifierModel } from '../shared/models/fhir/DataType/IdentifierModel'
import { GroupModel } from '../shared/models/fhir/GroupModel'
import { ContactDetailModel } from '../shared/models/fhir/MetadataType/ContactDetailModel'
import { OrganizationModel } from '../shared/models/fhir/OrganizationModel'
import { ResearchStudyModel, RiphStatus } from '../shared/models/fhir/ResearchStudyModel'
import { MetaModel } from '../shared/models/fhir/SpecialPurposeDataType/MetaModel'
import { ReferenceModel } from '../shared/models/fhir/SpecialPurposeDataType/ReferenceModel'

export class RiphJardeResearchStudyModelFactory {
  static create(riphJardeDto: RiphJardeDto): ResearchStudyModel {
    const enrollmentGroupId = undefined
    const primarySponsorOrganizationId = riphJardeDto.numero_national + '-primary-sponsor'

    const arm = undefined
    const category = [CodeableConceptModel.createCategory(riphJardeDto.reglementation_code)]
    const condition = [
      CodeableConceptModel.createDiseaseCondition(ModelUtils.UNAVAILABLE),
      CodeableConceptModel.createMedDraCondition(ModelUtils.UNAVAILABLE),
    ]
    const contact = [
      ContactDetailModel.create(
        riphJardeDto.deposant_prenom,
        riphJardeDto.deposant_nom,
        ModelUtils.UNAVAILABLE,
        riphJardeDto.deposant_courriel
      ),
    ]
    const contained = [
      GroupModel.createStudyCharacteristics(
        enrollmentGroupId,
        ModelUtils.UNAVAILABLE,
        ModelUtils.UNAVAILABLE,
        riphJardeDto.taille_etude,
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
      IdentifierModel.createSecondarySlice(
        riphJardeDto.numero_national,
        riphJardeDto.reglementation_code,
        riphJardeDto.qualification_recherche
      ),
    ]
    const implicitRules = undefined
    const keyword = undefined
    const language = undefined
    const location = undefined
    const meta = MetaModel.create(
      riphJardeDto.historique,
      riphJardeDto.dates_avis_favorable_ms_mns
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
    const status = riphJardeDto.etat as RiphStatus
    const text = undefined
    const title = ModelUtils.emptyIfNull(riphJardeDto.titre_recherche)

    const organizations: Organization[] = [
      OrganizationModel.createPrimarySponsor(
        primarySponsorOrganizationId,
        riphJardeDto.deposant_organisme,
        riphJardeDto.deposant_adresse,
        riphJardeDto.deposant_ville,
        riphJardeDto.deposant_code_postal,
        riphJardeDto.deposant_pays,
        riphJardeDto.deposant_prenom,
        riphJardeDto.deposant_nom,
        ModelUtils.UNAVAILABLE,
        riphJardeDto.deposant_courriel
      ),
    ]

    const referenceContents: ReferenceContentsModel = ReferenceContentsModel.create(organizations)

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
