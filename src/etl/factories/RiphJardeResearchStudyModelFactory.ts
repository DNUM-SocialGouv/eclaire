import { Extension, Identifier, Organization } from 'fhir/r4'

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
import { RiphJardeDto } from '../dto/RiphJardeDto'

export class RiphJardeResearchStudyModelFactory {
  static create(riphJardeDto: RiphJardeDto): ResearchStudyModel {
    const enrollmentGroupId = ModelUtils.generateEnrollmentGroupId(riphJardeDto.numero_national)
    const primarySponsorOrganizationId = ModelUtils.generatePrimarySponsorOrganizationId(riphJardeDto.numero_national)
    const secondarySponsorOrganizationId = ModelUtils.generateSecondarySponsorOrganizationId(riphJardeDto.numero_national)
    const assigner = ModelUtils.identifyAssigner(riphJardeDto.reglementation_code, riphJardeDto.qualification_recherche)

    const category: CodeableConceptModel[] = [CodeableConceptModel.createCategory(riphJardeDto.reglementation_code)]
    const condition: CodeableConceptModel[] = [
      CodeableConceptModel.createDiseaseCondition(ModelUtils.UNAVAILABLE),
      CodeableConceptModel.createMedDraCondition(ModelUtils.UNAVAILABLE),
    ]
    const contact: ContactDetailModel[] = [
      ContactDetailModel.create(
        riphJardeDto.deposant_prenom,
        riphJardeDto.deposant_nom,
        ModelUtils.UNAVAILABLE,
        riphJardeDto.deposant_courriel,
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
    const enrollment: ReferenceModel[] = [ReferenceModel.createGroupDetailingStudyCharacteristics(enrollmentGroupId)]
    const extensions: Extension[] = [
      ExtensionModel.createEclaireSecondarySponsor(secondarySponsorOrganizationId),
      ExtensionModel.createEclaireTherapeuticArea(riphJardeDto.domaine_therapeutique),
      ExtensionModel.createEclaireLabel(ModelUtils.UNAVAILABLE, 'human-use'),
      ExtensionModel.createEclaireLabel(ModelUtils.UNAVAILABLE, 'acronym'),
      ExtensionModel.createEclaireReviewDate(riphJardeDto.historique, riphJardeDto.dates_avis_favorable_ms_mns),
    ]
    const id = riphJardeDto.numero_national
    const identifier: Identifier[] = [
      IdentifierModel.createPrimarySlice(ModelUtils.UNAVAILABLE),
      IdentifierModel.createSecondarySlice(riphJardeDto.numero_national, assigner),
    ]
    const location: CodeableConceptModel[] = undefined
    const meta: MetaModel = MetaModel.create(
      riphJardeDto.historique,
      riphJardeDto.dates_avis_favorable_ms_mns
    )
    const phase: CodeableConceptModel = CodeableConceptModel.createResearchStudyPhase(ModelUtils.UNAVAILABLE)
    const site: ReferenceModel[] = undefined
    const sponsor: ReferenceModel = ReferenceModel.createPrimarySponsor(primarySponsorOrganizationId)
    const status = riphJardeDto.etat as RiphStatus
    const title = ModelUtils.emptyIfNull(riphJardeDto.titre_recherche)

    const organizations: Organization[] = [
      OrganizationModel.createSponsor(
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
}
