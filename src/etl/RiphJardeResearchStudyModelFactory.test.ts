import { RiphJardeResearchStudyModelFactory } from './RiphJardeResearchStudyModelFactory'
import { riphJardeDtoWithActiveStatus } from '../shared/test/helpers/elasticsearchHelper'

describe('jarde research study model factory', () => {
  it('should build a Jarde research study model, when RIPH Jarde with all fields filled is given', () => {
    // GIVEN
    vi.useFakeTimers()
    vi.setSystemTime(new Date(2022, 0, 1))
    const normalResearchStudyDto = riphJardeDtoWithActiveStatus[0]

    // WHEN
    const researchStudyModel = RiphJardeResearchStudyModelFactory.create(normalResearchStudyDto)

    // THEN
    expect(researchStudyModel).toMatchInlineSnapshot(`
      ResearchStudyModel {
        "category": [
          CodeableConceptModel {
            "coding": [
              CodingModel {
                "code": undefined,
                "display": "JARDE",
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
                "display": "INDISPONIBLE",
                "system": undefined,
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
            "name": "Christophe GILLET",
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
                "value": "christophe.gillet@uphf.fr",
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
                      "code": undefined,
                      "display": undefined,
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
                      "display": "INDISPONIBLE",
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
            "id": "2021-A01022-39-enrollment-group-id",
            "quantity": 23,
            "resourceType": "Group",
            "type": "person",
          },
        ],
        "description": "INDISPONIBLE",
        "enrollment": [
          ReferenceModel {
            "display": "Reference to group detailing study characteristics",
            "reference": "#2021-A01022-39-enrollment-group-id",
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
              "reference": "Organization/2021-A01022-39-secondary-sponsor",
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
            "valueString": "Autres",
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
            "url": "https://interop.esante.gouv.fr/ig/fhir/eclaire/StructureDefinition/eclaire-review-date",
            "valueCodeableConcept": undefined,
            "valueHumanName": undefined,
            "valueInstant": "2023-04-04T00:00:00.000Z",
            "valuePeriod": undefined,
            "valueReference": undefined,
            "valueString": undefined,
          },
        ],
        "id": "2021-A01022-39",
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
              "reference": "Organization/ansm",
              "type": "Organization",
            },
            "use": "secondary",
            "value": "2021-A01022-39",
          },
        ],
        "location": undefined,
        "meta": MetaModel {
          "lastUpdated": "2023-04-04T00:00:00.000Z",
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
          "locations": undefined,
          "organizations": [
            OrganizationModel {
              "address": [
                AddressModel {
                  "city": "Valenciennes",
                  "country": "France",
                  "line": [
                    "LAMIH - Campus du Mont-Houy",
                  ],
                  "postalCode": "59313",
                  "type": "physical",
                  "use": "work",
                },
              ],
              "contact": [
                OrganizationContactModel {
                  "name": HumanNameModel {
                    "family": "GILLET",
                    "given": [
                      "Christophe",
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
                      "value": "christophe.gillet@uphf.fr",
                    },
                  ],
                },
              ],
              "id": "2021-A01022-39-primary-sponsor",
              "identifier": undefined,
              "name": "Université Polytechnique Hauts-de-France",
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
              "id": "2021-A01022-39-secondary-sponsor",
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
              "id": "ansm",
              "identifier": undefined,
              "name": "Agence nationale de sécurité du médicament et des produits de santé",
              "resourceType": "Organization",
              "telecom": [
                ContactPointModel {
                  "extension": undefined,
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
          "reference": "Organization/2021-A01022-39-primary-sponsor",
          "type": "Organization",
        },
        "status": "active",
        "title": "Détermination des paramètres biomécaniques et fonctionnels de la locomotion des enfants en fonction des conditions de chaussage.",
      }
    `)
  })

  it('should build a Jarde research study model, when RIPH Jarde with null fields is given', () => {
    // GIVEN
    vi.useFakeTimers()
    vi.setSystemTime(new Date(2022, 0, 1))
    const researchStudyDtoWithEmptyFields = riphJardeDtoWithActiveStatus[1]

    // WHEN
    const researchStudyModel = RiphJardeResearchStudyModelFactory.create(researchStudyDtoWithEmptyFields)

    // THEN
    expect(researchStudyModel).toMatchInlineSnapshot(`
      ResearchStudyModel {
        "category": [
          CodeableConceptModel {
            "coding": [
              CodingModel {
                "code": undefined,
                "display": "JARDE",
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
                "display": "INDISPONIBLE",
                "system": undefined,
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
            "name": " ",
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
                      "code": undefined,
                      "display": undefined,
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
                      "display": "INDISPONIBLE",
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
            "id": "2021-A01022-39-enrollment-group-id",
            "quantity": undefined,
            "resourceType": "Group",
            "type": "person",
          },
        ],
        "description": "INDISPONIBLE",
        "enrollment": [
          ReferenceModel {
            "display": "Reference to group detailing study characteristics",
            "reference": "#2021-A01022-39-enrollment-group-id",
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
              "reference": "Organization/2021-A01022-39-secondary-sponsor",
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
            "url": "https://interop.esante.gouv.fr/ig/fhir/eclaire/StructureDefinition/eclaire-review-date",
            "valueCodeableConcept": undefined,
            "valueHumanName": undefined,
            "valueInstant": "2021-12-31T23:00:00.000Z",
            "valuePeriod": undefined,
            "valueReference": undefined,
            "valueString": undefined,
          },
        ],
        "id": "2021-A01022-39",
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
              "reference": "Organization/ansm",
              "type": "Organization",
            },
            "use": "secondary",
            "value": "2021-A01022-39",
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
                      "value": "",
                    },
                  ],
                },
              ],
              "id": "2021-A01022-39-primary-sponsor",
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
              "id": "2021-A01022-39-secondary-sponsor",
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
              "id": "ansm",
              "identifier": undefined,
              "name": "Agence nationale de sécurité du médicament et des produits de santé",
              "resourceType": "Organization",
              "telecom": [
                ContactPointModel {
                  "extension": undefined,
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
          "reference": "Organization/2021-A01022-39-primary-sponsor",
          "type": "Organization",
        },
        "status": "active",
        "title": "",
      }
    `)
  })
})
