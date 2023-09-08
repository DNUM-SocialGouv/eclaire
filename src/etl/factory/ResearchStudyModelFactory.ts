import { CodeableConcept, ContactDetail, Extension, Group, Identifier, Location, Meta, Organization, Reference } from 'fhir/r4'

import { CodeableConceptModel } from '../../shared/models/data-types/CodeableConceptModel'
import { IdentifierModel } from '../../shared/models/data-types/IdentifierModel'
import { GroupModel } from '../../shared/models/domain-resources/GroupModel'
import { LocationModel } from '../../shared/models/domain-resources/LocationModel'
import { OrganizationModel } from '../../shared/models/domain-resources/OrganizationModel'
import { RiphStatus, ResearchStudyModel } from '../../shared/models/domain-resources/ResearchStudyModel'
import { ModelUtils } from '../../shared/models/eclaire/ModelUtils'
import { ReferenceContentsModel } from '../../shared/models/eclaire/ReferenceContentsModel'
import { ContactDetailModel } from '../../shared/models/metadata-types/ContactDetailModel'
import { ExtensionModel } from '../../shared/models/special-purpose-data-types/ExtensionModel'
import { MetaModel } from '../../shared/models/special-purpose-data-types/MetaModel'
import { AssignerForSecondaryIdentifier, ReferenceModel } from '../../shared/models/special-purpose-data-types/ReferenceModel'
import { EclaireDto } from '../dto/EclaireDto'

