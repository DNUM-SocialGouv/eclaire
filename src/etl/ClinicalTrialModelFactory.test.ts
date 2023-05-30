import { ClinicalTrialModelFactory } from './ClinicalTrialModelFactory'
import { ClinicalTrialModel } from '../shared/models/ClinicalTrialModel'
import { riphCtisDto, riphDmDto, riphJardeDto1 } from '../shared/test/helpers/elasticsearchHelper'

describe('clinical trial model factory', () => {
  const unavailable = 'INDISPONIBLE'

  describe('ctis clinical trial model', () => {
    it('should build a CTIS clinical trial model, when RIPH CTIS with all fields filled is given', () => {
      // GIVEN
      const normalClinicalTrialDto = riphCtisDto[0]

      // WHEN
      const clinicalTrialModel = ClinicalTrialModelFactory.fromRiphCtis(normalClinicalTrialDto)

      // THEN
      expect(clinicalTrialModel).toBeInstanceOf(ClinicalTrialModel)
      expect(clinicalTrialModel.universal_trial_number).toBe(unavailable)
      expect(clinicalTrialModel.secondaries_trial_numbers.ctis).toBe('2022-500014-26-00')
      expect(clinicalTrialModel.public_title.acronym).toBe(unavailable)
      expect(clinicalTrialModel.public_title.value).toBe(unavailable)
      expect(clinicalTrialModel.scientific_title.acronym).toBe(unavailable)
      expect(clinicalTrialModel.scientific_title.value).toBe('A PHASE III, RANDOMIZED, OPEN-LABEL STUDY EVALUATING THE EFFICACY AND SAFETY OF GIREDESTRANT IN COMBINATION WITH PHESGO VERSUS PHESGO AFTER INDUCTION THERAPY WITH PHESGO+TAXANE IN PATIENTS WITH PREVIOUSLY UNTREATED HER2-POSITIVE, ESTROGEN RECEPTOR-POSITIVE LOCALLY-ADVANCED OR METASTATIC BREAST CANCER')
      expect(clinicalTrialModel.recruitment.status).toBe('en cours')
      expect(clinicalTrialModel.recruitment.date_recruiting_status).toBe('2022-06-30')
      expect(clinicalTrialModel.recruitment.genders).toStrictEqual([
        'homme',
        'femme',
      ])
      expect(clinicalTrialModel.recruitment.ages_range).toStrictEqual([
        '65 ans et +',
        '18-64 ans',
      ])
      expect(clinicalTrialModel.recruitment.ages_range_secondary_identifiers).toStrictEqual([unavailable])
      expect(clinicalTrialModel.recruitment.target_number).toBe(21)
      expect(clinicalTrialModel.recruitment.exclusion_criteria.id).toBe(unavailable)
      expect(clinicalTrialModel.recruitment.exclusion_criteria.value).toBe(unavailable)
      expect(clinicalTrialModel.recruitment.exclusion_criteria.value_language).toBe(unavailable)
      expect(clinicalTrialModel.recruitment.inclusion_criteria.id).toBe(unavailable)
      expect(clinicalTrialModel.recruitment.inclusion_criteria.value).toBe(unavailable)
      expect(clinicalTrialModel.recruitment.inclusion_criteria.value_language).toBe(unavailable)
      expect(clinicalTrialModel.recruitment.clinical_trial_group).toBe('Données non disponible')
      expect(clinicalTrialModel.recruitment.vulnerable_population).toStrictEqual([
        'Women of child bearing potential not using contraception',
        'Women of child bearing potential using contraception',
      ])
      expect(clinicalTrialModel.study_type.phase).toBe('Therapeutic confirmatory  (Phase III)')
      expect(clinicalTrialModel.study_type.type).toBe('REG536')
      expect(clinicalTrialModel.study_type.design).toBe(unavailable)
      expect(clinicalTrialModel.study_type.category).toBe('un essai clinique')
      expect(clinicalTrialModel.last_revision_date).toBe('12/04/2023 16:15:38')
      expect(clinicalTrialModel.contact.public_query.name).toBe('F. Hoffmann-La Roche AG')
      expect(clinicalTrialModel.contact.public_query.firstname).toBe('Head of EU')
      expect(clinicalTrialModel.contact.public_query.lastname).toBe('Trial Information Support Line-TISL, Switzerland')
      expect(clinicalTrialModel.contact.public_query.address).toBe('Grenzacherstrasse 124')
      expect(clinicalTrialModel.contact.public_query.city).toBe('Basel Town')
      expect(clinicalTrialModel.contact.public_query.country).toBe('Switzerland')
      expect(clinicalTrialModel.contact.public_query.zip).toBe('4058')
      expect(clinicalTrialModel.contact.public_query.telephone).toBe('0041616881111')
      expect(clinicalTrialModel.contact.public_query.email).toBe('global.rochegenentechtrials@roche.com')
      expect(clinicalTrialModel.contact.public_query.organization).toBe(unavailable)
      expect(clinicalTrialModel.contact.public_query.organization_id).toBe(unavailable)
      expect(clinicalTrialModel.contact.public_query.type).toBe(unavailable)
      expect(clinicalTrialModel.contact.public_query.department).toBe(unavailable)
      expect(clinicalTrialModel.contact.scientific_query.name).toBe(unavailable)
      expect(clinicalTrialModel.contact.scientific_query.firstname).toBe(unavailable)
      expect(clinicalTrialModel.contact.scientific_query.lastname).toBe(unavailable)
      expect(clinicalTrialModel.contact.scientific_query.address).toBe(unavailable)
      expect(clinicalTrialModel.contact.scientific_query.city).toBe(unavailable)
      expect(clinicalTrialModel.contact.scientific_query.country).toBe(unavailable)
      expect(clinicalTrialModel.contact.scientific_query.zip).toBe(unavailable)
      expect(clinicalTrialModel.contact.scientific_query.telephone).toBe(unavailable)
      expect(clinicalTrialModel.contact.scientific_query.email).toBe(unavailable)
      expect(clinicalTrialModel.contact.scientific_query.organization).toBe(unavailable)
      expect(clinicalTrialModel.contact.scientific_query.organization_id).toBe(unavailable)
      expect(clinicalTrialModel.contact.scientific_query.type).toBe(unavailable)
      expect(clinicalTrialModel.contact.scientific_query.department).toBe(unavailable)
      expect(clinicalTrialModel.medical_condition).toBe('Locally-Advanced or Metastatic breast cancer (MBC)')
      expect(clinicalTrialModel.medical_condition_meddra).toStrictEqual([
        '10070575',
        '10065430',
      ])
      expect(clinicalTrialModel.therapeutic_areas[0].value).toBe('Diseases [C] - Neoplasms [C04]')
      expect(clinicalTrialModel.therapeutic_areas[0].code).toBe(unavailable)
      expect(clinicalTrialModel.primary_sponsor.name).toBe('F. Hoffmann-La Roche AG')
      expect(clinicalTrialModel.primary_sponsor.firstname).toBe('Head of EU')
      expect(clinicalTrialModel.primary_sponsor.lastname).toBe('Trial Information Support Line-TISL, Switzerland')
      expect(clinicalTrialModel.primary_sponsor.address).toBe('Grenzacherstrasse 124')
      expect(clinicalTrialModel.primary_sponsor.city).toBe('Basel Town')
      expect(clinicalTrialModel.primary_sponsor.country).toBe('Switzerland')
      expect(clinicalTrialModel.primary_sponsor.zip).toBe('4058')
      expect(clinicalTrialModel.primary_sponsor.telephone).toBe('0041616881111')
      expect(clinicalTrialModel.primary_sponsor.email).toBe('global.rochegenentechtrials@roche.com')
      expect(clinicalTrialModel.primary_sponsor.organization).toBe(unavailable)
      expect(clinicalTrialModel.primary_sponsor.organization_id).toBe(unavailable)
      expect(clinicalTrialModel.primary_sponsor.type).toBe(unavailable)
      expect(clinicalTrialModel.primary_sponsor.department).toBe(unavailable)
      expect(clinicalTrialModel.trial_sites[0].name).toBe('Donnée non disponible')
      expect(clinicalTrialModel.trial_sites[0].firstname).toBe('Madeleine')
      expect(clinicalTrialModel.trial_sites[0].lastname).toBe('Aumar')
      expect(clinicalTrialModel.trial_sites[0].address).toBe('Avenue Eugene Avinee')
      expect(clinicalTrialModel.trial_sites[0].city).toBe('Lille')
      expect(clinicalTrialModel.trial_sites[0].country).toBe(unavailable)
      expect(clinicalTrialModel.trial_sites[0].zip).toBe(unavailable)
      expect(clinicalTrialModel.trial_sites[0].telephone).toBe(unavailable)
      expect(clinicalTrialModel.trial_sites[0].email).toBe(unavailable)
      expect(clinicalTrialModel.trial_sites[0].organization).toBe('Donnée non disponible')
      expect(clinicalTrialModel.trial_sites[0].organization_id).toBe(unavailable)
      expect(clinicalTrialModel.trial_sites[0].type).toBe('Dr.')
      expect(clinicalTrialModel.trial_sites[0].department).toBe('Gastroenterology Hepatology and Nutrition Unit Paediatric clinic, Child Unit')
      expect(clinicalTrialModel.summary).toBe(unavailable)
    })

    it('should build a CTIS clinical trial model, when RIPH CTIS with null fields is given', () => {
      // GIVEN
      const clinicalTrialDtoWithEmptyFields = riphCtisDto[1]

      // WHEN
      const clinicalTrialModel = ClinicalTrialModelFactory.fromRiphCtis(clinicalTrialDtoWithEmptyFields)

      // THEN
      expect(clinicalTrialModel.public_title.acronym).toBe(unavailable)
      expect(clinicalTrialModel.public_title.value).toBe(unavailable)
      expect(clinicalTrialModel.scientific_title.acronym).toBe(unavailable)
      expect(clinicalTrialModel.scientific_title.value).toBe('')
      expect(clinicalTrialModel.recruitment.date_recruiting_status).toBe('')
      expect(clinicalTrialModel.recruitment.genders).toStrictEqual([])
      expect(clinicalTrialModel.recruitment.ages_range).toStrictEqual([])
      expect(clinicalTrialModel.recruitment.ages_range_secondary_identifiers).toStrictEqual([unavailable])
      expect(clinicalTrialModel.recruitment.target_number).toBe(-1)
      expect(clinicalTrialModel.recruitment.exclusion_criteria.id).toBe(unavailable)
      expect(clinicalTrialModel.recruitment.exclusion_criteria.value).toBe(unavailable)
      expect(clinicalTrialModel.recruitment.exclusion_criteria.value_language).toBe(unavailable)
      expect(clinicalTrialModel.recruitment.inclusion_criteria.id).toBe(unavailable)
      expect(clinicalTrialModel.recruitment.inclusion_criteria.value).toBe(unavailable)
      expect(clinicalTrialModel.recruitment.inclusion_criteria.value_language).toBe(unavailable)
      expect(clinicalTrialModel.recruitment.clinical_trial_group).toBe('')
      expect(clinicalTrialModel.recruitment.vulnerable_population).toStrictEqual([])
      expect(clinicalTrialModel.study_type.phase).toBe('')
      expect(clinicalTrialModel.study_type.design).toBe(unavailable)
      expect(clinicalTrialModel.study_type.category).toBe('')
      expect(clinicalTrialModel.last_revision_date).toBe('')
      expect(clinicalTrialModel.contact.public_query.name).toBe('')
      expect(clinicalTrialModel.contact.public_query.firstname).toBe('')
      expect(clinicalTrialModel.contact.public_query.lastname).toBe('')
      expect(clinicalTrialModel.contact.public_query.address).toBe('')
      expect(clinicalTrialModel.contact.public_query.city).toBe('')
      expect(clinicalTrialModel.contact.public_query.country).toBe('')
      expect(clinicalTrialModel.contact.public_query.zip).toBe('')
      expect(clinicalTrialModel.contact.public_query.telephone).toBe('')
      expect(clinicalTrialModel.contact.public_query.email).toBe('')
      expect(clinicalTrialModel.contact.public_query.organization).toBe(unavailable)
      expect(clinicalTrialModel.contact.public_query.organization_id).toBe(unavailable)
      expect(clinicalTrialModel.contact.public_query.type).toBe(unavailable)
      expect(clinicalTrialModel.contact.public_query.department).toBe(unavailable)
      expect(clinicalTrialModel.contact.scientific_query.name).toBe(unavailable)
      expect(clinicalTrialModel.contact.scientific_query.firstname).toBe(unavailable)
      expect(clinicalTrialModel.contact.scientific_query.lastname).toBe(unavailable)
      expect(clinicalTrialModel.contact.scientific_query.address).toBe(unavailable)
      expect(clinicalTrialModel.contact.scientific_query.city).toBe(unavailable)
      expect(clinicalTrialModel.contact.scientific_query.country).toBe(unavailable)
      expect(clinicalTrialModel.contact.scientific_query.zip).toBe(unavailable)
      expect(clinicalTrialModel.contact.scientific_query.telephone).toBe(unavailable)
      expect(clinicalTrialModel.contact.scientific_query.email).toBe(unavailable)
      expect(clinicalTrialModel.contact.scientific_query.organization).toBe(unavailable)
      expect(clinicalTrialModel.contact.scientific_query.organization_id).toBe(unavailable)
      expect(clinicalTrialModel.contact.scientific_query.type).toBe(unavailable)
      expect(clinicalTrialModel.contact.scientific_query.department).toBe(unavailable)
      expect(clinicalTrialModel.medical_condition).toBe('')
      expect(clinicalTrialModel.medical_condition_meddra).toStrictEqual([])
      expect(clinicalTrialModel.therapeutic_areas[0].value).toBe('')
      expect(clinicalTrialModel.therapeutic_areas[0].code).toBe(unavailable)
      expect(clinicalTrialModel.primary_sponsor.name).toBe('')
      expect(clinicalTrialModel.primary_sponsor.firstname).toBe('')
      expect(clinicalTrialModel.primary_sponsor.lastname).toBe('')
      expect(clinicalTrialModel.primary_sponsor.address).toBe('')
      expect(clinicalTrialModel.primary_sponsor.city).toBe('')
      expect(clinicalTrialModel.primary_sponsor.country).toBe('')
      expect(clinicalTrialModel.primary_sponsor.zip).toBe('')
      expect(clinicalTrialModel.primary_sponsor.telephone).toBe('')
      expect(clinicalTrialModel.primary_sponsor.email).toBe('')
      expect(clinicalTrialModel.primary_sponsor.organization).toBe(unavailable)
      expect(clinicalTrialModel.primary_sponsor.organization_id).toBe(unavailable)
      expect(clinicalTrialModel.primary_sponsor.type).toBe(unavailable)
      expect(clinicalTrialModel.primary_sponsor.department).toBe(unavailable)
      expect(clinicalTrialModel.trial_sites[0].name).toBe('')
      expect(clinicalTrialModel.trial_sites[0].firstname).toBe('')
      expect(clinicalTrialModel.trial_sites[0].lastname).toBe('')
      expect(clinicalTrialModel.trial_sites[0].address).toBe('')
      expect(clinicalTrialModel.trial_sites[0].city).toBe('')
      expect(clinicalTrialModel.trial_sites[0].country).toBe(unavailable)
      expect(clinicalTrialModel.trial_sites[0].zip).toBe(unavailable)
      expect(clinicalTrialModel.trial_sites[0].telephone).toBe(unavailable)
      expect(clinicalTrialModel.trial_sites[0].email).toBe(unavailable)
      expect(clinicalTrialModel.trial_sites[0].organization).toBe('')
      expect(clinicalTrialModel.trial_sites[0].organization_id).toBe(unavailable)
      expect(clinicalTrialModel.trial_sites[0].type).toBe('')
      expect(clinicalTrialModel.trial_sites[0].department).toBe('')
      expect(clinicalTrialModel.summary).toBe(unavailable)
    })

    it('should build a CTIS clinical trial with the last date of approval, when the last date of approval is higher than historic date', () => {
      // GIVEN
      const ctisWithDateOfApprovalHigherThanHistoricDate = riphCtisDto[0]

      // WHEN
      const clinicalTrialModel = ClinicalTrialModelFactory.fromRiphCtis(ctisWithDateOfApprovalHigherThanHistoricDate)

      // THEN
      expect(clinicalTrialModel.last_revision_date).toBe('12/04/2023 16:15:38')
    })

    it('should build a CTIS clinical trial with the historic date, when the historic date is higher than last date of approval', () => {
      // GIVEN
      const ctisWithHistoricDateHigherThanDateOfApproval = riphCtisDto[2]

      // WHEN
      const clinicalTrialModel = ClinicalTrialModelFactory.fromRiphCtis(ctisWithHistoricDateHigherThanDateOfApproval)

      // THEN
      expect(clinicalTrialModel.last_revision_date).toBe('06/04/2023 16:28:09')
    })
  })

  describe('dm', () => {
    it('when RIPH DM with all fields filled is given, should build a DM clinical trial model', () => {
      // GIVEN
      const normalClinicalTrialDto = riphDmDto[0]

      // WHEN
      const clinicalTrialModel = ClinicalTrialModelFactory.fromRiphDm(normalClinicalTrialDto)

      // THEN
      expect(clinicalTrialModel).toBeInstanceOf(ClinicalTrialModel)
      expect(clinicalTrialModel.universal_trial_number).toBe(unavailable)
      expect(clinicalTrialModel.secondaries_trial_numbers.national_number).toBe('2021-A01563-38')
      expect(clinicalTrialModel.public_title.acronym).toBe(unavailable)
      expect(clinicalTrialModel.public_title.value).toBe(unavailable)
      expect(clinicalTrialModel.scientific_title.acronym).toBe(unavailable)
      expect(clinicalTrialModel.scientific_title.value).toBe("ÉVALUATION DU DISPOSITIF MEDICAL ENDOTRAP POUR LA PROTECTION DU PERSONNEL DU BLOC OPERATOIRE CONTRE LES PARTICULES MICROBIENNES PENDANT L'ENDOSCOPIE DIGESTIVE HAUTE ")
      expect(clinicalTrialModel.recruitment.status).toBe('terminé anticipé')
      expect(clinicalTrialModel.recruitment.date_recruiting_status).toBe('2023-04-11T14:08:12.230323')
      expect(clinicalTrialModel.recruitment.genders).toStrictEqual([unavailable])
      expect(clinicalTrialModel.recruitment.ages_range).toStrictEqual([unavailable])
      expect(clinicalTrialModel.recruitment.ages_range_secondary_identifiers).toStrictEqual([unavailable])
      expect(clinicalTrialModel.recruitment.target_number).toBe(96)
      expect(clinicalTrialModel.recruitment.exclusion_criteria.id).toBe(unavailable)
      expect(clinicalTrialModel.recruitment.exclusion_criteria.value).toBe(unavailable)
      expect(clinicalTrialModel.recruitment.exclusion_criteria.value_language).toBe(unavailable)
      expect(clinicalTrialModel.recruitment.inclusion_criteria.id).toBe(unavailable)
      expect(clinicalTrialModel.recruitment.inclusion_criteria.value).toBe(unavailable)
      expect(clinicalTrialModel.recruitment.inclusion_criteria.value_language).toBe(unavailable)
      expect(clinicalTrialModel.recruitment.clinical_trial_group).toBe(unavailable)
      expect(clinicalTrialModel.recruitment.vulnerable_population).toStrictEqual([unavailable])
      expect(clinicalTrialModel.study_type.phase).toBe(unavailable)
      expect(clinicalTrialModel.study_type.type).toBe('REG745')
      expect(clinicalTrialModel.study_type.design).toBe(unavailable)
      expect(clinicalTrialModel.study_type.category).toBe('IC-Cas 4.2')
      expect(clinicalTrialModel.last_revision_date).toBe('06/04/2023 16:28:09')
      expect(clinicalTrialModel.contact.public_query.name).toBe('Soladis Clinical Studies')
      expect(clinicalTrialModel.contact.public_query.firstname).toBe('Olivier')
      expect(clinicalTrialModel.contact.public_query.lastname).toBe("D'HONDT")
      expect(clinicalTrialModel.contact.public_query.address).toBe('15 Boulevard du Général Leclerc')
      expect(clinicalTrialModel.contact.public_query.city).toBe('Roubaix')
      expect(clinicalTrialModel.contact.public_query.country).toBe('France')
      expect(clinicalTrialModel.contact.public_query.zip).toBe('59100')
      expect(clinicalTrialModel.contact.public_query.telephone).toBe(unavailable)
      expect(clinicalTrialModel.contact.public_query.email).toBe('cdp_scs@soladis.fr')
      expect(clinicalTrialModel.contact.public_query.organization).toBe('Soladis Clinical Studies')
      expect(clinicalTrialModel.contact.public_query.organization_id).toBe(unavailable)
      expect(clinicalTrialModel.contact.public_query.type).toBe('Promoteur institutionnel')
      expect(clinicalTrialModel.contact.public_query.department).toBe(unavailable)
      expect(clinicalTrialModel.contact.scientific_query.name).toBe(unavailable)
      expect(clinicalTrialModel.contact.scientific_query.firstname).toBe(unavailable)
      expect(clinicalTrialModel.contact.scientific_query.lastname).toBe(unavailable)
      expect(clinicalTrialModel.contact.scientific_query.address).toBe(unavailable)
      expect(clinicalTrialModel.contact.scientific_query.city).toBe(unavailable)
      expect(clinicalTrialModel.contact.scientific_query.country).toBe(unavailable)
      expect(clinicalTrialModel.contact.scientific_query.zip).toBe(unavailable)
      expect(clinicalTrialModel.contact.scientific_query.telephone).toBe(unavailable)
      expect(clinicalTrialModel.contact.scientific_query.email).toBe(unavailable)
      expect(clinicalTrialModel.contact.scientific_query.organization).toBe(unavailable)
      expect(clinicalTrialModel.contact.scientific_query.organization_id).toBe(unavailable)
      expect(clinicalTrialModel.contact.scientific_query.type).toBe(unavailable)
      expect(clinicalTrialModel.contact.scientific_query.department).toBe(unavailable)
      expect(clinicalTrialModel.medical_condition).toBe(unavailable)
      expect(clinicalTrialModel.medical_condition_meddra).toStrictEqual([unavailable])
      expect(clinicalTrialModel.therapeutic_areas[0].value).toBe('Hépato-gastro-entérologie')
      expect(clinicalTrialModel.therapeutic_areas[0].code).toBe(unavailable)
      expect(clinicalTrialModel.primary_sponsor.name).toBe('Soladis Clinical Studies')
      expect(clinicalTrialModel.primary_sponsor.firstname).toBe('Olivier')
      expect(clinicalTrialModel.primary_sponsor.lastname).toBe("D'HONDT")
      expect(clinicalTrialModel.primary_sponsor.address).toBe('15 Boulevard du Général Leclerc')
      expect(clinicalTrialModel.primary_sponsor.city).toBe('Roubaix')
      expect(clinicalTrialModel.primary_sponsor.country).toBe('France')
      expect(clinicalTrialModel.primary_sponsor.zip).toBe('59100')
      expect(clinicalTrialModel.primary_sponsor.telephone).toBe(unavailable)
      expect(clinicalTrialModel.primary_sponsor.email).toBe('cdp_scs@soladis.fr')
      expect(clinicalTrialModel.primary_sponsor.organization).toBe('Soladis Clinical Studies')
      expect(clinicalTrialModel.primary_sponsor.organization_id).toBe(unavailable)
      expect(clinicalTrialModel.primary_sponsor.type).toBe('Promoteur institutionnel')
      expect(clinicalTrialModel.primary_sponsor.department).toBe(unavailable)
      expect(clinicalTrialModel.trial_sites).toStrictEqual([])
      expect(clinicalTrialModel.summary).toBe(unavailable)
    })

    it('when RIPH DM with null fields is given, should build a DM clinical trial model', () => {
      // GIVEN
      const clinicalTrialDtoWithEmptyFields = riphDmDto[1]

      // WHEN
      const clinicalTrialModel = ClinicalTrialModelFactory.fromRiphDm(clinicalTrialDtoWithEmptyFields)

      // THEN
      expect(clinicalTrialModel.public_title.acronym).toBe(unavailable)
      expect(clinicalTrialModel.public_title.value).toBe(unavailable)
      expect(clinicalTrialModel.scientific_title.acronym).toBe(unavailable)
      expect(clinicalTrialModel.scientific_title.value).toBe('')
      expect(clinicalTrialModel.recruitment.date_recruiting_status).toBe('')
      expect(clinicalTrialModel.recruitment.genders).toStrictEqual([unavailable])
      expect(clinicalTrialModel.recruitment.ages_range).toStrictEqual([unavailable])
      expect(clinicalTrialModel.recruitment.ages_range_secondary_identifiers).toStrictEqual([unavailable])
      expect(clinicalTrialModel.recruitment.target_number).toBe(-1)
      expect(clinicalTrialModel.recruitment.exclusion_criteria.id).toBe(unavailable)
      expect(clinicalTrialModel.recruitment.exclusion_criteria.value).toBe(unavailable)
      expect(clinicalTrialModel.recruitment.exclusion_criteria.value_language).toBe(unavailable)
      expect(clinicalTrialModel.recruitment.inclusion_criteria.id).toBe(unavailable)
      expect(clinicalTrialModel.recruitment.inclusion_criteria.value).toBe(unavailable)
      expect(clinicalTrialModel.recruitment.inclusion_criteria.value_language).toBe(unavailable)
      expect(clinicalTrialModel.recruitment.clinical_trial_group).toBe(unavailable)
      expect(clinicalTrialModel.recruitment.vulnerable_population).toStrictEqual([unavailable])
      expect(clinicalTrialModel.study_type.phase).toBe(unavailable)
      expect(clinicalTrialModel.study_type.design).toBe(unavailable)
      expect(clinicalTrialModel.study_type.category).toBe('')
      expect(clinicalTrialModel.last_revision_date).toBe('')
      expect(clinicalTrialModel.contact.public_query.name).toBe('')
      expect(clinicalTrialModel.contact.public_query.firstname).toBe('')
      expect(clinicalTrialModel.contact.public_query.lastname).toBe('')
      expect(clinicalTrialModel.contact.public_query.address).toBe('')
      expect(clinicalTrialModel.contact.public_query.city).toBe('')
      expect(clinicalTrialModel.contact.public_query.country).toBe('')
      expect(clinicalTrialModel.contact.public_query.zip).toBe('')
      expect(clinicalTrialModel.contact.public_query.telephone).toBe(unavailable)
      expect(clinicalTrialModel.contact.public_query.email).toBe('')
      expect(clinicalTrialModel.contact.public_query.organization).toBe('')
      expect(clinicalTrialModel.contact.public_query.organization_id).toBe(unavailable)
      expect(clinicalTrialModel.contact.public_query.type).toBe('')
      expect(clinicalTrialModel.contact.public_query.department).toBe(unavailable)
      expect(clinicalTrialModel.contact.scientific_query.name).toBe(unavailable)
      expect(clinicalTrialModel.contact.scientific_query.firstname).toBe(unavailable)
      expect(clinicalTrialModel.contact.scientific_query.lastname).toBe(unavailable)
      expect(clinicalTrialModel.contact.scientific_query.address).toBe(unavailable)
      expect(clinicalTrialModel.contact.scientific_query.city).toBe(unavailable)
      expect(clinicalTrialModel.contact.scientific_query.country).toBe(unavailable)
      expect(clinicalTrialModel.contact.scientific_query.zip).toBe(unavailable)
      expect(clinicalTrialModel.contact.scientific_query.telephone).toBe(unavailable)
      expect(clinicalTrialModel.contact.scientific_query.email).toBe(unavailable)
      expect(clinicalTrialModel.contact.scientific_query.organization).toBe(unavailable)
      expect(clinicalTrialModel.contact.scientific_query.organization_id).toBe(unavailable)
      expect(clinicalTrialModel.contact.scientific_query.type).toBe(unavailable)
      expect(clinicalTrialModel.contact.scientific_query.department).toBe(unavailable)
      expect(clinicalTrialModel.medical_condition).toBe(unavailable)
      expect(clinicalTrialModel.medical_condition_meddra).toStrictEqual([unavailable])
      expect(clinicalTrialModel.therapeutic_areas[0].value).toBe('')
      expect(clinicalTrialModel.therapeutic_areas[0].code).toBe(unavailable)
      expect(clinicalTrialModel.primary_sponsor.name).toBe('')
      expect(clinicalTrialModel.primary_sponsor.firstname).toBe('')
      expect(clinicalTrialModel.primary_sponsor.lastname).toBe('')
      expect(clinicalTrialModel.primary_sponsor.address).toBe('')
      expect(clinicalTrialModel.primary_sponsor.city).toBe('')
      expect(clinicalTrialModel.primary_sponsor.country).toBe('')
      expect(clinicalTrialModel.primary_sponsor.zip).toBe('')
      expect(clinicalTrialModel.primary_sponsor.telephone).toBe(unavailable)
      expect(clinicalTrialModel.primary_sponsor.email).toBe('')
      expect(clinicalTrialModel.primary_sponsor.organization).toBe('')
      expect(clinicalTrialModel.primary_sponsor.organization_id).toBe(unavailable)
      expect(clinicalTrialModel.primary_sponsor.type).toBe('')
      expect(clinicalTrialModel.primary_sponsor.department).toBe(unavailable)
      expect(clinicalTrialModel.trial_sites).toStrictEqual([])
      expect(clinicalTrialModel.summary).toBe(unavailable)
    })

    it('when the last date of approval is higher than historic date, should build a DM clinical trial with the last date of approval', () => {
      // GIVEN
      const dmWithDateOfApprovalHigherThanHistoricDate = riphDmDto[2]

      // WHEN
      const clinicalTrialModel = ClinicalTrialModelFactory.fromRiphDm(dmWithDateOfApprovalHigherThanHistoricDate)

      // THEN
      expect(clinicalTrialModel.last_revision_date).toBe('06/04/2023 16:28:09')
    })

    it('when the historic date is higher than last date of approval, should build a DM clinical trial with the historic date', () => {
      // GIVEN
      const dmWithHistoricDateHigherThanDateOfApproval = riphDmDto[0]

      // WHEN
      const clinicalTrialModel = ClinicalTrialModelFactory.fromRiphDm(dmWithHistoricDateHigherThanDateOfApproval)

      // THEN
      expect(clinicalTrialModel.last_revision_date).toBe('06/04/2023 16:28:09')
    })
  })

  describe('jardé', () => {
    it('when RIPH Jardé with all fields filled is given, should build a Jardé clinical trial model', () => {
      // GIVEN
      const normalClinicalTrialDto = riphJardeDto1[0]

      // WHEN
      const clinicalTrialModel = ClinicalTrialModelFactory.fromRiphJarde(normalClinicalTrialDto)

      // THEN
      expect(clinicalTrialModel).toBeInstanceOf(ClinicalTrialModel)
      expect(clinicalTrialModel.universal_trial_number).toBe(unavailable)
      expect(clinicalTrialModel.secondaries_trial_numbers.national_number).toBe('2021-A01022-39')
      expect(clinicalTrialModel.public_title.acronym).toBe(unavailable)
      expect(clinicalTrialModel.public_title.value).toBe(unavailable)
      expect(clinicalTrialModel.scientific_title.acronym).toBe(unavailable)
      expect(clinicalTrialModel.scientific_title.value).toBe('Détermination des paramètres biomécaniques et fonctionnels de la locomotion des enfants en fonction des conditions de chaussage.')
      expect(clinicalTrialModel.recruitment.status).toBe('en cours')
      expect(clinicalTrialModel.recruitment.date_recruiting_status).toBe('2023-04-11T14:08:12.230323')
      expect(clinicalTrialModel.recruitment.genders).toStrictEqual([unavailable])
      expect(clinicalTrialModel.recruitment.ages_range).toStrictEqual([unavailable])
      expect(clinicalTrialModel.recruitment.ages_range_secondary_identifiers).toStrictEqual([unavailable])
      expect(clinicalTrialModel.recruitment.target_number).toBe(23)
      expect(clinicalTrialModel.recruitment.exclusion_criteria.id).toBe(unavailable)
      expect(clinicalTrialModel.recruitment.exclusion_criteria.value).toBe(unavailable)
      expect(clinicalTrialModel.recruitment.exclusion_criteria.value_language).toBe(unavailable)
      expect(clinicalTrialModel.recruitment.inclusion_criteria.id).toBe(unavailable)
      expect(clinicalTrialModel.recruitment.inclusion_criteria.value).toBe(unavailable)
      expect(clinicalTrialModel.recruitment.inclusion_criteria.value_language).toBe(unavailable)
      expect(clinicalTrialModel.recruitment.clinical_trial_group).toBe(unavailable)
      expect(clinicalTrialModel.recruitment.vulnerable_population).toStrictEqual([unavailable])
      expect(clinicalTrialModel.study_type.phase).toBe(unavailable)
      expect(clinicalTrialModel.study_type.type).toBe('JARDE')
      expect(clinicalTrialModel.study_type.design).toBe(unavailable)
      expect(clinicalTrialModel.study_type.category).toBe('Catégorie 3')
      expect(clinicalTrialModel.last_revision_date).toBe('04/04/2023 15:53:27')
      expect(clinicalTrialModel.contact.public_query.name).toBe('Université Polytechnique Hauts-de-France')
      expect(clinicalTrialModel.contact.public_query.firstname).toBe('Christophe')
      expect(clinicalTrialModel.contact.public_query.lastname).toBe('GILLET')
      expect(clinicalTrialModel.contact.public_query.address).toBe('LAMIH - Campus du Mont-Houy')
      expect(clinicalTrialModel.contact.public_query.city).toBe('Valenciennes')
      expect(clinicalTrialModel.contact.public_query.country).toBe('France')
      expect(clinicalTrialModel.contact.public_query.zip).toBe('59313')
      expect(clinicalTrialModel.contact.public_query.telephone).toBe(unavailable)
      expect(clinicalTrialModel.contact.public_query.email).toBe('christophe.gillet@uphf.fr')
      expect(clinicalTrialModel.contact.public_query.organization).toBe('Université Polytechnique Hauts-de-France')
      expect(clinicalTrialModel.contact.public_query.organization_id).toBe(unavailable)
      expect(clinicalTrialModel.contact.public_query.type).toBe('Promoteur institutionnel')
      expect(clinicalTrialModel.contact.public_query.department).toBe(unavailable)
      expect(clinicalTrialModel.contact.scientific_query.name).toBe(unavailable)
      expect(clinicalTrialModel.contact.scientific_query.firstname).toBe(unavailable)
      expect(clinicalTrialModel.contact.scientific_query.lastname).toBe(unavailable)
      expect(clinicalTrialModel.contact.scientific_query.address).toBe(unavailable)
      expect(clinicalTrialModel.contact.scientific_query.city).toBe(unavailable)
      expect(clinicalTrialModel.contact.scientific_query.country).toBe(unavailable)
      expect(clinicalTrialModel.contact.scientific_query.zip).toBe(unavailable)
      expect(clinicalTrialModel.contact.scientific_query.telephone).toBe(unavailable)
      expect(clinicalTrialModel.contact.scientific_query.email).toBe(unavailable)
      expect(clinicalTrialModel.contact.scientific_query.organization).toBe(unavailable)
      expect(clinicalTrialModel.contact.scientific_query.organization_id).toBe(unavailable)
      expect(clinicalTrialModel.contact.scientific_query.type).toBe(unavailable)
      expect(clinicalTrialModel.contact.scientific_query.department).toBe(unavailable)
      expect(clinicalTrialModel.medical_condition).toBe(unavailable)
      expect(clinicalTrialModel.medical_condition_meddra).toStrictEqual([unavailable])
      expect(clinicalTrialModel.therapeutic_areas[0].value).toBe('Autres')
      expect(clinicalTrialModel.therapeutic_areas[0].code).toBe(unavailable)
      expect(clinicalTrialModel.primary_sponsor.name).toBe('Université Polytechnique Hauts-de-France')
      expect(clinicalTrialModel.primary_sponsor.firstname).toBe('Christophe')
      expect(clinicalTrialModel.primary_sponsor.lastname).toBe('GILLET')
      expect(clinicalTrialModel.primary_sponsor.address).toBe('LAMIH - Campus du Mont-Houy')
      expect(clinicalTrialModel.primary_sponsor.city).toBe('Valenciennes')
      expect(clinicalTrialModel.primary_sponsor.country).toBe('France')
      expect(clinicalTrialModel.primary_sponsor.zip).toBe('59313')
      expect(clinicalTrialModel.primary_sponsor.telephone).toBe(unavailable)
      expect(clinicalTrialModel.primary_sponsor.email).toBe('christophe.gillet@uphf.fr')
      expect(clinicalTrialModel.primary_sponsor.organization).toBe('Université Polytechnique Hauts-de-France')
      expect(clinicalTrialModel.primary_sponsor.organization_id).toBe(unavailable)
      expect(clinicalTrialModel.primary_sponsor.type).toBe('Promoteur institutionnel')
      expect(clinicalTrialModel.primary_sponsor.department).toBe(unavailable)
      expect(clinicalTrialModel.trial_sites).toStrictEqual([])
      expect(clinicalTrialModel.summary).toBe(unavailable)
    })

    it('when RIPH Jardé with null fields is given, should build a Jardé clinical trial model', () => {
      // GIVEN
      const clinicalTrialDtoWithEmptyFields = riphJardeDto1[1]

      // WHEN
      const clinicalTrialModel = ClinicalTrialModelFactory.fromRiphJarde(clinicalTrialDtoWithEmptyFields)

      // THEN
      expect(clinicalTrialModel.public_title.acronym).toBe(unavailable)
      expect(clinicalTrialModel.public_title.value).toBe(unavailable)
      expect(clinicalTrialModel.scientific_title.acronym).toBe(unavailable)
      expect(clinicalTrialModel.scientific_title.value).toBe('')
      expect(clinicalTrialModel.recruitment.date_recruiting_status).toBe('')
      expect(clinicalTrialModel.recruitment.genders).toStrictEqual([unavailable])
      expect(clinicalTrialModel.recruitment.ages_range).toStrictEqual([unavailable])
      expect(clinicalTrialModel.recruitment.ages_range_secondary_identifiers).toStrictEqual([unavailable])
      expect(clinicalTrialModel.recruitment.target_number).toBe(-1)
      expect(clinicalTrialModel.recruitment.exclusion_criteria.id).toBe(unavailable)
      expect(clinicalTrialModel.recruitment.exclusion_criteria.value).toBe(unavailable)
      expect(clinicalTrialModel.recruitment.exclusion_criteria.value_language).toBe(unavailable)
      expect(clinicalTrialModel.recruitment.inclusion_criteria.id).toBe(unavailable)
      expect(clinicalTrialModel.recruitment.inclusion_criteria.value).toBe(unavailable)
      expect(clinicalTrialModel.recruitment.inclusion_criteria.value_language).toBe(unavailable)
      expect(clinicalTrialModel.recruitment.clinical_trial_group).toBe(unavailable)
      expect(clinicalTrialModel.recruitment.vulnerable_population).toStrictEqual([unavailable])
      expect(clinicalTrialModel.study_type.phase).toBe(unavailable)
      expect(clinicalTrialModel.study_type.design).toBe(unavailable)
      expect(clinicalTrialModel.study_type.category).toBe('')
      expect(clinicalTrialModel.last_revision_date).toBe('')
      expect(clinicalTrialModel.contact.public_query.name).toBe('')
      expect(clinicalTrialModel.contact.public_query.firstname).toBe('')
      expect(clinicalTrialModel.contact.public_query.lastname).toBe('')
      expect(clinicalTrialModel.contact.public_query.address).toBe('')
      expect(clinicalTrialModel.contact.public_query.city).toBe('')
      expect(clinicalTrialModel.contact.public_query.country).toBe('')
      expect(clinicalTrialModel.contact.public_query.zip).toBe('')
      expect(clinicalTrialModel.contact.public_query.telephone).toBe(unavailable)
      expect(clinicalTrialModel.contact.public_query.email).toBe('')
      expect(clinicalTrialModel.contact.public_query.organization).toBe('')
      expect(clinicalTrialModel.contact.public_query.organization_id).toBe(unavailable)
      expect(clinicalTrialModel.contact.public_query.type).toBe('')
      expect(clinicalTrialModel.contact.public_query.department).toBe(unavailable)
      expect(clinicalTrialModel.contact.scientific_query.name).toBe(unavailable)
      expect(clinicalTrialModel.contact.scientific_query.firstname).toBe(unavailable)
      expect(clinicalTrialModel.contact.scientific_query.lastname).toBe(unavailable)
      expect(clinicalTrialModel.contact.scientific_query.address).toBe(unavailable)
      expect(clinicalTrialModel.contact.scientific_query.city).toBe(unavailable)
      expect(clinicalTrialModel.contact.scientific_query.country).toBe(unavailable)
      expect(clinicalTrialModel.contact.scientific_query.zip).toBe(unavailable)
      expect(clinicalTrialModel.contact.scientific_query.telephone).toBe(unavailable)
      expect(clinicalTrialModel.contact.scientific_query.email).toBe(unavailable)
      expect(clinicalTrialModel.contact.scientific_query.organization).toBe(unavailable)
      expect(clinicalTrialModel.contact.scientific_query.organization_id).toBe(unavailable)
      expect(clinicalTrialModel.contact.scientific_query.type).toBe(unavailable)
      expect(clinicalTrialModel.contact.scientific_query.department).toBe(unavailable)
      expect(clinicalTrialModel.medical_condition).toBe(unavailable)
      expect(clinicalTrialModel.medical_condition_meddra).toStrictEqual([unavailable])
      expect(clinicalTrialModel.therapeutic_areas[0].value).toBe('')
      expect(clinicalTrialModel.therapeutic_areas[0].code).toBe(unavailable)
      expect(clinicalTrialModel.primary_sponsor.name).toBe('')
      expect(clinicalTrialModel.primary_sponsor.firstname).toBe('')
      expect(clinicalTrialModel.primary_sponsor.lastname).toBe('')
      expect(clinicalTrialModel.primary_sponsor.address).toBe('')
      expect(clinicalTrialModel.primary_sponsor.city).toBe('')
      expect(clinicalTrialModel.primary_sponsor.country).toBe('')
      expect(clinicalTrialModel.primary_sponsor.zip).toBe('')
      expect(clinicalTrialModel.primary_sponsor.telephone).toBe(unavailable)
      expect(clinicalTrialModel.primary_sponsor.email).toBe('')
      expect(clinicalTrialModel.primary_sponsor.organization).toBe('')
      expect(clinicalTrialModel.primary_sponsor.organization_id).toBe(unavailable)
      expect(clinicalTrialModel.primary_sponsor.type).toBe('')
      expect(clinicalTrialModel.primary_sponsor.department).toBe(unavailable)
      expect(clinicalTrialModel.trial_sites).toStrictEqual([])
      expect(clinicalTrialModel.summary).toBe(unavailable)
    })

    it('when the last date of approval is higher than historic date, should build a Jardé clinical trial with the last date of approval', () => {
      // GIVEN
      const jardeWithDateOfApprovalHigherThanHistoricDate = riphJardeDto1[2]

      // WHEN
      const clinicalTrialModel = ClinicalTrialModelFactory.fromRiphJarde(jardeWithDateOfApprovalHigherThanHistoricDate)

      // THEN
      expect(clinicalTrialModel.last_revision_date).toBe('06/04/2023 16:28:09')
    })

    it('when the historic date is higher than last date of approval, should build a Jardé clinical trial with the historic date', () => {
      // GIVEN
      const jardeWithHistoricDateHigherThanDateOfApproval = riphJardeDto1[0]

      // WHEN
      const clinicalTrialModel = ClinicalTrialModelFactory.fromRiphJarde(jardeWithHistoricDateHigherThanDateOfApproval)

      // THEN
      expect(clinicalTrialModel.last_revision_date).toBe('04/04/2023 15:53:27')
    })
  })
})
