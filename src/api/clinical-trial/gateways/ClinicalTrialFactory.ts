import { ClinicalTrialModel } from '../../../shared/models/ClinicalTrialModel'
import { ClinicalTrial } from '../application/entities/ClinicalTrial'
import { Contact } from '../application/entities/Contact'
import { ContactDetails } from '../application/entities/ContactDetails'
import { Criteria } from '../application/entities/Criteria'
import { Recruitment } from '../application/entities/Recruitment'
import { StudyType } from '../application/entities/StudyType'
import { TherapeuticArea } from '../application/entities/TherapeuticArea'
import { Title } from '../application/entities/Title'

export class ClinicalTrialFactory {
  static create(clinicalTrialModel: ClinicalTrialModel): ClinicalTrial {
    return new ClinicalTrial(
      clinicalTrialModel.universal_trial_number,
      clinicalTrialModel.secondaries_trial_numbers,
      new Title(
        clinicalTrialModel.public_title.acronym,
        clinicalTrialModel.public_title.value
      ),
      new Title(
        clinicalTrialModel.scientific_title.acronym,
        clinicalTrialModel.scientific_title.value
      ),
      new Recruitment(
        clinicalTrialModel.recruitment.status,
        clinicalTrialModel.recruitment.date_recruiting_status,
        clinicalTrialModel.recruitment.genders,
        clinicalTrialModel.recruitment.ages_range,
        clinicalTrialModel.recruitment.ages_range_secondary_identifiers,
        clinicalTrialModel.recruitment.target_number,
        new Criteria(
          clinicalTrialModel.recruitment.exclusion_criteria.id,
          clinicalTrialModel.recruitment.exclusion_criteria.value,
          clinicalTrialModel.recruitment.exclusion_criteria.value_language
        ),
        new Criteria(
          clinicalTrialModel.recruitment.inclusion_criteria.id,
          clinicalTrialModel.recruitment.inclusion_criteria.value,
          clinicalTrialModel.recruitment.inclusion_criteria.value_language
        ),
        clinicalTrialModel.recruitment.clinical_trial_group,
        clinicalTrialModel.recruitment.vulnerable_population
      ),
      new StudyType(
        clinicalTrialModel.study_type.phase,
        clinicalTrialModel.study_type.type,
        clinicalTrialModel.study_type.design,
        clinicalTrialModel.study_type.category
      ),
      clinicalTrialModel.last_revision_date,
      clinicalTrialModel.updated_at,
      new Contact(
        new ContactDetails(
          clinicalTrialModel.contact.public_query.name,
          clinicalTrialModel.contact.public_query.firstname,
          clinicalTrialModel.contact.public_query.lastname,
          clinicalTrialModel.contact.public_query.address,
          clinicalTrialModel.contact.public_query.city,
          clinicalTrialModel.contact.public_query.country,
          clinicalTrialModel.contact.public_query.zip,
          clinicalTrialModel.contact.public_query.telephone,
          clinicalTrialModel.contact.public_query.email,
          clinicalTrialModel.contact.public_query.organization,
          clinicalTrialModel.contact.public_query.organization_id,
          clinicalTrialModel.contact.public_query.type,
          clinicalTrialModel.contact.public_query.department
        ),
        new ContactDetails(
          clinicalTrialModel.contact.scientific_query.name,
          clinicalTrialModel.contact.scientific_query.firstname,
          clinicalTrialModel.contact.scientific_query.lastname,
          clinicalTrialModel.contact.scientific_query.address,
          clinicalTrialModel.contact.scientific_query.city,
          clinicalTrialModel.contact.scientific_query.country,
          clinicalTrialModel.contact.scientific_query.zip,
          clinicalTrialModel.contact.scientific_query.telephone,
          clinicalTrialModel.contact.scientific_query.email,
          clinicalTrialModel.contact.scientific_query.organization,
          clinicalTrialModel.contact.scientific_query.organization_id,
          clinicalTrialModel.contact.scientific_query.type,
          clinicalTrialModel.contact.scientific_query.department
        )
      ),
      clinicalTrialModel.medical_condition,
      clinicalTrialModel.medical_condition_meddra,
      clinicalTrialModel.therapeutic_areas.map((item) => new TherapeuticArea(item.value, item.code)),
      new ContactDetails(
        clinicalTrialModel.primary_sponsor.name,
        clinicalTrialModel.primary_sponsor.firstname,
        clinicalTrialModel.primary_sponsor.lastname,
        clinicalTrialModel.primary_sponsor.address,
        clinicalTrialModel.primary_sponsor.city,
        clinicalTrialModel.primary_sponsor.country,
        clinicalTrialModel.primary_sponsor.zip,
        clinicalTrialModel.primary_sponsor.telephone,
        clinicalTrialModel.primary_sponsor.email,
        clinicalTrialModel.primary_sponsor.organization,
        clinicalTrialModel.primary_sponsor.organization_id,
        clinicalTrialModel.primary_sponsor.type,
        clinicalTrialModel.primary_sponsor.department
      ),
      clinicalTrialModel.trial_sites.map((trial_site) => new ContactDetails(
        trial_site.name,
        trial_site.firstname,
        trial_site.lastname,
        trial_site.address,
        trial_site.city,
        trial_site.country,
        trial_site.zip,
        trial_site.telephone,
        trial_site.email,
        trial_site.organization,
        trial_site.organization_id,
        trial_site.type,
        trial_site.department
      )),
      clinicalTrialModel.summary
    )
  }
}
