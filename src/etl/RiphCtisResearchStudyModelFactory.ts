/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Extension, Identifier, Meta } from 'fhir/r4'

import { RiphCtisDto } from './dto/RiphCtisDto'
import { ModelUtils } from '../shared/models/custom/ModelUtils'
import { ReferenceContentsModel } from '../shared/models/custom/ReferenceContentsModel'
import { CodeableConceptModel } from '../shared/models/fhir/DataType/CodeableConceptModel'
import { IdentifierModel } from '../shared/models/fhir/DataType/IdentifierModel'
import { GroupModel } from '../shared/models/fhir/GroupModel'
import { ContactDetailModel } from '../shared/models/fhir/MetadataType/ContactDetailModel'
import { OrganizationModel } from '../shared/models/fhir/OrganizationModel'
import { RiphStatus, ResearchStudyModel } from '../shared/models/fhir/ResearchStudyModel'
import { ExtensionModel } from '../shared/models/fhir/SpecialPurposeDataType/ExtensionModel'
import { MetaModel } from '../shared/models/fhir/SpecialPurposeDataType/MetaModel'
import { ReferenceModel } from '../shared/models/fhir/SpecialPurposeDataType/ReferenceModel'

export class RiphCtisResearchStudyModelFactory {
  static create(riphCtisDto: RiphCtisDto): ResearchStudyModel {
    const enrollmentGroupId = ModelUtils.generateEnrollmentGroupId(riphCtisDto.numero_ctis)
    const primarySponsorOrganizationId = ModelUtils.generatePrimarySponsorOrganizationId(riphCtisDto.numero_ctis)
    const secondarySponsorOrganizationId = ModelUtils.generateSecondarySponsorOrganizationId(riphCtisDto.numero_ctis)
    const assigner = ModelUtils.identifyAssigner(riphCtisDto.reglementation_code)

    const arm = undefined
    const category: CodeableConceptModel[] = [CodeableConceptModel.createCategory(riphCtisDto.reglementation_code)]
    const condition: CodeableConceptModel[] = [
      CodeableConceptModel.createDiseaseCondition(riphCtisDto.pathologies_maladies_rares),
      CodeableConceptModel.createMedDraCondition(riphCtisDto.informations_meddra),
    ]
    const contact: ContactDetailModel[] = [
      ContactDetailModel.create(
        riphCtisDto.contact_prenom,
        riphCtisDto.contact_nom,
        riphCtisDto.contact_telephone,
        riphCtisDto.contact_courriel,
        undefined
      ),
      ContactDetailModel.create(
        ModelUtils.UNAVAILABLE,
        ModelUtils.UNAVAILABLE,
        ModelUtils.UNAVAILABLE,
        ModelUtils.UNAVAILABLE,
        'Scientific'
      ),
      ContactDetailModel.create(
        ModelUtils.UNAVAILABLE,
        ModelUtils.UNAVAILABLE,
        ModelUtils.UNAVAILABLE,
        ModelUtils.UNAVAILABLE,
        'Public'
      ),
    ]
    const contained: GroupModel[] = [
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
    const enrollment: ReferenceModel[] = [ReferenceModel.createGroupDetailingStudyCharacteristics(enrollmentGroupId)]
    const extensions: Extension[] = [
      ExtensionModel.createEclaireSecondarySponsor(secondarySponsorOrganizationId),
      ExtensionModel.createEclaireTherapeuticArea(riphCtisDto.domaine_therapeutique),
      ExtensionModel.createEclaireLabel(ModelUtils.UNAVAILABLE, 'human-use'),
      ExtensionModel.createEclaireLabel(ModelUtils.UNAVAILABLE, 'acronym'),
    ]
    const focus = undefined
    const id = riphCtisDto.numero_ctis
    const identifier: Identifier[] = [
      IdentifierModel.createPrimarySlice(ModelUtils.UNAVAILABLE),
      IdentifierModel.createSecondarySlice(riphCtisDto.numero_ctis, assigner),
    ]
    const implicitRules = undefined
    const keyword = undefined
    const language = undefined
    const location = CodeableConceptModel.createLocations(riphCtisDto.pays_concernes)
    const meta: Meta = MetaModel.create(
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
    const sponsor: ReferenceModel = ReferenceModel.createPrimarySponsor(primarySponsorOrganizationId)
    const status = riphCtisDto.etat as RiphStatus
    const text = undefined
    const title = ModelUtils.emptyIfNull(riphCtisDto.titre)

    const organizations: OrganizationModel[] = [
      OrganizationModel.createSponsor(
        primarySponsorOrganizationId,
        riphCtisDto.organisme_nom,
        riphCtisDto.organisme_adresse,
        riphCtisDto.organisme_ville,
        riphCtisDto.organisme_code_postal,
        riphCtisDto.organisme_pays,
        riphCtisDto.contact_prenom,
        riphCtisDto.contact_nom,
        riphCtisDto.contact_telephone,
        riphCtisDto.contact_courriel
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
      OrganizationModel.createSecondaryAssigner(assigner),
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
