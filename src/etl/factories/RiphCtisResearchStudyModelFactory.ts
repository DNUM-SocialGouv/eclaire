import { Extension, Identifier, Meta } from 'fhir/r4'

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
import { ReferenceModel } from '../../shared/models/special-purpose-data-types/ReferenceModel'
import { RiphCtisDto } from '../dto/RiphCtisDto'

export class RiphCtisResearchStudyModelFactory {
  static create(riphCtisDto: RiphCtisDto): ResearchStudyModel {
    const { secondaryAssignerIdentifier, secondaryAssignerOrganization } = this.createAssigner(riphCtisDto)
    const { enrollment, enrollmentReferenceContent } = this.createEnrollmentContent(riphCtisDto)
    const { sponsor, primarySponsorOrganization } = this.createPrimarySponsor(riphCtisDto)
    const { eclaireSecondarySponsor, secondarySponsorOrganization } = this.createSecondarySponsor(riphCtisDto)
    const { site, siteLocations } = this.createSitesAndSiteLocations(riphCtisDto)

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
    const contained: GroupModel[] = [enrollmentReferenceContent]
    const description = ModelUtils.UNAVAILABLE

    const extensions: Extension[] = [
      eclaireSecondarySponsor,
      ExtensionModel.createEclaireTherapeuticArea(riphCtisDto.domaine_therapeutique),
      ExtensionModel.createEclaireLabel(ModelUtils.UNAVAILABLE, 'human-use'),
      ExtensionModel.createEclaireLabel(ModelUtils.UNAVAILABLE, 'acronym'),
      ExtensionModel.createEclaireRecruitmentPeriod(riphCtisDto.date_debut_recrutement),
      ExtensionModel.createEclaireReviewDate(riphCtisDto.historique, riphCtisDto.dates_avis_favorable_ms_mns),
    ]
    const id = riphCtisDto.numero_ctis
    const identifier: Identifier[] = [
      IdentifierModel.createPrimarySlice(ModelUtils.UNAVAILABLE),
      secondaryAssignerIdentifier,
    ]
    const location = CodeableConceptModel.createLocations(riphCtisDto.pays_concernes)
    const meta: Meta = MetaModel.create(
      riphCtisDto.historique,
      riphCtisDto.dates_avis_favorable_ms_mns
    )
    const phase: CodeableConceptModel = CodeableConceptModel.createResearchStudyPhase(riphCtisDto.phase_recherche)

    const status = riphCtisDto.etat as RiphStatus
    const title = ModelUtils.emptyIfNull(riphCtisDto.titre)

    const organizations: OrganizationModel[] = [
      primarySponsorOrganization,
      secondarySponsorOrganization,
      secondaryAssignerOrganization,
    ]

    const referenceContents: ReferenceContentsModel = ReferenceContentsModel.create(siteLocations, organizations)

    return new ResearchStudyModel(
      category,
      condition,
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

  private static createAssigner(riphCtisDto: RiphCtisDto) {
    const assigner = ModelUtils.identifyAssigner(riphCtisDto.reglementation_code)
    const secondaryAssignerIdentifier = IdentifierModel.createSecondarySlice(riphCtisDto.numero_ctis, assigner)
    const secondaryAssignerOrganization = OrganizationModel.createSecondaryAssigner(assigner)

    return { secondaryAssignerIdentifier, secondaryAssignerOrganization }
  }

  private static createEnrollmentContent(riphCtisDto: RiphCtisDto) {
    const enrollmentGroupId = ModelUtils.generateEnrollmentGroupId(riphCtisDto.numero_ctis)
    const enrollment: ReferenceModel[] = [ReferenceModel.createGroupDetailingStudyCharacteristics(enrollmentGroupId)]
    const enrollmentReferenceContent: GroupModel = GroupModel.createStudyCharacteristics(
      enrollmentGroupId,
      riphCtisDto.sexe,
      riphCtisDto.tranches_age,
      riphCtisDto.taille_etude,
      riphCtisDto.groupes_sujet,
      riphCtisDto.population_recrutement,
      ModelUtils.UNAVAILABLE,
      ModelUtils.UNAVAILABLE
    )

    return { enrollment, enrollmentReferenceContent }
  }

  private static createPrimarySponsor(riphCtisDto: RiphCtisDto) {
    const primarySponsorOrganizationId = ModelUtils.generatePrimarySponsorOrganizationId(riphCtisDto.numero_ctis)
    const sponsor: ReferenceModel = ReferenceModel.createPrimarySponsor(primarySponsorOrganizationId)
    const primarySponsorOrganization: OrganizationModel = OrganizationModel.createSponsor(
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
    )

    return { primarySponsorOrganization, sponsor }
  }

  private static createSecondarySponsor(riphCtisDto: RiphCtisDto) {
    const secondarySponsorOrganizationId = ModelUtils.generateSecondarySponsorOrganizationId(riphCtisDto.numero_ctis)
    const secondarySponsorOrganization: OrganizationModel = OrganizationModel.createSponsor(
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
    const eclaireSecondarySponsor = ExtensionModel.createEclaireSecondarySponsor(secondarySponsorOrganizationId)

    return { eclaireSecondarySponsor, secondarySponsorOrganization }
  }

  private static createSitesAndSiteLocations(riphCtisDto: RiphCtisDto) {
    const site: ReferenceModel[] = []
    const siteLocations: LocationModel[] = []

    for (let siteDtoIndex = 0; siteDtoIndex < riphCtisDto.sites.length; siteDtoIndex++) {
      const id = ModelUtils.generateCtisSiteId(siteDtoIndex.toString())
      site.push(ReferenceModel.createSite(id))

      const siteDto = riphCtisDto.sites.at(siteDtoIndex)
      siteLocations.push(LocationModel.create(
        id,
        ModelUtils.emptyIfNull(siteDto.adresse),
        ModelUtils.emptyIfNull(siteDto.ville),
        ModelUtils.emptyIfNull(siteDto.prenom),
        ModelUtils.emptyIfNull(siteDto.nom),
        ModelUtils.emptyIfNull(siteDto.organisme),
        ModelUtils.emptyIfNull(siteDto.service),
        ModelUtils.emptyIfNull(siteDto.titre)
      ))
    }

    return { site, siteLocations }
  }
}
