import { RiphDmResearchStudyModelFactory } from './RiphDmResearchStudyModelFactory'
import { riphDmDto } from '../shared/test/helpers/elasticsearchHelper'

describe('dm research study model factory', () => {
  it('should build a DM research study model, when RIPH DM with all fields filled is given', () => {
    // GIVEN
    vi.useFakeTimers()
    vi.setSystemTime(new Date(2022, 0, 1))
    const normalResearchStudyDto = riphDmDto[0]

    // WHEN
    const researchStudyModel = RiphDmResearchStudyModelFactory.create(normalResearchStudyDto)

    // THEN
    expect(researchStudyModel).toMatchInlineSnapshot(`
      ResearchStudyModel {
        "category": [
          CodeableConceptModel {
            "coding": [
              CodingModel {
                "code": undefined,
                "display": "REG745",
                "id": undefined,
                "system": undefined,
                "userSelected": undefined,
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
                "display": "INDISPONIBLE",
                "id": undefined,
                "system": undefined,
                "userSelected": undefined,
                "version": undefined,
              },
            ],
            "text": "Disease Condition",
          },
          CodeableConceptModel {
            "coding": [
              CodingModel {
                "code": "INDISPONIBLE",
                "display": "MedDRA",
                "id": undefined,
                "system": "http://terminology.hl7.org/CodeSystem/mdr",
                "userSelected": undefined,
                "version": "2.0.1",
              },
            ],
            "text": "MedDRA Condition",
          },
        ],
        "contact": [
          ContactDetailModel {
            "extension": undefined,
            "name": "Olivier D'HONDT",
            "telecom": [
              ContactPointModel {
                "extension": undefined,
                "id": undefined,
                "period": undefined,
                "rank": undefined,
                "system": "phone",
                "use": "work",
                "value": "INDISPONIBLE",
              },
              ContactPointModel {
                "extension": undefined,
                "id": undefined,
                "period": undefined,
                "rank": undefined,
                "system": "email",
                "use": "work",
                "value": "cdp_scs@soladis.fr",
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
                      "id": undefined,
                      "system": "https://interop.esante.gouv.fr/ig/fhir/eclaire/CodeSystem/eclaire-type-contact-code-system",
                      "userSelected": undefined,
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
                "id": undefined,
                "period": undefined,
                "rank": undefined,
                "system": "phone",
                "use": "work",
                "value": "INDISPONIBLE",
              },
              ContactPointModel {
                "extension": undefined,
                "id": undefined,
                "period": undefined,
                "rank": undefined,
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
                      "id": undefined,
                      "system": "https://interop.esante.gouv.fr/ig/fhir/eclaire/CodeSystem/eclaire-type-contact-code-system",
                      "userSelected": undefined,
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
                "id": undefined,
                "period": undefined,
                "rank": undefined,
                "system": "phone",
                "use": "work",
                "value": "INDISPONIBLE",
              },
              ContactPointModel {
                "extension": undefined,
                "id": undefined,
                "period": undefined,
                "rank": undefined,
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
                      "id": undefined,
                      "system": undefined,
                      "userSelected": undefined,
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
                      "display": undefined,
                      "id": undefined,
                      "system": "http://hl7.org/fhir/administrative-gender",
                      "userSelected": undefined,
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
                      "id": undefined,
                      "system": undefined,
                      "userSelected": undefined,
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
                  "low": undefined,
                },
                "valueReference": undefined,
              },
              GroupCharacteristicModel {
                "code": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": undefined,
                      "display": "INDISPONIBLE",
                      "id": undefined,
                      "system": undefined,
                      "userSelected": undefined,
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
                      "id": undefined,
                      "system": undefined,
                      "userSelected": undefined,
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
                      "id": undefined,
                      "system": undefined,
                      "userSelected": undefined,
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
                      "id": undefined,
                      "system": undefined,
                      "userSelected": undefined,
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
                      "id": undefined,
                      "system": undefined,
                      "userSelected": undefined,
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
                      "id": undefined,
                      "system": undefined,
                      "userSelected": undefined,
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
                      "id": undefined,
                      "system": undefined,
                      "userSelected": undefined,
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
                      "id": undefined,
                      "system": undefined,
                      "userSelected": undefined,
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
            "id": "2021-A01563-38-enrollment-group-id",
            "quantity": 96,
            "resourceType": "Group",
            "type": "person",
          },
        ],
        "description": "INDISPONIBLE",
        "enrollment": [
          ReferenceModel {
            "display": "Reference to group detailing study characteristics",
            "reference": "#2021-A01563-38-enrollment-group-id",
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
              "reference": "Organization/2021-A01563-38-secondary-sponsor",
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
            "valueString": "Hépato-gastro-entérologie",
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
                      "id": undefined,
                      "system": "http://hl7.org/fhir/title-type",
                      "userSelected": undefined,
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
                      "id": undefined,
                      "system": "http://hl7.org/fhir/title-type",
                      "userSelected": undefined,
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
            "url": "https://interop.esante.gouv.fr/ig/fhir/eclaire/StructureDefinition/eclaire-review-date",
            "valueCodeableConcept": undefined,
            "valueHumanName": undefined,
            "valueInstant": "2023-04-06T00:00:00.000Z",
            "valuePeriod": undefined,
            "valueReference": undefined,
            "valueString": undefined,
          },
        ],
        "id": "2021-A01563-38",
        "identifier": [
          IdentifierModel {
            "assigner": ReferenceModel {
              "display": "Reference to primary assigner",
              "reference": undefined,
              "type": "Organization",
            },
            "id": undefined,
            "period": undefined,
            "system": undefined,
            "type": undefined,
            "use": "official",
            "value": "INDISPONIBLE",
          },
          IdentifierModel {
            "assigner": ReferenceModel {
              "display": "Reference to secondary assigner",
              "reference": "Organization/ansm",
              "type": "Organization",
            },
            "id": undefined,
            "period": undefined,
            "system": undefined,
            "type": undefined,
            "use": "secondary",
            "value": "2021-A01563-38",
          },
        ],
        "location": undefined,
        "meta": MetaModel {
          "lastUpdated": "2023-04-06T00:00:00.000Z",
          "profile": [
            "https://interop.esante.gouv.fr/ig/fhir/eclaire/StructureDefinition/eclaire-researchstudy",
          ],
        },
        "phase": CodeableConceptModel {
          "coding": [
            CodingModel {
              "code": "n-a",
              "display": "N/A",
              "id": undefined,
              "system": "http://terminology.hl7.org/CodeSystem/research-study-phase",
              "userSelected": undefined,
              "version": "4.0.1",
            },
          ],
          "text": "Research Study Phase",
        },
        "referenceContents": ReferenceContentsModel {
          "locations": undefined,
          "organizations": [
            OrganizationModel {
              "address": [
                AddressModel {
                  "city": "Roubaix",
                  "country": "France",
                  "line": [
                    "15 Boulevard du Général Leclerc",
                  ],
                  "postalCode": "59100",
                  "type": "physical",
                  "use": "work",
                },
              ],
              "contact": [
                OrganizationContactModel {
                  "name": HumanNameModel {
                    "family": "D'HONDT",
                    "given": [
                      "Olivier",
                    ],
                    "id": undefined,
                    "period": undefined,
                    "prefix": undefined,
                    "suffix": undefined,
                    "text": undefined,
                    "use": "official",
                  },
                  "purpose": CodeableConceptModel {
                    "coding": [
                      CodingModel {
                        "code": "ADMIN",
                        "display": "Administrative",
                        "id": undefined,
                        "system": "http://terminology.hl7.org/CodeSystem/contactentity-type",
                        "userSelected": undefined,
                        "version": "4.0.1",
                      },
                    ],
                    "text": "Organization Contact Purpose",
                  },
                  "telecom": [
                    ContactPointModel {
                      "extension": undefined,
                      "id": undefined,
                      "period": undefined,
                      "rank": undefined,
                      "system": "phone",
                      "use": "work",
                      "value": "INDISPONIBLE",
                    },
                    ContactPointModel {
                      "extension": undefined,
                      "id": undefined,
                      "period": undefined,
                      "rank": undefined,
                      "system": "email",
                      "use": "work",
                      "value": "cdp_scs@soladis.fr",
                    },
                  ],
                },
              ],
              "id": "2021-A01563-38-primary-sponsor",
              "identifier": undefined,
              "name": "Promoteur institutionnel",
              "resourceType": "Organization",
              "telecom": undefined,
              "type": [
                CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": "crs",
                      "display": "Clinical Research Sponsor",
                      "id": undefined,
                      "system": "http://terminology.hl7.org/CodeSystem/organization-type",
                      "userSelected": undefined,
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
                    "id": undefined,
                    "period": undefined,
                    "prefix": undefined,
                    "suffix": undefined,
                    "text": undefined,
                    "use": "official",
                  },
                  "purpose": CodeableConceptModel {
                    "coding": [
                      CodingModel {
                        "code": "ADMIN",
                        "display": "Administrative",
                        "id": undefined,
                        "system": "http://terminology.hl7.org/CodeSystem/contactentity-type",
                        "userSelected": undefined,
                        "version": "4.0.1",
                      },
                    ],
                    "text": "Organization Contact Purpose",
                  },
                  "telecom": [
                    ContactPointModel {
                      "extension": undefined,
                      "id": undefined,
                      "period": undefined,
                      "rank": undefined,
                      "system": "phone",
                      "use": "work",
                      "value": "INDISPONIBLE",
                    },
                    ContactPointModel {
                      "extension": undefined,
                      "id": undefined,
                      "period": undefined,
                      "rank": undefined,
                      "system": "email",
                      "use": "work",
                      "value": "INDISPONIBLE",
                    },
                  ],
                },
              ],
              "id": "2021-A01563-38-secondary-sponsor",
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
                      "id": undefined,
                      "system": "http://terminology.hl7.org/CodeSystem/organization-type",
                      "userSelected": undefined,
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
              "id": "ansm",
              "identifier": undefined,
              "name": "Agence nationale de sécurité du médicament et des produits de santé",
              "resourceType": "Organization",
              "telecom": [
                ContactPointModel {
                  "extension": undefined,
                  "id": undefined,
                  "period": undefined,
                  "rank": undefined,
                  "system": "url",
                  "use": "work",
                  "value": "https://ansm.sante.fr",
                },
              ],
              "type": undefined,
            },
          ],
        },
        "resourceType": "ResearchStudy",
        "site": undefined,
        "sponsor": ReferenceModel {
          "display": "Reference to primary sponsor",
          "reference": "Organization/2021-A01563-38-primary-sponsor",
          "type": "Organization",
        },
        "status": "administratively-completed",
        "title": "ÉVALUATION DU DISPOSITIF MEDICAL ENDOTRAP POUR LA PROTECTION DU PERSONNEL DU BLOC OPERATOIRE CONTRE LES PARTICULES MICROBIENNES PENDANT L'ENDOSCOPIE DIGESTIVE HAUTE ",
      }
    `)
  })

  it('should build a DM research study model, when RIPH DM with null fields is given', () => {
    // GIVEN
    vi.useFakeTimers()
    vi.setSystemTime(new Date(2022, 0, 1))
    const researchStudyDtoWithEmptyFields = riphDmDto[1]

    // WHEN
    const researchStudyModel = RiphDmResearchStudyModelFactory.create(researchStudyDtoWithEmptyFields)

    // THEN
    expect(researchStudyModel).toMatchInlineSnapshot(`
      ResearchStudyModel {
        "category": [
          CodeableConceptModel {
            "coding": [
              CodingModel {
                "code": undefined,
                "display": "REG745",
                "id": undefined,
                "system": undefined,
                "userSelected": undefined,
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
                "display": "INDISPONIBLE",
                "id": undefined,
                "system": undefined,
                "userSelected": undefined,
                "version": undefined,
              },
            ],
            "text": "Disease Condition",
          },
          CodeableConceptModel {
            "coding": [
              CodingModel {
                "code": "INDISPONIBLE",
                "display": "MedDRA",
                "id": undefined,
                "system": "http://terminology.hl7.org/CodeSystem/mdr",
                "userSelected": undefined,
                "version": "2.0.1",
              },
            ],
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
                "id": undefined,
                "period": undefined,
                "rank": undefined,
                "system": "phone",
                "use": "work",
                "value": "INDISPONIBLE",
              },
              ContactPointModel {
                "extension": undefined,
                "id": undefined,
                "period": undefined,
                "rank": undefined,
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
                      "id": undefined,
                      "system": "https://interop.esante.gouv.fr/ig/fhir/eclaire/CodeSystem/eclaire-type-contact-code-system",
                      "userSelected": undefined,
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
                "id": undefined,
                "period": undefined,
                "rank": undefined,
                "system": "phone",
                "use": "work",
                "value": "INDISPONIBLE",
              },
              ContactPointModel {
                "extension": undefined,
                "id": undefined,
                "period": undefined,
                "rank": undefined,
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
                      "id": undefined,
                      "system": "https://interop.esante.gouv.fr/ig/fhir/eclaire/CodeSystem/eclaire-type-contact-code-system",
                      "userSelected": undefined,
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
                "id": undefined,
                "period": undefined,
                "rank": undefined,
                "system": "phone",
                "use": "work",
                "value": "INDISPONIBLE",
              },
              ContactPointModel {
                "extension": undefined,
                "id": undefined,
                "period": undefined,
                "rank": undefined,
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
                      "id": undefined,
                      "system": undefined,
                      "userSelected": undefined,
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
                      "display": undefined,
                      "id": undefined,
                      "system": "http://hl7.org/fhir/administrative-gender",
                      "userSelected": undefined,
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
                      "id": undefined,
                      "system": undefined,
                      "userSelected": undefined,
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
                  "low": undefined,
                },
                "valueReference": undefined,
              },
              GroupCharacteristicModel {
                "code": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": undefined,
                      "display": "INDISPONIBLE",
                      "id": undefined,
                      "system": undefined,
                      "userSelected": undefined,
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
                      "id": undefined,
                      "system": undefined,
                      "userSelected": undefined,
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
                      "id": undefined,
                      "system": undefined,
                      "userSelected": undefined,
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
                      "id": undefined,
                      "system": undefined,
                      "userSelected": undefined,
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
                      "id": undefined,
                      "system": undefined,
                      "userSelected": undefined,
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
                      "id": undefined,
                      "system": undefined,
                      "userSelected": undefined,
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
                      "id": undefined,
                      "system": undefined,
                      "userSelected": undefined,
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
                      "id": undefined,
                      "system": undefined,
                      "userSelected": undefined,
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
            "id": "2021-A01563-39-enrollment-group-id",
            "quantity": undefined,
            "resourceType": "Group",
            "type": "person",
          },
        ],
        "description": "INDISPONIBLE",
        "enrollment": [
          ReferenceModel {
            "display": "Reference to group detailing study characteristics",
            "reference": "#2021-A01563-39-enrollment-group-id",
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
              "reference": "Organization/2021-A01563-39-secondary-sponsor",
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
                      "id": undefined,
                      "system": "http://hl7.org/fhir/title-type",
                      "userSelected": undefined,
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
                      "id": undefined,
                      "system": "http://hl7.org/fhir/title-type",
                      "userSelected": undefined,
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
            "url": "https://interop.esante.gouv.fr/ig/fhir/eclaire/StructureDefinition/eclaire-review-date",
            "valueCodeableConcept": undefined,
            "valueHumanName": undefined,
            "valueInstant": "2021-12-31T23:00:00.000Z",
            "valuePeriod": undefined,
            "valueReference": undefined,
            "valueString": undefined,
          },
        ],
        "id": "2021-A01563-39",
        "identifier": [
          IdentifierModel {
            "assigner": ReferenceModel {
              "display": "Reference to primary assigner",
              "reference": undefined,
              "type": "Organization",
            },
            "id": undefined,
            "period": undefined,
            "system": undefined,
            "type": undefined,
            "use": "official",
            "value": "INDISPONIBLE",
          },
          IdentifierModel {
            "assigner": ReferenceModel {
              "display": "Reference to secondary assigner",
              "reference": "Organization/ansm",
              "type": "Organization",
            },
            "id": undefined,
            "period": undefined,
            "system": undefined,
            "type": undefined,
            "use": "secondary",
            "value": "2021-A01563-39",
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
              "id": undefined,
              "system": "http://terminology.hl7.org/CodeSystem/research-study-phase",
              "userSelected": undefined,
              "version": "4.0.1",
            },
          ],
          "text": "Research Study Phase",
        },
        "referenceContents": ReferenceContentsModel {
          "locations": undefined,
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
                    "id": undefined,
                    "period": undefined,
                    "prefix": undefined,
                    "suffix": undefined,
                    "text": undefined,
                    "use": "official",
                  },
                  "purpose": CodeableConceptModel {
                    "coding": [
                      CodingModel {
                        "code": "ADMIN",
                        "display": "Administrative",
                        "id": undefined,
                        "system": "http://terminology.hl7.org/CodeSystem/contactentity-type",
                        "userSelected": undefined,
                        "version": "4.0.1",
                      },
                    ],
                    "text": "Organization Contact Purpose",
                  },
                  "telecom": [
                    ContactPointModel {
                      "extension": undefined,
                      "id": undefined,
                      "period": undefined,
                      "rank": undefined,
                      "system": "phone",
                      "use": "work",
                      "value": "INDISPONIBLE",
                    },
                    ContactPointModel {
                      "extension": undefined,
                      "id": undefined,
                      "period": undefined,
                      "rank": undefined,
                      "system": "email",
                      "use": "work",
                      "value": "",
                    },
                  ],
                },
              ],
              "id": "2021-A01563-39-primary-sponsor",
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
                      "id": undefined,
                      "system": "http://terminology.hl7.org/CodeSystem/organization-type",
                      "userSelected": undefined,
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
                    "id": undefined,
                    "period": undefined,
                    "prefix": undefined,
                    "suffix": undefined,
                    "text": undefined,
                    "use": "official",
                  },
                  "purpose": CodeableConceptModel {
                    "coding": [
                      CodingModel {
                        "code": "ADMIN",
                        "display": "Administrative",
                        "id": undefined,
                        "system": "http://terminology.hl7.org/CodeSystem/contactentity-type",
                        "userSelected": undefined,
                        "version": "4.0.1",
                      },
                    ],
                    "text": "Organization Contact Purpose",
                  },
                  "telecom": [
                    ContactPointModel {
                      "extension": undefined,
                      "id": undefined,
                      "period": undefined,
                      "rank": undefined,
                      "system": "phone",
                      "use": "work",
                      "value": "INDISPONIBLE",
                    },
                    ContactPointModel {
                      "extension": undefined,
                      "id": undefined,
                      "period": undefined,
                      "rank": undefined,
                      "system": "email",
                      "use": "work",
                      "value": "INDISPONIBLE",
                    },
                  ],
                },
              ],
              "id": "2021-A01563-39-secondary-sponsor",
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
                      "id": undefined,
                      "system": "http://terminology.hl7.org/CodeSystem/organization-type",
                      "userSelected": undefined,
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
              "id": "ansm",
              "identifier": undefined,
              "name": "Agence nationale de sécurité du médicament et des produits de santé",
              "resourceType": "Organization",
              "telecom": [
                ContactPointModel {
                  "extension": undefined,
                  "id": undefined,
                  "period": undefined,
                  "rank": undefined,
                  "system": "url",
                  "use": "work",
                  "value": "https://ansm.sante.fr",
                },
              ],
              "type": undefined,
            },
          ],
        },
        "resourceType": "ResearchStudy",
        "site": undefined,
        "sponsor": ReferenceModel {
          "display": "Reference to primary sponsor",
          "reference": "Organization/2021-A01563-39-primary-sponsor",
          "type": "Organization",
        },
        "status": "approved",
        "title": "",
      }
    `)
  })
})
