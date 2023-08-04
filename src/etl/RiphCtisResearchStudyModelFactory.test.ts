import { RiphCtisResearchStudyModelFactory } from './RiphCtisResearchStudyModelFactory'
import { riphCtisDto } from '../shared/test/helpers/elasticsearchHelper'

describe('ctis research study model factory', () => {
  it('should build a CTIS research study model, when RIPH CTIS with all fields filled is given', () => {
    // GIVEN
    vi.useFakeTimers()
    vi.setSystemTime(new Date(2022, 0, 1))
    const normalResearchStudyDto = riphCtisDto[0]

    // WHEN
    const researchStudyModel = RiphCtisResearchStudyModelFactory.create(normalResearchStudyDto)

    // THEN
    expect(researchStudyModel).toMatchInlineSnapshot(`
      ResearchStudyModel {
        "category": [
          CodeableConceptModel {
            "coding": [
              CodingModel {
                "code": undefined,
                "display": "REG536",
                "system": undefined,
                "version": undefined,
              },
            ],
            "text": "Regulation Code",
          },
        ],
        "condition": [
          CodeableConceptModel {
            "coding": [
              CodingModel {
                "code": undefined,
                "display": "Locally-Advanced or Metastatic breast cancer (MBC)",
                "system": undefined,
                "version": undefined,
              },
            ],
            "text": "Disease Condition",
          },
          CodeableConceptModel {
            "coding": [
              CodingModel {
                "code": "10070575",
                "display": "MedDRA",
                "system": "http://terminology.hl7.org/CodeSystem/mdr",
                "version": "2.0.1",
              },
              CodingModel {
                "code": "10065430",
                "display": "MedDRA",
                "system": "http://terminology.hl7.org/CodeSystem/mdr",
                "version": "2.0.1",
              },
            ],
            "text": "MedDRA Condition",
          },
        ],
        "contact": [
          ContactDetailModel {
            "extension": undefined,
            "name": "Head of EU Trial Information Support Line-TISL, Switzerland",
            "telecom": [
              ContactPointModel {
                "extension": undefined,
                "system": "phone",
                "use": "work",
                "value": "0041616881111",
              },
              ContactPointModel {
                "extension": undefined,
                "system": "email",
                "use": "work",
                "value": "global.rochegenentechtrials@roche.com",
              },
            ],
          },
          ContactDetailModel {
            "extension": [
              ExtensionModel {
                "extension": undefined,
                "url": "https://interop.esante.gouv.fr/ig/fhir/eclaire/StructureDefinition/eclaire-contact-type",
                "valueCodeableConcept": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": "SCI",
                      "display": "Scientifique / Scientific",
                      "system": "https://interop.esante.gouv.fr/ig/fhir/eclaire/CodeSystem/eclaire-type-contact-code-system",
                      "version": "0.1.0",
                    },
                  ],
                  "text": "Contact Type",
                },
                "valueHumanName": undefined,
                "valueInstant": undefined,
                "valuePeriod": undefined,
                "valueReference": undefined,
                "valueString": undefined,
              },
            ],
            "name": "INDISPONIBLE INDISPONIBLE",
            "telecom": [
              ContactPointModel {
                "extension": undefined,
                "system": "phone",
                "use": "work",
                "value": "INDISPONIBLE",
              },
              ContactPointModel {
                "extension": undefined,
                "system": "email",
                "use": "work",
                "value": "INDISPONIBLE",
              },
            ],
          },
          ContactDetailModel {
            "extension": [
              ExtensionModel {
                "extension": undefined,
                "url": "https://interop.esante.gouv.fr/ig/fhir/eclaire/StructureDefinition/eclaire-contact-type",
                "valueCodeableConcept": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": "PUB",
                      "display": "Publique / Public",
                      "system": "https://interop.esante.gouv.fr/ig/fhir/eclaire/CodeSystem/eclaire-type-contact-code-system",
                      "version": "0.1.0",
                    },
                  ],
                  "text": "Contact Type",
                },
                "valueHumanName": undefined,
                "valueInstant": undefined,
                "valuePeriod": undefined,
                "valueReference": undefined,
                "valueString": undefined,
              },
            ],
            "name": "INDISPONIBLE INDISPONIBLE",
            "telecom": [
              ContactPointModel {
                "extension": undefined,
                "system": "phone",
                "use": "work",
                "value": "INDISPONIBLE",
              },
              ContactPointModel {
                "extension": undefined,
                "system": "email",
                "use": "work",
                "value": "INDISPONIBLE",
              },
            ],
          },
        ],
        "contained": [
          GroupModel {
            "actual": true,
            "characteristic": [
              GroupCharacteristicModel {
                "code": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": undefined,
                      "display": "INDISPONIBLE",
                      "system": undefined,
                      "version": undefined,
                    },
                  ],
                  "text": "Group characteristic code",
                },
                "exclude": false,
                "valueBoolean": undefined,
                "valueCodeableConcept": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": "male",
                      "display": "Male",
                      "system": "http://hl7.org/fhir/administrative-gender",
                      "version": "5.0.0",
                    },
                    CodingModel {
                      "code": "female",
                      "display": "Female",
                      "system": "http://hl7.org/fhir/administrative-gender",
                      "version": "5.0.0",
                    },
                  ],
                  "text": "Genders",
                },
                "valueQuantity": undefined,
                "valueRange": undefined,
                "valueReference": undefined,
              },
              GroupCharacteristicModel {
                "code": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": undefined,
                      "display": "INDISPONIBLE",
                      "system": undefined,
                      "version": undefined,
                    },
                  ],
                  "text": "Group characteristic code",
                },
                "exclude": false,
                "valueBoolean": undefined,
                "valueCodeableConcept": undefined,
                "valueQuantity": undefined,
                "valueRange": RangeModel {
                  "high": undefined,
                  "id": undefined,
                  "low": QuantityModel {
                    "comparator": ">=",
                    "unit": "years",
                    "value": 65,
                  },
                },
                "valueReference": undefined,
              },
              GroupCharacteristicModel {
                "code": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": undefined,
                      "display": "INDISPONIBLE",
                      "system": undefined,
                      "version": undefined,
                    },
                  ],
                  "text": "Group characteristic code",
                },
                "exclude": false,
                "valueBoolean": undefined,
                "valueCodeableConcept": undefined,
                "valueQuantity": undefined,
                "valueRange": RangeModel {
                  "high": QuantityModel {
                    "comparator": "<=",
                    "unit": "years",
                    "value": 64,
                  },
                  "id": undefined,
                  "low": QuantityModel {
                    "comparator": ">=",
                    "unit": "years",
                    "value": 18,
                  },
                },
                "valueReference": undefined,
              },
              GroupCharacteristicModel {
                "code": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": undefined,
                      "display": "INDISPONIBLE",
                      "system": undefined,
                      "version": undefined,
                    },
                  ],
                  "text": "Group characteristic code",
                },
                "exclude": false,
                "valueBoolean": undefined,
                "valueCodeableConcept": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": undefined,
                      "display": "Données non disponible",
                      "system": undefined,
                      "version": undefined,
                    },
                  ],
                  "text": "Research Study Group Category",
                },
                "valueQuantity": undefined,
                "valueRange": undefined,
                "valueReference": undefined,
              },
              GroupCharacteristicModel {
                "code": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": undefined,
                      "display": "INDISPONIBLE",
                      "system": undefined,
                      "version": undefined,
                    },
                  ],
                  "text": "Group characteristic code",
                },
                "exclude": false,
                "valueBoolean": undefined,
                "valueCodeableConcept": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": undefined,
                      "display": "Women of child bearing potential not using contraception, Women of child bearing potential using contraception",
                      "system": undefined,
                      "version": undefined,
                    },
                  ],
                  "text": "Study Population",
                },
                "valueQuantity": undefined,
                "valueRange": undefined,
                "valueReference": undefined,
              },
              GroupCharacteristicModel {
                "code": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": undefined,
                      "display": "INDISPONIBLE",
                      "system": undefined,
                      "version": undefined,
                    },
                  ],
                  "text": "Group characteristic code",
                },
                "exclude": false,
                "valueBoolean": undefined,
                "valueCodeableConcept": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": undefined,
                      "display": "INDISPONIBLE",
                      "system": undefined,
                      "version": undefined,
                    },
                  ],
                  "text": "Study Inclusion Criteria",
                },
                "valueQuantity": undefined,
                "valueRange": undefined,
                "valueReference": undefined,
              },
              GroupCharacteristicModel {
                "code": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": undefined,
                      "display": "INDISPONIBLE",
                      "system": undefined,
                      "version": undefined,
                    },
                  ],
                  "text": "Group characteristic code",
                },
                "exclude": true,
                "valueBoolean": undefined,
                "valueCodeableConcept": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": undefined,
                      "display": "INDISPONIBLE",
                      "system": undefined,
                      "version": undefined,
                    },
                  ],
                  "text": "Study Exclusion Criteria",
                },
                "valueQuantity": undefined,
                "valueRange": undefined,
                "valueReference": undefined,
              },
            ],
            "id": "2022-500014-26-00-enrollment-group-id",
            "quantity": 21,
            "resourceType": "Group",
            "type": "person",
          },
        ],
        "description": "INDISPONIBLE",
        "enrollment": [
          ReferenceModel {
            "display": "Reference to group detailing study characteristics",
            "reference": "#2022-500014-26-00-enrollment-group-id",
            "type": "Group",
          },
        ],
        "extension": [
          ExtensionModel {
            "extension": undefined,
            "url": "https://interop.esante.gouv.fr/ig/fhir/eclaire/StructureDefinition/eclaire-secondary-sponsor",
            "valueCodeableConcept": undefined,
            "valueHumanName": undefined,
            "valueInstant": undefined,
            "valuePeriod": undefined,
            "valueReference": ReferenceModel {
              "display": "Reference to secondary sponsor",
              "reference": "Organization/2022-500014-26-00-secondary-sponsor",
              "type": "Organization",
            },
            "valueString": undefined,
          },
          ExtensionModel {
            "extension": undefined,
            "url": "https://interop.esante.gouv.fr/ig/fhir/eclaire/StructureDefinition/eclaire-therapeutic-area",
            "valueCodeableConcept": undefined,
            "valueHumanName": undefined,
            "valueInstant": undefined,
            "valuePeriod": undefined,
            "valueReference": undefined,
            "valueString": "Diseases [C] - Neoplasms [C04]",
          },
          ExtensionModel {
            "extension": [
              ExtensionModel {
                "extension": undefined,
                "url": "labelValue",
                "valueCodeableConcept": undefined,
                "valueHumanName": undefined,
                "valueInstant": undefined,
                "valuePeriod": undefined,
                "valueReference": undefined,
                "valueString": "INDISPONIBLE",
              },
              ExtensionModel {
                "extension": undefined,
                "url": "labelType",
                "valueCodeableConcept": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": "human-use",
                      "display": "Human use",
                      "system": "http://hl7.org/fhir/title-type",
                      "version": "5.0.0",
                    },
                  ],
                  "text": "Label Type",
                },
                "valueHumanName": undefined,
                "valueInstant": undefined,
                "valuePeriod": undefined,
                "valueReference": undefined,
                "valueString": undefined,
              },
            ],
            "url": "https://interop.esante.gouv.fr/ig/fhir/eclaire/StructureDefinition/eclaire-label",
            "valueCodeableConcept": undefined,
            "valueHumanName": undefined,
            "valueInstant": undefined,
            "valuePeriod": undefined,
            "valueReference": undefined,
            "valueString": undefined,
          },
          ExtensionModel {
            "extension": [
              ExtensionModel {
                "extension": undefined,
                "url": "labelValue",
                "valueCodeableConcept": undefined,
                "valueHumanName": undefined,
                "valueInstant": undefined,
                "valuePeriod": undefined,
                "valueReference": undefined,
                "valueString": "INDISPONIBLE",
              },
              ExtensionModel {
                "extension": undefined,
                "url": "labelType",
                "valueCodeableConcept": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": "acronym",
                      "display": "Acronym",
                      "system": "http://hl7.org/fhir/title-type",
                      "version": "5.0.0",
                    },
                  ],
                  "text": "Label Type",
                },
                "valueHumanName": undefined,
                "valueInstant": undefined,
                "valuePeriod": undefined,
                "valueReference": undefined,
                "valueString": undefined,
              },
            ],
            "url": "https://interop.esante.gouv.fr/ig/fhir/eclaire/StructureDefinition/eclaire-label",
            "valueCodeableConcept": undefined,
            "valueHumanName": undefined,
            "valueInstant": undefined,
            "valuePeriod": undefined,
            "valueReference": undefined,
            "valueString": undefined,
          },
          ExtensionModel {
            "extension": undefined,
            "url": "https://interop.esante.gouv.fr/ig/fhir/eclaire/StructureDefinition/eclaire-recruitment-period",
            "valueCodeableConcept": undefined,
            "valueHumanName": undefined,
            "valueInstant": undefined,
            "valuePeriod": PeriodModel {
              "end": undefined,
              "start": "2022-06-30T00:00:00.000Z",
            },
            "valueReference": undefined,
            "valueString": undefined,
          },
          ExtensionModel {
            "extension": undefined,
            "url": "https://interop.esante.gouv.fr/ig/fhir/eclaire/StructureDefinition/eclaire-review-date",
            "valueCodeableConcept": undefined,
            "valueHumanName": undefined,
            "valueInstant": "2023-04-12T00:00:00.000Z",
            "valuePeriod": undefined,
            "valueReference": undefined,
            "valueString": undefined,
          },
        ],
        "id": "2022-500014-26-00",
        "identifier": [
          IdentifierModel {
            "assigner": ReferenceModel {
              "display": "Reference to primary assigner",
              "reference": undefined,
              "type": "Organization",
            },
            "use": "official",
            "value": "INDISPONIBLE",
          },
          IdentifierModel {
            "assigner": ReferenceModel {
              "display": "Reference to secondary assigner",
              "reference": "Organization/ctis",
              "type": "Organization",
            },
            "use": "secondary",
            "value": "2022-500014-26-00",
          },
        ],
        "location": [
          CodeableConceptModel {
            "coding": [
              CodingModel {
                "code": "BE",
                "display": "Belgium",
                "system": "urn:iso:std:iso:3166",
                "version": "4.0.1",
              },
            ],
            "text": "Countries of recruitment",
          },
          CodeableConceptModel {
            "coding": [
              CodingModel {
                "code": "DE",
                "display": "Germany",
                "system": "urn:iso:std:iso:3166",
                "version": "4.0.1",
              },
            ],
            "text": "Countries of recruitment",
          },
          CodeableConceptModel {
            "coding": [
              CodingModel {
                "code": "ES",
                "display": "Spain",
                "system": "urn:iso:std:iso:3166",
                "version": "4.0.1",
              },
            ],
            "text": "Countries of recruitment",
          },
          CodeableConceptModel {
            "coding": [
              CodingModel {
                "code": "FR",
                "display": "France",
                "system": "urn:iso:std:iso:3166",
                "version": "4.0.1",
              },
            ],
            "text": "Countries of recruitment",
          },
          CodeableConceptModel {
            "coding": [
              CodingModel {
                "code": "HU",
                "display": "Hungary",
                "system": "urn:iso:std:iso:3166",
                "version": "4.0.1",
              },
            ],
            "text": "Countries of recruitment",
          },
          CodeableConceptModel {
            "coding": [
              CodingModel {
                "code": "IT",
                "display": "Italy",
                "system": "urn:iso:std:iso:3166",
                "version": "4.0.1",
              },
            ],
            "text": "Countries of recruitment",
          },
          CodeableConceptModel {
            "coding": [
              CodingModel {
                "code": "PL",
                "display": "Poland",
                "system": "urn:iso:std:iso:3166",
                "version": "4.0.1",
              },
            ],
            "text": "Countries of recruitment",
          },
          CodeableConceptModel {
            "coding": [
              CodingModel {
                "code": "PT",
                "display": "Portugal",
                "system": "urn:iso:std:iso:3166",
                "version": "4.0.1",
              },
            ],
            "text": "Countries of recruitment",
          },
        ],
        "meta": MetaModel {
          "lastUpdated": "2023-04-12T00:00:00.000Z",
          "profile": [
            "https://interop.esante.gouv.fr/ig/fhir/eclaire/StructureDefinition/eclaire-researchstudy",
          ],
        },
        "phase": CodeableConceptModel {
          "coding": [
            CodingModel {
              "code": "phase-3",
              "display": "Phase 3",
              "system": "http://terminology.hl7.org/CodeSystem/research-study-phase",
              "version": "4.0.1",
            },
          ],
          "text": "Research Study Phase",
        },
        "referenceContents": ReferenceContentsModel {
          "locations": [
            LocationModel {
              "address": AddressModel {
                "city": "Lille",
                "country": undefined,
                "line": [
                  "Avenue Eugene Avinee",
                  "Gastroenterology Hepatology and Nutrition Unit Paediatric clinic, Child Unit",
                ],
                "postalCode": undefined,
                "type": "physical",
                "use": "work",
              },
              "id": "0-ctis-site",
              "identifier": [
                IdentifierModel {
                  "assigner": undefined,
                  "use": "official",
                  "value": "0-ctis-site",
                },
              ],
              "name": "Donnée non disponible",
              "resourceType": "Location",
              "telecom": [
                ContactPointModel {
                  "extension": [
                    ExtensionModel {
                      "extension": undefined,
                      "url": "https://interop.esante.gouv.fr/ig/fhir/eclaire/StructureDefinition/eclaire-site-contact-name",
                      "valueCodeableConcept": undefined,
                      "valueHumanName": HumanNameModel {
                        "family": "Aumar",
                        "given": [
                          "Madeleine",
                        ],
                        "prefix": [
                          "Dr.",
                        ],
                        "use": "official",
                      },
                      "valueInstant": undefined,
                      "valuePeriod": undefined,
                      "valueReference": undefined,
                      "valueString": undefined,
                    },
                  ],
                  "system": undefined,
                  "use": "work",
                  "value": undefined,
                },
              ],
            },
          ],
          "organizations": [
            OrganizationModel {
              "address": [
                AddressModel {
                  "city": "Basel Town",
                  "country": "Switzerland",
                  "line": [
                    "Grenzacherstrasse 124",
                  ],
                  "postalCode": "4058",
                  "type": "physical",
                  "use": "work",
                },
              ],
              "contact": [
                OrganizationContactModel {
                  "name": HumanNameModel {
                    "family": "Trial Information Support Line-TISL, Switzerland",
                    "given": [
                      "Head of EU",
                    ],
                    "prefix": undefined,
                    "use": "official",
                  },
                  "purpose": CodeableConceptModel {
                    "coding": [
                      CodingModel {
                        "code": "ADMIN",
                        "display": "Administrative",
                        "system": "http://terminology.hl7.org/CodeSystem/contactentity-type",
                        "version": "4.0.1",
                      },
                    ],
                    "text": "Organization Contact Purpose",
                  },
                  "telecom": [
                    ContactPointModel {
                      "extension": undefined,
                      "system": "phone",
                      "use": "work",
                      "value": "0041616881111",
                    },
                    ContactPointModel {
                      "extension": undefined,
                      "system": "email",
                      "use": "work",
                      "value": "global.rochegenentechtrials@roche.com",
                    },
                  ],
                },
              ],
              "id": "2022-500014-26-00-primary-sponsor",
              "identifier": undefined,
              "name": "F. Hoffmann-La Roche AG",
              "resourceType": "Organization",
              "telecom": undefined,
              "type": [
                CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": "crs",
                      "display": "Clinical Research Sponsor",
                      "system": "http://terminology.hl7.org/CodeSystem/organization-type",
                      "version": "4.0.1",
                    },
                  ],
                  "text": "Organization Sponsor Type",
                },
              ],
            },
            OrganizationModel {
              "address": [
                AddressModel {
                  "city": "INDISPONIBLE",
                  "country": "INDISPONIBLE",
                  "line": [
                    "INDISPONIBLE",
                  ],
                  "postalCode": "INDISPONIBLE",
                  "type": "physical",
                  "use": "work",
                },
              ],
              "contact": [
                OrganizationContactModel {
                  "name": HumanNameModel {
                    "family": "INDISPONIBLE",
                    "given": [
                      "INDISPONIBLE",
                    ],
                    "prefix": undefined,
                    "use": "official",
                  },
                  "purpose": CodeableConceptModel {
                    "coding": [
                      CodingModel {
                        "code": "ADMIN",
                        "display": "Administrative",
                        "system": "http://terminology.hl7.org/CodeSystem/contactentity-type",
                        "version": "4.0.1",
                      },
                    ],
                    "text": "Organization Contact Purpose",
                  },
                  "telecom": [
                    ContactPointModel {
                      "extension": undefined,
                      "system": "phone",
                      "use": "work",
                      "value": "INDISPONIBLE",
                    },
                    ContactPointModel {
                      "extension": undefined,
                      "system": "email",
                      "use": "work",
                      "value": "INDISPONIBLE",
                    },
                  ],
                },
              ],
              "id": "2022-500014-26-00-secondary-sponsor",
              "identifier": undefined,
              "name": "INDISPONIBLE",
              "resourceType": "Organization",
              "telecom": undefined,
              "type": [
                CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": "crs",
                      "display": "Clinical Research Sponsor",
                      "system": "http://terminology.hl7.org/CodeSystem/organization-type",
                      "version": "4.0.1",
                    },
                  ],
                  "text": "Organization Sponsor Type",
                },
              ],
            },
            OrganizationModel {
              "address": undefined,
              "contact": undefined,
              "id": "ctis",
              "identifier": undefined,
              "name": "Clinical Trials Information System",
              "resourceType": "Organization",
              "telecom": [
                ContactPointModel {
                  "extension": undefined,
                  "system": "url",
                  "use": "work",
                  "value": "https://euclinicaltrials.eu/",
                },
              ],
              "type": undefined,
            },
          ],
        },
        "resourceType": "ResearchStudy",
        "site": [
          ReferenceModel {
            "display": "Reference to site",
            "reference": "Location/0-ctis-site",
            "type": "Location",
          },
        ],
        "sponsor": ReferenceModel {
          "display": "Reference to primary sponsor",
          "reference": "Organization/2022-500014-26-00-primary-sponsor",
          "type": "Organization",
        },
        "status": "active",
        "title": "A PHASE III, RANDOMIZED, OPEN-LABEL STUDY EVALUATING THE EFFICACY AND SAFETY OF GIREDESTRANT IN COMBINATION WITH PHESGO VERSUS PHESGO AFTER INDUCTION THERAPY WITH PHESGO+TAXANE IN PATIENTS WITH PREVIOUSLY UNTREATED HER2-POSITIVE, ESTROGEN RECEPTOR-POSITIVE LOCALLY-ADVANCED OR METASTATIC BREAST CANCER",
      }
    `)
  })

  it('should build a CTIS research study model, when RIPH CTIS with null fields is given', () => {
    // GIVEN
    vi.useFakeTimers()
    vi.setSystemTime(new Date(2022, 0, 1))
    const researchStudyDtoWithEmptyFields = riphCtisDto[1]

    // WHEN
    const researchStudyModel = RiphCtisResearchStudyModelFactory.create(researchStudyDtoWithEmptyFields)

    // THEN
    expect(researchStudyModel).toMatchInlineSnapshot(`
      ResearchStudyModel {
        "category": [
          CodeableConceptModel {
            "coding": [
              CodingModel {
                "code": undefined,
                "display": "REG536",
                "system": undefined,
                "version": undefined,
              },
            ],
            "text": "Regulation Code",
          },
        ],
        "condition": [
          CodeableConceptModel {
            "coding": [
              CodingModel {
                "code": undefined,
                "display": "",
                "system": undefined,
                "version": undefined,
              },
            ],
            "text": "Disease Condition",
          },
          CodeableConceptModel {
            "coding": [],
            "text": "MedDRA Condition",
          },
        ],
        "contact": [
          ContactDetailModel {
            "extension": undefined,
            "name": " ",
            "telecom": [
              ContactPointModel {
                "extension": undefined,
                "system": "phone",
                "use": "work",
                "value": "",
              },
              ContactPointModel {
                "extension": undefined,
                "system": "email",
                "use": "work",
                "value": "",
              },
            ],
          },
          ContactDetailModel {
            "extension": [
              ExtensionModel {
                "extension": undefined,
                "url": "https://interop.esante.gouv.fr/ig/fhir/eclaire/StructureDefinition/eclaire-contact-type",
                "valueCodeableConcept": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": "SCI",
                      "display": "Scientifique / Scientific",
                      "system": "https://interop.esante.gouv.fr/ig/fhir/eclaire/CodeSystem/eclaire-type-contact-code-system",
                      "version": "0.1.0",
                    },
                  ],
                  "text": "Contact Type",
                },
                "valueHumanName": undefined,
                "valueInstant": undefined,
                "valuePeriod": undefined,
                "valueReference": undefined,
                "valueString": undefined,
              },
            ],
            "name": "INDISPONIBLE INDISPONIBLE",
            "telecom": [
              ContactPointModel {
                "extension": undefined,
                "system": "phone",
                "use": "work",
                "value": "INDISPONIBLE",
              },
              ContactPointModel {
                "extension": undefined,
                "system": "email",
                "use": "work",
                "value": "INDISPONIBLE",
              },
            ],
          },
          ContactDetailModel {
            "extension": [
              ExtensionModel {
                "extension": undefined,
                "url": "https://interop.esante.gouv.fr/ig/fhir/eclaire/StructureDefinition/eclaire-contact-type",
                "valueCodeableConcept": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": "PUB",
                      "display": "Publique / Public",
                      "system": "https://interop.esante.gouv.fr/ig/fhir/eclaire/CodeSystem/eclaire-type-contact-code-system",
                      "version": "0.1.0",
                    },
                  ],
                  "text": "Contact Type",
                },
                "valueHumanName": undefined,
                "valueInstant": undefined,
                "valuePeriod": undefined,
                "valueReference": undefined,
                "valueString": undefined,
              },
            ],
            "name": "INDISPONIBLE INDISPONIBLE",
            "telecom": [
              ContactPointModel {
                "extension": undefined,
                "system": "phone",
                "use": "work",
                "value": "INDISPONIBLE",
              },
              ContactPointModel {
                "extension": undefined,
                "system": "email",
                "use": "work",
                "value": "INDISPONIBLE",
              },
            ],
          },
        ],
        "contained": [
          GroupModel {
            "actual": true,
            "characteristic": [
              GroupCharacteristicModel {
                "code": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": undefined,
                      "display": "INDISPONIBLE",
                      "system": undefined,
                      "version": undefined,
                    },
                  ],
                  "text": "Group characteristic code",
                },
                "exclude": false,
                "valueBoolean": undefined,
                "valueCodeableConcept": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": "unknown",
                      "display": "Unknown",
                      "system": "http://hl7.org/fhir/administrative-gender",
                      "version": "5.0.0",
                    },
                  ],
                  "text": "Genders",
                },
                "valueQuantity": undefined,
                "valueRange": undefined,
                "valueReference": undefined,
              },
              GroupCharacteristicModel {
                "code": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": undefined,
                      "display": "INDISPONIBLE",
                      "system": undefined,
                      "version": undefined,
                    },
                  ],
                  "text": "Group characteristic code",
                },
                "exclude": false,
                "valueBoolean": undefined,
                "valueCodeableConcept": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": undefined,
                      "display": "",
                      "system": undefined,
                      "version": undefined,
                    },
                  ],
                  "text": "Research Study Group Category",
                },
                "valueQuantity": undefined,
                "valueRange": undefined,
                "valueReference": undefined,
              },
              GroupCharacteristicModel {
                "code": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": undefined,
                      "display": "INDISPONIBLE",
                      "system": undefined,
                      "version": undefined,
                    },
                  ],
                  "text": "Group characteristic code",
                },
                "exclude": false,
                "valueBoolean": undefined,
                "valueCodeableConcept": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": undefined,
                      "display": "",
                      "system": undefined,
                      "version": undefined,
                    },
                  ],
                  "text": "Study Population",
                },
                "valueQuantity": undefined,
                "valueRange": undefined,
                "valueReference": undefined,
              },
              GroupCharacteristicModel {
                "code": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": undefined,
                      "display": "INDISPONIBLE",
                      "system": undefined,
                      "version": undefined,
                    },
                  ],
                  "text": "Group characteristic code",
                },
                "exclude": false,
                "valueBoolean": undefined,
                "valueCodeableConcept": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": undefined,
                      "display": "INDISPONIBLE",
                      "system": undefined,
                      "version": undefined,
                    },
                  ],
                  "text": "Study Inclusion Criteria",
                },
                "valueQuantity": undefined,
                "valueRange": undefined,
                "valueReference": undefined,
              },
              GroupCharacteristicModel {
                "code": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": undefined,
                      "display": "INDISPONIBLE",
                      "system": undefined,
                      "version": undefined,
                    },
                  ],
                  "text": "Group characteristic code",
                },
                "exclude": true,
                "valueBoolean": undefined,
                "valueCodeableConcept": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": undefined,
                      "display": "INDISPONIBLE",
                      "system": undefined,
                      "version": undefined,
                    },
                  ],
                  "text": "Study Exclusion Criteria",
                },
                "valueQuantity": undefined,
                "valueRange": undefined,
                "valueReference": undefined,
              },
            ],
            "id": "2022-500299-71-00-enrollment-group-id",
            "quantity": undefined,
            "resourceType": "Group",
            "type": "person",
          },
        ],
        "description": "INDISPONIBLE",
        "enrollment": [
          ReferenceModel {
            "display": "Reference to group detailing study characteristics",
            "reference": "#2022-500299-71-00-enrollment-group-id",
            "type": "Group",
          },
        ],
        "extension": [
          ExtensionModel {
            "extension": undefined,
            "url": "https://interop.esante.gouv.fr/ig/fhir/eclaire/StructureDefinition/eclaire-secondary-sponsor",
            "valueCodeableConcept": undefined,
            "valueHumanName": undefined,
            "valueInstant": undefined,
            "valuePeriod": undefined,
            "valueReference": ReferenceModel {
              "display": "Reference to secondary sponsor",
              "reference": "Organization/2022-500299-71-00-secondary-sponsor",
              "type": "Organization",
            },
            "valueString": undefined,
          },
          ExtensionModel {
            "extension": undefined,
            "url": "https://interop.esante.gouv.fr/ig/fhir/eclaire/StructureDefinition/eclaire-therapeutic-area",
            "valueCodeableConcept": undefined,
            "valueHumanName": undefined,
            "valueInstant": undefined,
            "valuePeriod": undefined,
            "valueReference": undefined,
            "valueString": "",
          },
          ExtensionModel {
            "extension": [
              ExtensionModel {
                "extension": undefined,
                "url": "labelValue",
                "valueCodeableConcept": undefined,
                "valueHumanName": undefined,
                "valueInstant": undefined,
                "valuePeriod": undefined,
                "valueReference": undefined,
                "valueString": "INDISPONIBLE",
              },
              ExtensionModel {
                "extension": undefined,
                "url": "labelType",
                "valueCodeableConcept": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": "human-use",
                      "display": "Human use",
                      "system": "http://hl7.org/fhir/title-type",
                      "version": "5.0.0",
                    },
                  ],
                  "text": "Label Type",
                },
                "valueHumanName": undefined,
                "valueInstant": undefined,
                "valuePeriod": undefined,
                "valueReference": undefined,
                "valueString": undefined,
              },
            ],
            "url": "https://interop.esante.gouv.fr/ig/fhir/eclaire/StructureDefinition/eclaire-label",
            "valueCodeableConcept": undefined,
            "valueHumanName": undefined,
            "valueInstant": undefined,
            "valuePeriod": undefined,
            "valueReference": undefined,
            "valueString": undefined,
          },
          ExtensionModel {
            "extension": [
              ExtensionModel {
                "extension": undefined,
                "url": "labelValue",
                "valueCodeableConcept": undefined,
                "valueHumanName": undefined,
                "valueInstant": undefined,
                "valuePeriod": undefined,
                "valueReference": undefined,
                "valueString": "INDISPONIBLE",
              },
              ExtensionModel {
                "extension": undefined,
                "url": "labelType",
                "valueCodeableConcept": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": "acronym",
                      "display": "Acronym",
                      "system": "http://hl7.org/fhir/title-type",
                      "version": "5.0.0",
                    },
                  ],
                  "text": "Label Type",
                },
                "valueHumanName": undefined,
                "valueInstant": undefined,
                "valuePeriod": undefined,
                "valueReference": undefined,
                "valueString": undefined,
              },
            ],
            "url": "https://interop.esante.gouv.fr/ig/fhir/eclaire/StructureDefinition/eclaire-label",
            "valueCodeableConcept": undefined,
            "valueHumanName": undefined,
            "valueInstant": undefined,
            "valuePeriod": undefined,
            "valueReference": undefined,
            "valueString": undefined,
          },
          ExtensionModel {
            "extension": undefined,
            "url": "https://interop.esante.gouv.fr/ig/fhir/eclaire/StructureDefinition/eclaire-recruitment-period",
            "valueCodeableConcept": undefined,
            "valueHumanName": undefined,
            "valueInstant": undefined,
            "valuePeriod": PeriodModel {
              "end": undefined,
              "start": "1970-01-01T00:00:00.000Z",
            },
            "valueReference": undefined,
            "valueString": undefined,
          },
          ExtensionModel {
            "extension": undefined,
            "url": "https://interop.esante.gouv.fr/ig/fhir/eclaire/StructureDefinition/eclaire-review-date",
            "valueCodeableConcept": undefined,
            "valueHumanName": undefined,
            "valueInstant": "2021-12-31T23:00:00.000Z",
            "valuePeriod": undefined,
            "valueReference": undefined,
            "valueString": undefined,
          },
        ],
        "id": "2022-500299-71-00",
        "identifier": [
          IdentifierModel {
            "assigner": ReferenceModel {
              "display": "Reference to primary assigner",
              "reference": undefined,
              "type": "Organization",
            },
            "use": "official",
            "value": "INDISPONIBLE",
          },
          IdentifierModel {
            "assigner": ReferenceModel {
              "display": "Reference to secondary assigner",
              "reference": "Organization/ctis",
              "type": "Organization",
            },
            "use": "secondary",
            "value": "2022-500299-71-00",
          },
        ],
        "location": undefined,
        "meta": MetaModel {
          "lastUpdated": "2021-12-31T23:00:00.000Z",
          "profile": [
            "https://interop.esante.gouv.fr/ig/fhir/eclaire/StructureDefinition/eclaire-researchstudy",
          ],
        },
        "phase": CodeableConceptModel {
          "coding": [
            CodingModel {
              "code": "n-a",
              "display": "N/A",
              "system": "http://terminology.hl7.org/CodeSystem/research-study-phase",
              "version": "4.0.1",
            },
          ],
          "text": "Research Study Phase",
        },
        "referenceContents": ReferenceContentsModel {
          "locations": [
            LocationModel {
              "address": AddressModel {
                "city": "",
                "country": undefined,
                "line": [
                  "",
                  "",
                ],
                "postalCode": undefined,
                "type": "physical",
                "use": "work",
              },
              "id": "0-ctis-site",
              "identifier": [
                IdentifierModel {
                  "assigner": undefined,
                  "use": "official",
                  "value": "0-ctis-site",
                },
              ],
              "name": "",
              "resourceType": "Location",
              "telecom": [
                ContactPointModel {
                  "extension": [
                    ExtensionModel {
                      "extension": undefined,
                      "url": "https://interop.esante.gouv.fr/ig/fhir/eclaire/StructureDefinition/eclaire-site-contact-name",
                      "valueCodeableConcept": undefined,
                      "valueHumanName": HumanNameModel {
                        "family": "",
                        "given": [
                          "",
                        ],
                        "prefix": [
                          "",
                        ],
                        "use": "official",
                      },
                      "valueInstant": undefined,
                      "valuePeriod": undefined,
                      "valueReference": undefined,
                      "valueString": undefined,
                    },
                  ],
                  "system": undefined,
                  "use": "work",
                  "value": undefined,
                },
              ],
            },
          ],
          "organizations": [
            OrganizationModel {
              "address": [
                AddressModel {
                  "city": "",
                  "country": "",
                  "line": [
                    "",
                  ],
                  "postalCode": "",
                  "type": "physical",
                  "use": "work",
                },
              ],
              "contact": [
                OrganizationContactModel {
                  "name": HumanNameModel {
                    "family": "",
                    "given": [
                      "",
                    ],
                    "prefix": undefined,
                    "use": "official",
                  },
                  "purpose": CodeableConceptModel {
                    "coding": [
                      CodingModel {
                        "code": "ADMIN",
                        "display": "Administrative",
                        "system": "http://terminology.hl7.org/CodeSystem/contactentity-type",
                        "version": "4.0.1",
                      },
                    ],
                    "text": "Organization Contact Purpose",
                  },
                  "telecom": [
                    ContactPointModel {
                      "extension": undefined,
                      "system": "phone",
                      "use": "work",
                      "value": "",
                    },
                    ContactPointModel {
                      "extension": undefined,
                      "system": "email",
                      "use": "work",
                      "value": "",
                    },
                  ],
                },
              ],
              "id": "2022-500299-71-00-primary-sponsor",
              "identifier": undefined,
              "name": "",
              "resourceType": "Organization",
              "telecom": undefined,
              "type": [
                CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": "crs",
                      "display": "Clinical Research Sponsor",
                      "system": "http://terminology.hl7.org/CodeSystem/organization-type",
                      "version": "4.0.1",
                    },
                  ],
                  "text": "Organization Sponsor Type",
                },
              ],
            },
            OrganizationModel {
              "address": [
                AddressModel {
                  "city": "INDISPONIBLE",
                  "country": "INDISPONIBLE",
                  "line": [
                    "INDISPONIBLE",
                  ],
                  "postalCode": "INDISPONIBLE",
                  "type": "physical",
                  "use": "work",
                },
              ],
              "contact": [
                OrganizationContactModel {
                  "name": HumanNameModel {
                    "family": "INDISPONIBLE",
                    "given": [
                      "INDISPONIBLE",
                    ],
                    "prefix": undefined,
                    "use": "official",
                  },
                  "purpose": CodeableConceptModel {
                    "coding": [
                      CodingModel {
                        "code": "ADMIN",
                        "display": "Administrative",
                        "system": "http://terminology.hl7.org/CodeSystem/contactentity-type",
                        "version": "4.0.1",
                      },
                    ],
                    "text": "Organization Contact Purpose",
                  },
                  "telecom": [
                    ContactPointModel {
                      "extension": undefined,
                      "system": "phone",
                      "use": "work",
                      "value": "INDISPONIBLE",
                    },
                    ContactPointModel {
                      "extension": undefined,
                      "system": "email",
                      "use": "work",
                      "value": "INDISPONIBLE",
                    },
                  ],
                },
              ],
              "id": "2022-500299-71-00-secondary-sponsor",
              "identifier": undefined,
              "name": "INDISPONIBLE",
              "resourceType": "Organization",
              "telecom": undefined,
              "type": [
                CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": "crs",
                      "display": "Clinical Research Sponsor",
                      "system": "http://terminology.hl7.org/CodeSystem/organization-type",
                      "version": "4.0.1",
                    },
                  ],
                  "text": "Organization Sponsor Type",
                },
              ],
            },
            OrganizationModel {
              "address": undefined,
              "contact": undefined,
              "id": "ctis",
              "identifier": undefined,
              "name": "Clinical Trials Information System",
              "resourceType": "Organization",
              "telecom": [
                ContactPointModel {
                  "extension": undefined,
                  "system": "url",
                  "use": "work",
                  "value": "https://euclinicaltrials.eu/",
                },
              ],
              "type": undefined,
            },
          ],
        },
        "resourceType": "ResearchStudy",
        "site": [
          ReferenceModel {
            "display": "Reference to site",
            "reference": "Location/0-ctis-site",
            "type": "Location",
          },
        ],
        "sponsor": ReferenceModel {
          "display": "Reference to primary sponsor",
          "reference": "Organization/2022-500299-71-00-primary-sponsor",
          "type": "Organization",
        },
        "status": "approved",
        "title": "",
      }
    `)
  })
})
