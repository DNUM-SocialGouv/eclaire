/* eslint-disable @typescript-eslint/no-unsafe-argument */

import {
  CodeableConcept,
  ContactDetail,
  Extension,
  Group,
  Identifier,
  Location,
  Meta,
  Organization,
  Reference,
} from 'fhir/r4'

import { CodeableConceptModel } from '../../shared/models/data-types/CodeableConceptModel'
import { IdentifierModel } from '../../shared/models/data-types/IdentifierModel'
import { GroupModel } from '../../shared/models/domain-resources/GroupModel'
import { LocationModel } from '../../shared/models/domain-resources/LocationModel'
import { NarrativeModel } from '../../shared/models/domain-resources/NarrativeModel'
import { OrganizationModel } from '../../shared/models/domain-resources/OrganizationModel'
import { ResearchStudyModel, RiphStatus } from '../../shared/models/domain-resources/ResearchStudyModel'
import { ModelUtils } from '../../shared/models/eclaire/ModelUtils'
import { OriginalContentsToEnhanceModel } from '../../shared/models/eclaire/OriginalContentsToEnhanceModel'
import { ReferenceContentsModel } from '../../shared/models/eclaire/ReferenceContentsModel'
import { ContactDetailModel } from '../../shared/models/metadata-types/ContactDetailModel'
import { ExtensionModel } from '../../shared/models/special-purpose-data-types/ExtensionModel'
import { MetaModel } from '../../shared/models/special-purpose-data-types/MetaModel'
import {
  AssignerForPrimaryIdentifier,
  ReferenceModel,
} from '../../shared/models/special-purpose-data-types/ReferenceModel'
import { EclaireDto } from '../dto/EclaireDto'

export class ResearchStudyModelFactory {
  static create(eclaireDto: EclaireDto): ResearchStudyModel {
    const extensions: Extension[] = []
    const text = NarrativeModel.create(eclaireDto, 'extensions')
    const { primaryAssignerIdentifier, primaryAssignerOrganization } = this.createPrimaryAssigner(eclaireDto, text)
    const { enrollment, enrollmentGroup } = this.createEnrollmentContent(eclaireDto, text)
    const { site, siteLocations } = this.createSitesAndSiteLocations(eclaireDto, text)

    const mostRecentDate = ModelUtils.getMostRecentIsoDate(
      ModelUtils.undefinedIfNull(eclaireDto.historique),
      ModelUtils.undefinedIfNull(eclaireDto.dates_avis_favorable_ms_mns),
      eclaireDto.date_theorique_maximale_autorisation_cpp
    )

    let meta: Meta = undefined
    if (ModelUtils.isNotNull(mostRecentDate)) {
      meta = MetaModel.create(mostRecentDate)
      extensions.push(ExtensionModel.createEclaireReviewDate(mostRecentDate))
    }

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
      ModelUtils.isNotNull(eclaireDto.contact_prenom) ||
      ModelUtils.isNotNull(eclaireDto.contact_nom) ||
      ModelUtils.isNotNull(eclaireDto.contact_telephone) ||
      ModelUtils.isNotNull(eclaireDto.contact_courriel)
    ) {
      const contact_prenom = ModelUtils.isNotNull(eclaireDto.contact_prenom) ? eclaireDto.contact_prenom : undefined
      const contact_nom = ModelUtils.isNotNull(eclaireDto.contact_nom) ? eclaireDto.contact_nom : undefined
      const contact_telephone = ModelUtils.isNotNull(eclaireDto.contact_telephone) ? eclaireDto.contact_telephone : undefined
      const contact_courriel = ModelUtils.isNotNull(eclaireDto.contact_courriel) ? eclaireDto.contact_courriel : undefined

      contact.push(ContactDetailModel.create(
        contact_prenom,
        undefined,
        contact_nom,
        contact_telephone,
        contact_courriel,
        undefined,
        eclaireDto.organisme_adresse,
        eclaireDto.organisme_pays,
        eclaireDto.organisme_ville,
        eclaireDto.organisme_code_postal,
        undefined
      ))
    }

    contact.push(
      ContactDetailModel.create(
        eclaireDto.contact_public.prenom,
        undefined,
        eclaireDto.contact_public.nom,
        eclaireDto.contact_public.telephone,
        eclaireDto.contact_public.courriel,
        'Public',
        undefined,
        undefined,
        undefined,
        undefined,
        undefined
      )
    )

    const description = ModelUtils.undefinedIfNull(eclaireDto.resume)

    if (ModelUtils.isNotNull(eclaireDto.domaine_therapeutique)) {
      extensions.push(ExtensionModel.createEclaireTherapeuticArea(eclaireDto.domaine_therapeutique))
    }

    if (ModelUtils.isNotNull(eclaireDto.date_debut_recrutement) || ModelUtils.isNotNull(eclaireDto.date_fin_recrutement)) {
      extensions.push(ExtensionModel.createEclaireRecruitmentPeriod(eclaireDto.date_debut_recrutement, eclaireDto.date_fin_recrutement))
    }

