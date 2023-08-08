import { Extension, Identifier } from 'fhir/r4'

import { CodeableConceptModel } from '../../shared/models/data-types/CodeableConceptModel'
import { IdentifierModel } from '../../shared/models/data-types/IdentifierModel'
import { GroupModel } from '../../shared/models/domain-resources/GroupModel'
import { OrganizationModel } from '../../shared/models/domain-resources/OrganizationModel'
import { ResearchStudyModel, RiphStatus } from '../../shared/models/domain-resources/ResearchStudyModel'
import { ModelUtils } from '../../shared/models/eclaire/ModelUtils'
import { ReferenceContentsModel } from '../../shared/models/eclaire/ReferenceContentsModel'
import { ContactDetailModel } from '../../shared/models/metadata-types/ContactDetailModel'
import { ExtensionModel } from '../../shared/models/special-purpose-data-types/ExtensionModel'
import { MetaModel } from '../../shared/models/special-purpose-data-types/MetaModel'
import { ReferenceModel } from '../../shared/models/special-purpose-data-types/ReferenceModel'
import { RiphDmDto } from '../dto/RiphDmDto'

export class RiphDmResearchStudyModelFactory {
  static create(riphDmDto: RiphDmDto): ResearchStudyModel {
    const { secondaryAssignerIdentifier, secondaryAssignerOrganization } = this.createAssigner(riphDmDto)
    const { enrollment, enrollmentReferenceContent } = this.createEnrollmentContent(riphDmDto)
    const { sponsor, primarySponsorOrganization } = this.createPrimarySponsor(riphDmDto)
    const { eclaireSecondarySponsor, secondarySponsorOrganization } = this.createSecondarySponsor(riphDmDto)

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
      ExtensionModel.createEclaireTherapeuticArea(riphDmDto.domaine_therapeutique),
      ExtensionModel.createEclaireLabel(ModelUtils.UNAVAILABLE, 'human-use'),
      ExtensionModel.createEclaireLabel(ModelUtils.UNAVAILABLE, 'acronym'),
      ExtensionModel.createEclaireReviewDate(riphDmDto.historique, riphDmDto.dates_avis_favorable_ms_mns),
    ]
    const id = riphDmDto.numero_national
    const identifier: Identifier[] = [
      IdentifierModel.createPrimarySlice(ModelUtils.UNAVAILABLE),
      secondaryAssignerIdentifier,
    ]
    const location: CodeableConceptModel[] = undefined
    const meta: MetaModel = MetaModel.create(
      riphDmDto.historique,
      riphDmDto.dates_avis_favorable_ms_mns
    )
    const phase: CodeableConceptModel = CodeableConceptModel.createResearchStudyPhase(ModelUtils.UNAVAILABLE)
    const site: ReferenceModel[] = undefined
    const status = riphDmDto.etat as RiphStatus
    const title = ModelUtils.emptyIfNull(riphDmDto.titre_recherche)

    const organizations: OrganizationModel[] = [
      primarySponsorOrganization,
      secondarySponsorOrganization,
      secondaryAssignerOrganization,
    ]

    const referenceContents: ReferenceContentsModel = ReferenceContentsModel.create(undefined, organizations)

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

  private static createAssigner(riphDmDto: RiphDmDto) {
    const assigner = ModelUtils.identifyAssigner(riphDmDto.reglementation_code)
    const secondaryAssignerIdentifier = IdentifierModel.createSecondarySlice(riphDmDto.numero_national, assigner)
    const secondaryAssignerOrganization = OrganizationModel.createSecondaryAssigner(assigner)

    return { secondaryAssignerIdentifier, secondaryAssignerOrganization }
  }

  private static createEnrollmentContent(riphDmDto: RiphDmDto) {
    const enrollmentGroupId = ModelUtils.generateEnrollmentGroupId(riphDmDto.numero_national)
    const enrollment: ReferenceModel[] = [ReferenceModel.createGroupDetailingStudyCharacteristics(enrollmentGroupId)]
    const enrollmentReferenceContent: GroupModel = GroupModel.createStudyCharacteristics(
      enrollmentGroupId,
      ModelUtils.UNAVAILABLE,
      ModelUtils.UNAVAILABLE,
      riphDmDto.taille_etude,
      ModelUtils.UNAVAILABLE,
      ModelUtils.UNAVAILABLE,
      ModelUtils.UNAVAILABLE,
      ModelUtils.UNAVAILABLE
    )

    return { enrollment, enrollmentReferenceContent }
  }

  private static createPrimarySponsor(riphDmDto: RiphDmDto) {
    const primarySponsorOrganizationId = ModelUtils.generatePrimarySponsorOrganizationId(riphDmDto.numero_national)
    const sponsor: ReferenceModel = ReferenceModel.createPrimarySponsor(primarySponsorOrganizationId)
    const primarySponsorOrganization: OrganizationModel = OrganizationModel.createSponsor(
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
    )

    return { primarySponsorOrganization, sponsor }
  }

  private static createSecondarySponsor(riphDmDto: RiphDmDto) {
    const secondarySponsorOrganizationId = ModelUtils.generateSecondarySponsorOrganizationId(riphDmDto.numero_national)
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
}