export class ResearchStudyModelFactory {
  static create(eclaireDto: EclaireDto): ResearchStudyModel {
    const { secondaryAssignerIdentifier, secondaryAssignerOrganization } = this.createAssigner(eclaireDto)
    const { enrollment, enrollmentReferenceContent } = this.createEnrollmentContent(eclaireDto)
    const { sponsor, primarySponsorOrganization } = this.createPrimarySponsor(eclaireDto)
    const { eclaireSecondarySponsor, secondarySponsorOrganization } = this.createSecondarySponsor(eclaireDto)
    const { site, siteLocations } = this.createSitesAndSiteLocations(eclaireDto)

    const category: CodeableConcept[] = []
    category.push(CodeableConceptModel.createRegulationCode(eclaireDto.reglementation_code))
    if (ModelUtils.isNotNull(eclaireDto.precision_reglementation)) {
      category.push(CodeableConceptModel.createReglementationPrecision(eclaireDto.precision_reglementation))
    }

    const condition: CodeableConcept[] = []
    if (ModelUtils.isNotNull(eclaireDto.pathologies_maladies_rares)) {
      condition.push(CodeableConceptModel.createDisease(eclaireDto.pathologies_maladies_rares))
    }
    if (ModelUtils.isNotNull(eclaireDto.informations_meddra)) {
      condition.push(CodeableConceptModel.createMedDra(eclaireDto.informations_meddra))
    }

    const contact: ContactDetail[] = []
    if (
      ModelUtils.isNotNull(eclaireDto.contact_prenom) &&
      ModelUtils.isNotNull(eclaireDto.contact_nom) &&
      ModelUtils.isNotNull(eclaireDto.contact_telephone) &&
      ModelUtils.isNotNull(eclaireDto.contact_courriel)
    ) {
      contact.push(ContactDetailModel.create(
        eclaireDto.contact_prenom,
        eclaireDto.contact_nom,
        eclaireDto.contact_telephone,
        eclaireDto.contact_courriel,
        undefined
      ))
    }
    contact.push(
      ContactDetailModel.create(
        ModelUtils.UNAVAILABLE,
        ModelUtils.UNAVAILABLE,
        ModelUtils.UNAVAILABLE,
        ModelUtils.UNAVAILABLE,
        'Scientific'
      )
    )
    contact.push(
      ContactDetailModel.create(
        ModelUtils.UNAVAILABLE,
        ModelUtils.UNAVAILABLE,
        ModelUtils.UNAVAILABLE,
        ModelUtils.UNAVAILABLE,
        'Public'
      )
    )

    const contained: Group[] = [enrollmentReferenceContent]
    const description = ModelUtils.UNAVAILABLE

    const extensions: Extension[] = []
    extensions.push(eclaireSecondarySponsor)
    if (ModelUtils.isNotNull(eclaireDto.domaine_therapeutique)) {
      extensions.push(ExtensionModel.createEclaireTherapeuticArea(eclaireDto.domaine_therapeutique))
    }
    extensions.push(ExtensionModel.createEclaireLabel(ModelUtils.UNAVAILABLE, 'human-use'))
    extensions.push(ExtensionModel.createEclaireLabel(ModelUtils.UNAVAILABLE, 'acronym'))
    if (ModelUtils.isNotNull(eclaireDto.date_debut_recrutement)) {
      extensions.push(ExtensionModel.createEclaireRecruitmentPeriod(eclaireDto.date_debut_recrutement))
    }
    extensions.push(ExtensionModel.createEclaireReviewDate(eclaireDto.historique, eclaireDto.dates_avis_favorable_ms_mns))

    const id = eclaireDto.numero_secondaire
    const identifier: Identifier[] = [
      IdentifierModel.createPrimarySlice(ModelUtils.UNAVAILABLE),
      secondaryAssignerIdentifier,
    ]
    const location = ModelUtils.isNotNull(eclaireDto.pays_concernes) ? CodeableConceptModel.createLocations(eclaireDto.pays_concernes) : undefined
    const meta: Meta = MetaModel.create(
      eclaireDto.historique,
      eclaireDto.dates_avis_favorable_ms_mns
    )
    const phase: CodeableConcept = CodeableConceptModel.createResearchStudyPhase(eclaireDto.phase_recherche)

    const status = eclaireDto.etat as RiphStatus
    const title = ModelUtils.isNotNull(eclaireDto.titre) ? eclaireDto.titre : undefined

    const organizations: Organization[] = []
    if (ModelUtils.isNotNull(primarySponsorOrganization)) {
      organizations.push(primarySponsorOrganization)
    }
    if (ModelUtils.isNotNull(secondarySponsorOrganization)) {
      organizations.push(secondarySponsorOrganization)
    }
    if (ModelUtils.isNotNull(secondaryAssignerOrganization)) {
      organizations.push(secondaryAssignerOrganization)
    }

    const referenceContents: ReferenceContentsModel = ReferenceContentsModel.create(siteLocations, organizations)

    return new ResearchStudyModel(
      category,
      condition.length === 0 ? undefined : condition,
      contact,
      contained,
      description,
      enrollment,
      extensions,
      id,
      identifier,
      location,
      meta,
      phase,
      referenceContents,
      site,
      sponsor,
      status,
      title
    )
  }

  private static createAssigner(eclaireDto: EclaireDto) {
    const assigner: AssignerForSecondaryIdentifier = ModelUtils.identifyAssigner(eclaireDto.reglementation_code)
    const secondaryAssignerIdentifier: Identifier = IdentifierModel.createSecondarySlice(eclaireDto.numero_secondaire, assigner)
    const secondaryAssignerOrganization: Organization = OrganizationModel.createSecondaryAssigner(assigner)

    return { secondaryAssignerIdentifier, secondaryAssignerOrganization }
  }

  private static createEnrollmentContent(eclaireDto: EclaireDto) {
    const enrollmentGroupId = ModelUtils.generateEnrollmentGroupId(eclaireDto.numero_secondaire)
    const enrollment: Reference[] = [ReferenceModel.createGroupDetailingStudyCharacteristics(enrollmentGroupId)]
    const enrollmentReferenceContent: Group = GroupModel.createStudyCharacteristics(
      enrollmentGroupId,
      eclaireDto.sexe,
      eclaireDto.tranches_age,
      eclaireDto.taille_etude,
      eclaireDto.groupes_sujet,
      eclaireDto.population_recrutement,
      ModelUtils.UNAVAILABLE,
      ModelUtils.UNAVAILABLE
    )

    return { enrollment, enrollmentReferenceContent }
  }