    if (ModelUtils.isNotNull(eclaireDto.resume)) {
      extensions.push(ExtensionModel.createEclaireDescriptionSummary(eclaireDto.resume))
    }

    let primaryPurposeType: CodeableConcept
    if (ModelUtils.isNotNull(eclaireDto.objectifs)) {
      primaryPurposeType = CodeableConceptModel.createPrimaryPurposeType(eclaireDto.objectifs)
      extensions.push(ExtensionModel.createEclaireOutcomeMeasure(
        null,
        primaryPurposeType,
        eclaireDto.objectifs,
        null
      ))
    } else {
      primaryPurposeType = undefined
    }

    /* TODO - Remplir quand les données seront disponibles
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
    extensions.push(ExtensionModel.createEclaireLabel(ModelUtils.UNAVAILABLE, 'acronym'))
    extensions.push(ExtensionModel.createEclaireLabel(ModelUtils.UNAVAILABLE, 'human-use'))
    extensions.push(ExtensionModel.createEclaireArmIntervention(ModelUtils.UNAVAILABLE, ModelUtils.UNAVAILABLE))
    const relatedArtifacts: RelatedArtifact[] = [RelatedArtifactModel.create(ModelUtils.UNAVAILABLE)]
    const period: Period = PeriodModel.createCompletionDate(ModelUtils.UNAVAILABLE)
    const arm: ResearchStudyArm[] = ResearchStudyArmModel.create(
      undefined,
      undefined,
      undefined,
      undefined,
      undefined
    )
     */
    const arm = undefined
    const relatedArtifacts = undefined
    const period = undefined

    const sponsor = ModelUtils.isNotNull(eclaireDto.numero_primaire)
      ? this.createSponsor(eclaireDto.numero_primaire)
      : undefined

    if (ModelUtils.isNotNull(eclaireDto.organisme_nom) && sponsor !== undefined) {
      extensions.push(ExtensionModel.createEclaireAssociatedPartyR5(
        eclaireDto.organisme_nom,
        'lead-sponsor',
        undefined,
        undefined,
        sponsor
      ))
    }

    const status: RiphStatus = ModelUtils.isNotNull(eclaireDto.etat) ? eclaireDto.etat as RiphStatus : undefined

    if (ModelUtils.isNotNull(eclaireDto.statut_recrutement)) {
      const eclaireRecruitmentStatus = ExtensionModel.createEclaireRecruitmentStatus(eclaireDto.statut_recrutement)
      if (eclaireRecruitmentStatus) {
        extensions.push(eclaireRecruitmentStatus)
      }
    }

    const id = ModelUtils.undefinedIfNull(eclaireDto.numero_primaire)

    const identifier: Identifier[] = [
      primaryAssignerIdentifier,
      /* TODO - Remplir quand les données seront disponibles
      IdentifierModel.createSecondarySlice(ModelUtils.UNAVAILABLE, ModelUtils.UNAVAILABLE),
       */
    ]
    const location = ModelUtils.isNotNull(eclaireDto.pays_concernes)
      ? CodeableConceptModel.createLocations(eclaireDto.pays_concernes)
      : undefined

    const phase: CodeableConcept = CodeableConceptModel.createResearchStudyPhase(eclaireDto.phase_recherche)

    const title = ModelUtils.isNotNull(eclaireDto.titre) ? eclaireDto.titre : undefined

    const organizations: Organization[] = []
    if (ModelUtils.isNotNull(primaryAssignerOrganization)) {
      organizations.push(primaryAssignerOrganization)
    }

    const referenceContents: ReferenceContentsModel = ReferenceContentsModel.create(
      enrollmentGroup,
      siteLocations,
      organizations
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
      status,
      title,
      text
    )
  }

  private static createPrimaryAssigner(eclaireDto: EclaireDto, text: NarrativeModel): {
    primaryAssignerIdentifier: Identifier;
    primaryAssignerOrganization: Organization
  } {
    const assigner: AssignerForPrimaryIdentifier = ModelUtils.identifyAssigner(eclaireDto.reglementation_code, eclaireDto.precision_reglementation)
    const primaryAssignerIdentifier: Identifier = IdentifierModel.createPrimarySlice(eclaireDto.numero_primaire, assigner, undefined)
    const primaryAssignerOrganization: Organization = OrganizationModel.createPrimaryAssigner(assigner, text)

    return { primaryAssignerIdentifier, primaryAssignerOrganization }
  }

  private static createEnrollmentContent(eclaireDto: EclaireDto, text: NarrativeModel): {
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
      eclaireDto.criteres_jugement,
      text
    )

    return { enrollment, enrollmentGroup }
  }

  private static createSponsor(numeroPrimaire: string): Reference {
    const primarySponsorOrganizationId = ModelUtils.generatePrimarySponsorOrganizationId(numeroPrimaire)
    return ReferenceModel.createPrimarySponsor(primarySponsorOrganizationId)
  }

  private static createSitesAndSiteLocations(eclaireDto: EclaireDto, text: NarrativeModel): {
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
          ModelUtils.undefinedIfNull(siteDto.titre),
          text
        ))
      }
    }

    return { site, siteLocations }
  }
}
