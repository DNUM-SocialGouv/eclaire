import {
  CodeableConcept,
  ContactDetail,
  Extension,
  Group,
  Identifier,
  Location,
  Meta,
  Organization,
  Period,
  Reference,
  RelatedArtifact,
  ResearchStudyArm,
} from 'fhir/r4'

import { ResearchStudyArmModel } from '../../shared/models/backbone-elements/ResearchStudyArmModel'
import { CodeableConceptModel } from '../../shared/models/data-types/CodeableConceptModel'
import { IdentifierModel } from '../../shared/models/data-types/IdentifierModel'
import { PeriodModel } from '../../shared/models/data-types/PeriodModel'
import { RelatedArtifactModel } from '../../shared/models/data-types/RelatedArtifactModel'
import { GroupModel } from '../../shared/models/domain-resources/GroupModel'
import { LocationModel } from '../../shared/models/domain-resources/LocationModel'
import { OrganizationModel } from '../../shared/models/domain-resources/OrganizationModel'
import { RiphStatus, ResearchStudyModel } from '../../shared/models/domain-resources/ResearchStudyModel'
import { ModelUtils } from '../../shared/models/eclaire/ModelUtils'
import { OriginalContentsToEnhanceModel } from '../../shared/models/eclaire/OriginalContentsToEnhanceModel'
import { ReferenceContentsModel } from '../../shared/models/eclaire/ReferenceContentsModel'
import { ContactDetailModel } from '../../shared/models/metadata-types/ContactDetailModel'
import { ExtensionModel } from '../../shared/models/special-purpose-data-types/ExtensionModel'
import { MetaModel } from '../../shared/models/special-purpose-data-types/MetaModel'
import { AssignerForPrimaryIdentifier, ReferenceModel } from '../../shared/models/special-purpose-data-types/ReferenceModel'
import { EclaireDto } from '../dto/EclaireDto'

