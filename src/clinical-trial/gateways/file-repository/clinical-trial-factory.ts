import { ClinicalTrial } from '../../application/entities/ClinicalTrial'
import { Contact } from '../../application/entities/Contact'
import { ContactDetails } from '../../application/entities/ContactDetails'
import { Criteria } from '../../application/entities/Criteria'
import { Recruitment } from '../../application/entities/Recruitment'
import { StudyType } from '../../application/entities/StudyType'
import { TherapeuticArea } from '../../application/entities/TherapeuticArea'
import { Title } from '../../application/entities/Title'
import { Gender } from '../../application/Gender'
import { PrimaryAge } from '../../application/PrimaryAge'
import { SecondaryAge } from '../../application/SecondaryAge'
import { ClinicalTrialModel } from '../model/ClinicalTrialModel'

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
        clinicalTrialModel.recruitment.genders.map((gender: string): Gender => Gender[gender as keyof typeof Gender]),
        clinicalTrialModel.recruitment.ages_range.map((age: string): PrimaryAge => PrimaryAge[age as keyof typeof PrimaryAge]),
        clinicalTrialModel.recruitment.ages_range_secondary_identifiers.map((age: string): SecondaryAge => SecondaryAge[age as keyof typeof SecondaryAge]),
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
        clinicalTrialModel.study_type.study_type,
        clinicalTrialModel.study_type.study_design
      ),
      clinicalTrialModel.last_revision_date,
      new Contact(
        new ContactDetails(
          clinicalTrialModel.contact.public_queries.name,
          clinicalTrialModel.contact.public_queries.firstname,
          clinicalTrialModel.contact.public_queries.lastname,
          clinicalTrialModel.contact.public_queries.address,
          clinicalTrialModel.contact.public_queries.city,
          clinicalTrialModel.contact.public_queries.country,
          clinicalTrialModel.contact.public_queries.zip,
          clinicalTrialModel.contact.public_queries.telephone,
          clinicalTrialModel.contact.public_queries.email,
          clinicalTrialModel.contact.public_queries.organization,
          clinicalTrialModel.contact.public_queries.organization_id,
          clinicalTrialModel.contact.public_queries.title,
          clinicalTrialModel.contact.public_queries.department
        ),
        new ContactDetails(
          clinicalTrialModel.contact.scientific_queries.name,
          clinicalTrialModel.contact.scientific_queries.firstname,
          clinicalTrialModel.contact.scientific_queries.lastname,
          clinicalTrialModel.contact.scientific_queries.address,
          clinicalTrialModel.contact.scientific_queries.city,
          clinicalTrialModel.contact.scientific_queries.country,
          clinicalTrialModel.contact.scientific_queries.zip,
          clinicalTrialModel.contact.scientific_queries.telephone,
          clinicalTrialModel.contact.scientific_queries.email,
          clinicalTrialModel.contact.scientific_queries.organization,
          clinicalTrialModel.contact.scientific_queries.organization_id,
          clinicalTrialModel.contact.scientific_queries.title,
          clinicalTrialModel.contact.scientific_queries.department
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
        clinicalTrialModel.primary_sponsor.title,
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
        trial_site.title,
        trial_site.department
      )),
      clinicalTrialModel.summary
    )
  }
}
