/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Extension, Identifier } from 'fhir/r4'

import { RiphDmDto } from './dto/RiphDmDto'
import { ModelUtils } from '../shared/models/custom/ModelUtils'
import { ReferenceContentsModel } from '../shared/models/custom/ReferenceContentsModel'
import { CodeableConceptModel } from '../shared/models/fhir/DataType/CodeableConceptModel'
import { IdentifierModel } from '../shared/models/fhir/DataType/IdentifierModel'
import { GroupModel } from '../shared/models/fhir/GroupModel'
import { ContactDetailModel } from '../shared/models/fhir/MetadataType/ContactDetailModel'
import { OrganizationModel } from '../shared/models/fhir/OrganizationModel'
import { ResearchStudyModel, RiphStatus } from '../shared/models/fhir/ResearchStudyModel'
import { ExtensionModel } from '../shared/models/fhir/SpecialPurposeDataType/ExtensionModel'
import { MetaModel } from '../shared/models/fhir/SpecialPurposeDataType/MetaModel'
import { ReferenceModel } from '../shared/models/fhir/SpecialPurposeDataType/ReferenceModel'

export class RiphDmResearchStudyModelFactory {
  static create(riphDmDto: RiphDmDto): ResearchStudyModel {
    const enrollmentGroupId = ModelUtils.generateEnrollmentGroupId(riphDmDto.numero_national)
    const primarySponsorOrganizationId = ModelUtils.generatePrimarySponsorOrganizationId(riphDmDto.numero_national)
    const secondarySponsorOrganizationId = ModelUtils.generateSecondarySponsorOrganizationId(riphDmDto.numero_national)

    const arm = undefined
    const category: CodeableConceptModel[] = [CodeableConceptModel.createCategory(riphDmDto.reglementation_code)]
    const condition: CodeableConceptModel[] = [
      CodeableConceptModel.createDiseaseCondition(ModelUtils.UNAVAILABLE),
      CodeableConceptModel.createMedDraCondition(ModelUtils.UNAVAILABLE),
    ]
    const contact: ContactDetailModel[] = [
      ContactDetailModel.create(
        riphDmDto.deposant_prenom,
        riphDmDto.deposant_nom,
        ModelUtils.UNAVAILABLE,
        riphDmDto.deposant_courriel,
        undefined
      ),
      ContactDetailModel.create(
        ModelUtils.UNAVAILABLE,
        ModelUtils.UNAVAILABLE,
        ModelUtils.UNAVAILABLE,
        ModelUtils.UNAVAILABLE,
        'Scientific'
      ),
    ]
    const contained: GroupModel[] = [
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
    const enrollment: ReferenceModel[] = [ReferenceModel.createGroupDetailingStudyCharacteristics(enrollmentGroupId)]
    const extensions: Extension[] = [
      ExtensionModel.createEclaireSecondarySponsor(secondarySponsorOrganizationId),
      ExtensionModel.createEclaireTherapeuticArea(riphDmDto.domaine_therapeutique),
      ExtensionModel.createEclaireLabel(ModelUtils.UNAVAILABLE, 'human-use'),
      ExtensionModel.createEclaireLabel(ModelUtils.UNAVAILABLE, 'acronym'),
    ]
    const focus = undefined
    const id = riphDmDto.numero_national
    const identifier: Identifier[] = [
      IdentifierModel.createPrimarySlice(ModelUtils.UNAVAILABLE),
      IdentifierModel.createSecondarySlice(riphDmDto.numero_national, riphDmDto.reglementation_code, riphDmDto.qualification),
    ]
    const implicitRules = undefined
    const keyword = undefined
    const language = undefined
    const location = undefined
    const meta: MetaModel = MetaModel.create(
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
    const sponsor: ReferenceModel = ReferenceModel.createPrimarySponsor(primarySponsorOrganizationId)
    const status = riphDmDto.etat as RiphStatus
    const text = undefined
    const title = ModelUtils.emptyIfNull(riphDmDto.titre_recherche)

    const organizations: OrganizationModel[] = [
      OrganizationModel.createSponsor(
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
      OrganizationModel.createSponsor(
        secondarySponsorOrganizationId,
        ModelUtils.UNAVAILABLE,
        ModelUtils.UNAVAILABLE,
        ModelUtils.UNAVAILABLE,
        ModelUtils.UNAVAILABLE,
        ModelUtils.UNAVAILABLE,
        ModelUtils.UNAVAILABLE,
        ModelUtils.UNAVAILABLE,
        ModelUtils.UNAVAILABLE,
        ModelUtils.UNAVAILABLE
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
      extensions,
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
