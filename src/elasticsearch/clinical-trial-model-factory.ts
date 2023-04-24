import { Gender } from '../clinical-trial/application/Gender'
import { PrimaryAge } from '../clinical-trial/application/PrimaryAge'
import { SecondaryAge } from '../clinical-trial/application/SecondaryAge'
import { ClinicalTrialModel } from '../clinical-trial/gateways/model/ClinicalTrialModel'
import { ContactDetailsModel } from '../clinical-trial/gateways/model/ContactDetailsModel'
import { ContactModel } from '../clinical-trial/gateways/model/ContactModel'
import { RecruitmentModel } from '../clinical-trial/gateways/model/RecruitmentModel'
import { StudyTypeModel } from '../clinical-trial/gateways/model/StudyTypeModel'
import { TherapeuticAreaModel } from '../clinical-trial/gateways/model/TherapeuticAreaModel'
import { TitleModel } from '../clinical-trial/gateways/model/TitleModel'

export class ClinicalTrialModelFactory {
  static create(partial: Partial<ClinicalTrialModel>): ClinicalTrialModel {
    return new ClinicalTrialModel(
      partial.uuid,
      partial.universal_trial_number,
      partial.secondaries_trial_numbers,
      new TitleModel(
        partial.public_title.acronym,
        partial.public_title.value
      ),
      new TitleModel(
        partial.scientific_title.acronym,
        partial.scientific_title.value
      ),
      new RecruitmentModel(
        partial.recruitment.status,
        partial.recruitment.date_recruiting_status,
        partial.recruitment.genders.map((gender: string): Gender => Gender[gender as keyof typeof Gender]),
        partial.recruitment.ages_range.map((age: string): PrimaryAge => PrimaryAge[age as keyof typeof PrimaryAge]),
        partial.recruitment.ages_range_secondary_identifiers.map((age: string): SecondaryAge => SecondaryAge[age as keyof typeof SecondaryAge]),
        partial.recruitment.target_number,
        partial.recruitment.exclusion_criteria,
        partial.recruitment.inclusion_criteria,
        partial.recruitment.clinical_trial_group,
        partial.recruitment.vulnerable_population
      ),
      new StudyTypeModel(
        partial.study_type.phase,
        partial.study_type.study_type,
        partial.study_type.study_design
      ),
      partial.last_revision_date,
      new ContactModel(
        new ContactDetailsModel(
          partial.contact.public_query.name,
          partial.contact.public_query.firstname,
          partial.contact.public_query.lastname,
          partial.contact.public_query.address,
          partial.contact.public_query.city,
          partial.contact.public_query.country,
          partial.contact.public_query.zip,
          partial.contact.public_query.telephone,
          partial.contact.public_query.email,
          partial.contact.public_query.organization,
          partial.contact.public_query.organization_id,
          partial.contact.public_query.title,
          partial.contact.public_query.department
        ),
        new ContactDetailsModel(
          partial.contact.scientific_query.name,
          partial.contact.scientific_query.firstname,
          partial.contact.scientific_query.lastname,
          partial.contact.scientific_query.address,
          partial.contact.scientific_query.city,
          partial.contact.scientific_query.country,
          partial.contact.scientific_query.zip,
          partial.contact.scientific_query.telephone,
          partial.contact.scientific_query.email,
          partial.contact.scientific_query.organization,
          partial.contact.scientific_query.organization_id,
          partial.contact.scientific_query.title,
          partial.contact.scientific_query.department
        )
      ),
      partial.medical_condition,
      partial.medical_condition_meddra,
      partial.therapeutic_areas.map((item) => new TherapeuticAreaModel(item.value, item.code)),
      new ContactDetailsModel(
        partial.primary_sponsor.name,
        partial.primary_sponsor.firstname,
        partial.primary_sponsor.lastname,
        partial.primary_sponsor.address,
        partial.primary_sponsor.city,
        partial.primary_sponsor.country,
        partial.primary_sponsor.zip,
        partial.primary_sponsor.telephone,
        partial.primary_sponsor.email,
        partial.primary_sponsor.organization,
        partial.primary_sponsor.organization_id,
        partial.primary_sponsor.title,
        partial.primary_sponsor.department
      ),
      partial.trial_sites.map((trial_site) => new ContactDetailsModel(
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
      partial.summary,
      partial.clinical_trial_type,
      partial.clinical_trial_category
    )
  }
}
