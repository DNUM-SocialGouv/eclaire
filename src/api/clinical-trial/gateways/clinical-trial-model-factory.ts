import crypto from 'crypto'

import { ClinicalTrialModel } from './model/ClinicalTrialModel'
import { ContactDetailsModel } from './model/ContactDetailsModel'
import { ContactModel } from './model/ContactModel'
import { CriteriaModel } from './model/CriteriaModel'
import { RecruitmentModel } from './model/RecruitmentModel'
import { StudyTypeModel } from './model/StudyTypeModel'
import { TherapeuticAreaModel } from './model/TherapeuticAreaModel'
import { TitleModel } from './model/TitleModel'
import { Gender } from '../application/Gender'
import { PrimaryAge } from '../application/PrimaryAge'
import { SecondaryAge } from '../application/SecondaryAge'

export class ClinicalTrialModelFactory {
  static create(payload: Partial<ClinicalTrialModel>): ClinicalTrialModel {
    console.log(payload)
    return new ClinicalTrialModel(
      crypto.randomUUID(),
      payload.universal_trial_number,
      payload.secondaries_trial_numbers,
      new TitleModel(
        payload.public_title.acronym,
        payload.public_title.value
      ),
      new TitleModel(
        payload.scientific_title.acronym,
        payload.scientific_title.value
      ),
      new RecruitmentModel(
        payload.recruitment.status,
        payload.recruitment.date_recruiting_status,
        payload.recruitment.genders.map((gender: string): Gender => Gender[gender as keyof typeof Gender]),
        payload.recruitment.ages_range.map((age: string): PrimaryAge => PrimaryAge[age as keyof typeof PrimaryAge]),
        payload.recruitment.ages_range_secondary_identifiers.map((age: string): SecondaryAge => SecondaryAge[age as keyof typeof SecondaryAge]),
        payload.recruitment.target_number,
        new CriteriaModel(
          payload.recruitment.exclusion_criteria.id,
          payload.recruitment.exclusion_criteria.value,
          payload.recruitment.exclusion_criteria.value_language
        ),
        new CriteriaModel(
          payload.recruitment.inclusion_criteria.id,
          payload.recruitment.inclusion_criteria.value,
          payload.recruitment.inclusion_criteria.value_language
        ),
        payload.recruitment.clinical_trial_group,
        payload.recruitment.vulnerable_population
      ),
      new StudyTypeModel(
        payload.study_type.phase,
        payload.study_type.study_type,
        payload.study_type.study_design
      ),
      payload.last_revision_date,
      new ContactModel(
        new ContactDetailsModel(
          payload.contact.public_query.name,
          payload.contact.public_query.firstname,
          payload.contact.public_query.lastname,
          payload.contact.public_query.address,
          payload.contact.public_query.city,
          payload.contact.public_query.country,
          payload.contact.public_query.zip,
          payload.contact.public_query.telephone,
          payload.contact.public_query.email,
          payload.contact.public_query.organization,
          payload.contact.public_query.organization_id,
          payload.contact.public_query.title,
          payload.contact.public_query.department
        ),
        new ContactDetailsModel(
          payload.contact.scientific_query.name,
          payload.contact.scientific_query.firstname,
          payload.contact.scientific_query.lastname,
          payload.contact.scientific_query.address,
          payload.contact.scientific_query.city,
          payload.contact.scientific_query.country,
          payload.contact.scientific_query.zip,
          payload.contact.scientific_query.telephone,
          payload.contact.scientific_query.email,
          payload.contact.scientific_query.organization,
          payload.contact.scientific_query.organization_id,
          payload.contact.scientific_query.title,
          payload.contact.scientific_query.department
        )
      ),
      payload.medical_condition,
      payload.medical_condition_meddra,
      payload.therapeutic_areas.map((item) => new TherapeuticAreaModel(item.value, item.code)),
      new ContactDetailsModel(
        payload.primary_sponsor.name,
        payload.primary_sponsor.firstname,
        payload.primary_sponsor.lastname,
        payload.primary_sponsor.address,
        payload.primary_sponsor.city,
        payload.primary_sponsor.country,
        payload.primary_sponsor.zip,
        payload.primary_sponsor.telephone,
        payload.primary_sponsor.email,
        payload.primary_sponsor.organization,
        payload.primary_sponsor.organization_id,
        payload.primary_sponsor.title,
        payload.primary_sponsor.department
      ),
      payload.trial_sites.map((trial_site) => new ContactDetailsModel(
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
      payload.summary,
      payload.clinical_trial_type,
      payload.clinical_trial_category
    )
  }
}