export class ResearchStudyModelFactory {
  static create(eclaireDto: EclaireDto): ResearchStudyModel {
    const { primaryAssignerIdentifier, primaryAssignerOrganization } = this.createPrimaryAssigner(eclaireDto)
    const { enrollment, enrollmentGroup } = this.createEnrollmentContent(eclaireDto)
    const { sponsor, primarySponsorOrganization } = this.createPrimarySponsor(eclaireDto)
    const { eclaireSecondarySponsor, secondarySponsorOrganization } = this.createSecondarySponsor(eclaireDto)
    const { site, siteLocations } = this.createSitesAndSiteLocations(eclaireDto)

    const mostRecentDate = ModelUtils.getMostRecentIsoDate(
      ModelUtils.undefinedIfNull(eclaireDto.historique),
      ModelUtils.undefinedIfNull(eclaireDto.dates_avis_favorable_ms_mns),
      eclaireDto.date_theorique_maximale_autorisation_cpp
    )

    const category: CodeableConcept[] = []
    category.push(CodeableConceptModel.createRegulationCode(eclaireDto.reglementation_code))
    if (ModelUtils.isNotNull(eclaireDto.precision_reglementation)) {
      category.push(CodeableConceptModel.createReglementationPrecision(eclaireDto.precision_reglementation))
    }

    const condition: CodeableConcept[] = []
    if (ModelUtils.isNotNull(eclaireDto.pathologies_maladies_rares)) {
      condition.push(CodeableConceptModel.createDiseaseSlice(eclaireDto.numero_primaire, eclaireDto.pathologies_maladies_rares))
    }

    let originalContentToEnhance: OriginalContentsToEnhanceModel
    if (ModelUtils.isNotNull(eclaireDto.informations_meddra) && eclaireDto.informations_meddra[0] !== '') {
      originalContentToEnhance = OriginalContentsToEnhanceModel.create(eclaireDto.informations_meddra)
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
        null,
        eclaireDto.contact_nom,
        eclaireDto.contact_telephone,
        eclaireDto.contact_courriel,
        undefined,
        ModelUtils.UNAVAILABLE,
        ModelUtils.UNAVAILABLE,
        ModelUtils.UNAVAILABLE,
        ModelUtils.UNAVAILABLE,
        ModelUtils.UNAVAILABLE
      ))
    }
    contact.push(
      ContactDetailModel.create(
        ModelUtils.UNAVAILABLE,
        null,
        ModelUtils.UNAVAILABLE,
        ModelUtils.UNAVAILABLE,
        ModelUtils.UNAVAILABLE,
        'Scientific',
        ModelUtils.UNAVAILABLE,
        ModelUtils.UNAVAILABLE,
        ModelUtils.UNAVAILABLE,
        ModelUtils.UNAVAILABLE,
        ModelUtils.UNAVAILABLE
      )
    )
    contact.push(
      ContactDetailModel.create(
        eclaireDto.contact_public.prenom,
        null,
        eclaireDto.contact_public.nom,
        eclaireDto.contact_public.telephone,
        eclaireDto.contact_public.courriel,
        'Public',
        ModelUtils.UNAVAILABLE,
        ModelUtils.UNAVAILABLE,
        ModelUtils.UNAVAILABLE,
        ModelUtils.UNAVAILABLE,
        ModelUtils.UNAVAILABLE
      )
    )

    const description = eclaireDto.resume

    const extensions: Extension[] = []
    extensions.push(eclaireSecondarySponsor)
    if (ModelUtils.isNotNull(eclaireDto.domaine_therapeutique)) {
      extensions.push(ExtensionModel.createEclaireTherapeuticArea(eclaireDto.domaine_therapeutique))
    }
    extensions.push(ExtensionModel.createEclaireLabel(ModelUtils.UNAVAILABLE, 'human-use'))
    extensions.push(ExtensionModel.createEclaireLabel(ModelUtils.UNAVAILABLE, 'acronym'))
    extensions.push(ExtensionModel.createEclaireRecruitmentPeriod(eclaireDto.date_debut_recrutement, eclaireDto.date_fin_recrutement))
    extensions.push(ExtensionModel.createEclaireReviewDate(mostRecentDate))

    extensions.push(ExtensionModel.createEclaireDescriptionSummary(eclaireDto.resume))

    const primaryPurposeType: CodeableConcept = CodeableConceptModel.createPrimaryPurposeType(eclaireDto.objectifs)
    extensions.push(ExtensionModel.createEclaireOutcomeMeasure(
      null,
      primaryPurposeType,
      eclaireDto.objectifs,
      null
    ))

    extensions.push(ExtensionModel.createEclaireArmIntervention(ModelUtils.UNAVAILABLE, ModelUtils.UNAVAILABLE))

    extensions.push(ExtensionModel.createEclaireAssociatedPartyR5(
      primarySponsorOrganization.name,
      'lead-sponsor',
      null,
      null,
      sponsor
    ))

    const status: RiphStatus = eclaireDto.etat as RiphStatus
    extensions.push(ExtensionModel.createEclaireRecruitmentStatus(eclaireDto.statut_recrutement))

    const id = eclaireDto.numero_primaire
    const identifier: Identifier[] = [
      primaryAssignerIdentifier,
      IdentifierModel.createSecondarySlice(ModelUtils.UNAVAILABLE, ModelUtils.UNAVAILABLE),
    ]
    const location = ModelUtils.isNotNull(eclaireDto.pays_concernes) ? CodeableConceptModel.createLocations(eclaireDto.pays_concernes) : undefined
    const meta: Meta = MetaModel.create(mostRecentDate)
    const phase: CodeableConcept = CodeableConceptModel.createResearchStudyPhase(eclaireDto.phase_recherche)

    const title = ModelUtils.isNotNull(eclaireDto.titre) ? eclaireDto.titre : undefined

    const organizations: Organization[] = []
    if (ModelUtils.isNotNull(primarySponsorOrganization)) {
      organizations.push(primarySponsorOrganization)
    }
    if (ModelUtils.isNotNull(secondarySponsorOrganization)) {
      organizations.push(secondarySponsorOrganization)
    }
    if (ModelUtils.isNotNull(primaryAssignerOrganization)) {
      organizations.push(primaryAssignerOrganization)
    }

    const referenceContents: ReferenceContentsModel = ReferenceContentsModel.create(
      enrollmentGroup,
      siteLocations,
      organizations
    )

    const relatedArtifacts: RelatedArtifact[] = [RelatedArtifactModel.create(ModelUtils.UNAVAILABLE)]

    const period: Period = PeriodModel.createCompletionDate(ModelUtils.UNAVAILABLE)

    const arm: ResearchStudyArm[] = ResearchStudyArmModel.create(
      ModelUtils.UNAVAILABLE,
      null,
      ModelUtils.UNAVAILABLE,
      null,
      undefined
    )

    return new ResearchStudyModel(
      arm,
      category,
      condition.length === 0 ? undefined : condition,
      contact,
      description,
      enrollment,
      extensions,
      id,
      identifier,
      location,
      meta,
      originalContentToEnhance,
      period,
      phase,
      primaryPurposeType,
      referenceContents,
      relatedArtifacts,
      site.length === 0 ? undefined : site,
      sponsor,
      status,
      title
    )
  }

  private static createPrimaryAssigner(eclaireDto: EclaireDto): {
    primaryAssignerIdentifier: Identifier;
    primaryAssignerOrganization: Organization
  } {
    const assigner: AssignerForPrimaryIdentifier = ModelUtils.identifyAssigner(eclaireDto.reglementation_code, eclaireDto.precision_reglementation)
    const primaryAssignerIdentifier: Identifier = IdentifierModel.createPrimarySlice(eclaireDto.numero_primaire, assigner, ModelUtils.UNAVAILABLE)
    const primaryAssignerOrganization: Organization = OrganizationModel.createPrimaryAssigner(assigner)

    return { primaryAssignerIdentifier, primaryAssignerOrganization }
  }

  private static createEnrollmentContent(eclaireDto: EclaireDto): {
    enrollmentGroup: Group;
    enrollment: Reference[]
  } {
    const enrollmentGroupId = ModelUtils.generateEnrollmentGroupId(eclaireDto.numero_primaire)
    const enrollment: Reference[] = [ReferenceModel.createGroupDetailingStudyCharacteristics(enrollmentGroupId)]
    const enrollmentGroup: Group = GroupModel.createStudyCharacteristics(
      enrollmentGroupId,
      eclaireDto.sexe,
      eclaireDto.tranches_age,
      eclaireDto.taille_etude,
      eclaireDto.groupes_sujet,
      eclaireDto.population_recrutement,
      eclaireDto.criteres_eligibilite,
      eclaireDto.criteres_jugement
    )

    return { enrollment, enrollmentGroup }
  }

  private static createPrimarySponsor(eclaireDto: EclaireDto): {
    primarySponsorOrganization: Organization;
    sponsor: Reference
  } {
    const primarySponsorOrganizationId = ModelUtils.generatePrimarySponsorOrganizationId(eclaireDto.numero_primaire)
    const sponsor: Reference = ReferenceModel.createPrimarySponsor(primarySponsorOrganizationId)

    const primarySponsorOrganization: Organization = OrganizationModel.createSponsor(
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

    return { primarySponsorOrganization, sponsor }
  }

  private static createSecondarySponsor(eclaireDto: EclaireDto): {
    eclaireSecondarySponsor: Extension;
    secondarySponsorOrganization: Organization
  } {
    const secondarySponsorOrganizationId = ModelUtils.generateSecondarySponsorOrganizationId(eclaireDto.numero_primaire)
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

  private static createSitesAndSiteLocations(eclaireDto: EclaireDto): {
    site: Reference[];
    siteLocations: Location[]
  } {
    const site: Reference[] = []
    const siteLocations: Location[] = []

    for (let siteDtoIndex = 0; siteDtoIndex < eclaireDto.sites.length; siteDtoIndex++) {
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
        const siteId = ModelUtils.generateSiteId(eclaireDto.numero_primaire + '-' + siteDtoIndex.toString())
        site.push(ReferenceModel.createSite(siteId))

        siteLocations.push(LocationModel.create(
          siteId,
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