  private static createPrimarySponsor(eclaireDto: EclaireDto) {
    const primarySponsorOrganizationId = ModelUtils.generatePrimarySponsorOrganizationId(eclaireDto.numero_secondaire)
    const sponsor: Reference = ReferenceModel.createPrimarySponsor(primarySponsorOrganizationId)
    let primarySponsorOrganization: Organization = null
    if (
      ModelUtils.isNotNull(eclaireDto.organisme_nom) &&
      ModelUtils.isNotNull(eclaireDto.organisme_adresse) &&
      ModelUtils.isNotNull(eclaireDto.organisme_ville) &&
      ModelUtils.isNotNull(eclaireDto.organisme_code_postal) &&
      ModelUtils.isNotNull(eclaireDto.organisme_pays) &&
      ModelUtils.isNotNull(eclaireDto.contact_prenom) &&
      ModelUtils.isNotNull(eclaireDto.contact_nom) &&
      ModelUtils.isNotNull(eclaireDto.contact_telephone) &&
      ModelUtils.isNotNull(eclaireDto.contact_courriel)
    ) {
      primarySponsorOrganization = OrganizationModel.createSponsor(
        primarySponsorOrganizationId,
        eclaireDto.organisme_nom,
        eclaireDto.organisme_adresse,
        eclaireDto.organisme_ville,
        eclaireDto.organisme_code_postal,
        eclaireDto.organisme_pays,
        eclaireDto.contact_prenom,
        eclaireDto.contact_nom,
        eclaireDto.contact_telephone,
        eclaireDto.contact_courriel
      )
    }

    return { primarySponsorOrganization, sponsor }
  }

  private static createSecondarySponsor(eclaireDto: EclaireDto) {
    const secondarySponsorOrganizationId = ModelUtils.generateSecondarySponsorOrganizationId(eclaireDto.numero_secondaire)
    const secondarySponsorOrganization: Organization = OrganizationModel.createSponsor(
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
    )
    const eclaireSecondarySponsor: Extension = ExtensionModel.createEclaireSecondarySponsor(secondarySponsorOrganizationId)

    return { eclaireSecondarySponsor, secondarySponsorOrganization }
  }

  private static createSitesAndSiteLocations(eclaireDto: EclaireDto) {
    const site: Reference[] = []
    const siteLocations: Location[] = []

    for (let siteDtoIndex = 0; siteDtoIndex < eclaireDto.sites.length; siteDtoIndex++) {
      const id = ModelUtils.generateCtisSiteId(siteDtoIndex.toString())
      site.push(ReferenceModel.createSite(id))

      const siteDto = eclaireDto.sites.at(siteDtoIndex)
      if (
        ModelUtils.isNotNull(siteDto.adresse) &&
        ModelUtils.isNotNull(siteDto.ville) &&
        ModelUtils.isNotNull(siteDto.prenom) &&
        ModelUtils.isNotNull(siteDto.nom) &&
        ModelUtils.isNotNull(siteDto.organisme) &&
        ModelUtils.isNotNull(siteDto.service) &&
        ModelUtils.isNotNull(siteDto.titre)
      ) {
        siteLocations.push(LocationModel.create(
          id,
          ModelUtils.undefinedIfNull(siteDto.adresse),
          ModelUtils.undefinedIfNull(siteDto.ville),
          ModelUtils.undefinedIfNull(siteDto.prenom),
          ModelUtils.undefinedIfNull(siteDto.nom),
          ModelUtils.undefinedIfNull(siteDto.organisme),
          ModelUtils.undefinedIfNull(siteDto.service),
          ModelUtils.undefinedIfNull(siteDto.titre)
        ))
      }
    }

    return { site, siteLocations }
  }
}
