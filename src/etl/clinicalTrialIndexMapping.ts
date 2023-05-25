const contactDetails = {
  address: { type: 'text' },
  city: { type: 'text' },
  country: { type: 'text' },
  department: { type: 'text' },
  email: { type: 'text' },
  firstname: { type: 'text' },
  lastname: { type: 'text' },
  name: { type: 'text' },
  organization: { type: 'text' },
  organization_id: { type: 'text' },
  telephone: { type: 'text' },
  type: { type: 'text' },
  zip: { type: 'text' },
}

export const clinicalTrialIndexMapping = {
  date_detection: false,
  dynamic: false,
  properties: {
    contact: {
      properties: {
        public_query: { properties: contactDetails },
        scientific_query: { properties: contactDetails },
      },
    },
    last_revision_date: { type: 'text' },
    medical_condition: { type: 'text' },
    medical_condition_meddra: { type: 'text' },
    primary_sponsor: { properties: contactDetails },
    public_title: {
      properties: {
        acronym: { type: 'text' },
        value: { type: 'text' },
      },
    },
    recruitment: {
      properties: {
        ages_range: { type: 'text' },
        ages_range_secondary_identifiers: { type: 'text' },
        clinical_trial_group: { type: 'text' },
        date_recruiting_status: { type: 'text' },
        exclusion_criteria: {
          properties: {
            id: { type: 'text' },
            value: { type: 'text' },
            value_language: { type: 'text' },
          },
        },
        genders: { type: 'text' },
        inclusion_criteria: {
          properties: {
            id: { type: 'text' },
            value: { type: 'text' },
            value_language: { type: 'text' },
          },
        },
        status: { type: 'text' },
        target_number: { type: 'long' },
        vulnerable_population: { type: 'text' },
      },
    },
    scientific_title: {
      properties: {
        acronym: { type: 'text' },
        value: { type: 'text' },
      },
    },
    secondaries_trial_numbers: { type: 'object' },
    study_type: {
      properties: {
        category: { type: 'text' },
        design: { type: 'text' },
        phase: { type: 'text' },
        type: { type: 'text' },
      },
    },
    summary: { type: 'text' },
    therapeutic_areas: {
      properties: {
        code: { type: 'text' },
        value: { type: 'text' },
      },
    },
    trial_sites: { properties: contactDetails },
    universal_trial_number: { type: 'text' },
  },
}
