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
        "arm": undefined,
        "category": [
          CodeableConceptModel {
            "coding": [
              CodingModel {
                "code": undefined,
                "display": "JARDE",
                "id": undefined,
                "system": undefined,
                "userSelected": undefined,
                "version": undefined,
              },
            ],
            "id": undefined,
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
            "id": undefined,
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
            "id": undefined,
            "text": "MedDRA Condition",
          },
        ],
        "contact": [
          ContactDetailModel {
            "extension": undefined,
            "id": undefined,
            "name": "Christophe GILLET",
            "telecom": [
              ContactPointModel {
                "id": undefined,
                "period": undefined,
                "rank": undefined,
                "system": "phone",
                "use": "work",
                "value": "INDISPONIBLE",
              },
              ContactPointModel {
                "id": undefined,
                "period": undefined,
                "rank": undefined,
                "system": "email",
                "use": "work",
                "value": "christophe.gillet@uphf.fr",
              },
            ],
          },
          ContactDetailModel {
            "extension": [
              ExtensionModel {
                "id": undefined,
                "url": "https://ansforge.github.io/IG-essais-cliniques/ig/main/StructureDefinition-eclaire-contact-type.html",
                "valueCodeableConcept": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": "SCI",
                      "display": "Scientifique / Scientific",
                      "id": undefined,
                      "system": "https://ansforge.github.io/IG-essais-cliniques/ig/main/CodeSystem-eclaire-type-contact-code-system.html",
                      "userSelected": undefined,
                      "version": "0.1.0",
                    },
                  ],
                  "id": undefined,
                  "text": "Contact Type",
                },
                "valueReference": undefined,
                "valueString": undefined,
              },
            ],
            "id": undefined,
            "name": "INDISPONIBLE INDISPONIBLE",
            "telecom": [
              ContactPointModel {
                "id": undefined,
                "period": undefined,
                "rank": undefined,
                "system": "phone",
                "use": "work",
                "value": "INDISPONIBLE",
              },
              ContactPointModel {
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
            "active": undefined,
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
                  "id": undefined,
                  "text": "Group characteristic code",
                },
                "exclude": false,
                "id": undefined,
                "period": undefined,
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
                  "id": undefined,
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
                  "id": undefined,
                  "text": "Group characteristic code",
                },
                "exclude": false,
                "id": undefined,
                "period": undefined,
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
                  "id": undefined,
                  "text": "Age range",
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
                  "id": undefined,
                  "text": "Group characteristic code",
                },
                "exclude": false,
                "id": undefined,
                "period": undefined,
                "valueBoolean": undefined,
                "valueCodeableConcept": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": undefined,
                      "display": "23",
                      "id": undefined,
                      "system": undefined,
                      "userSelected": undefined,
                      "version": undefined,
                    },
                  ],
                  "id": undefined,
                  "text": "Study Size",
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
                  "id": undefined,
                  "text": "Group characteristic code",
                },
                "exclude": false,
                "id": undefined,
                "period": undefined,
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
                  "id": undefined,
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
                  "id": undefined,
                  "text": "Group characteristic code",
                },
                "exclude": false,
                "id": undefined,
                "period": undefined,
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
                  "id": undefined,
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
                  "id": undefined,
                  "text": "Group characteristic code",
                },
                "exclude": false,
                "id": undefined,
                "period": undefined,
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
                  "id": undefined,
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
                  "id": undefined,
                  "text": "Group characteristic code",
                },
                "exclude": true,
                "id": undefined,
                "period": undefined,
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
                  "id": undefined,
                  "text": "Study Exclusion Criteria",
                },
                "valueQuantity": undefined,
                "valueRange": undefined,
                "valueReference": undefined,
              },
            ],
            "code": undefined,
            "id": "2021-A01022-39-enrollment-group-id",
            "identifier": undefined,
            "implicitRules": undefined,
            "language": undefined,
            "managingEntity": undefined,
            "member": undefined,
            "meta": undefined,
            "name": undefined,
            "quantity": undefined,
            "resourceType": "Group",
            "type": "person",
          },
        ],
        "description": "INDISPONIBLE",
        "enrollment": [
          ReferenceModel {
            "display": "Reference to group detailing study characteristics",
            "id": undefined,
            "identifier": undefined,
            "reference": "#2021-A01022-39-enrollment-group-id",
            "type": "Group",
          },
        ],
        "extension": [
          ExtensionModel {
            "id": undefined,
            "url": "https://interop.esante.gouv.fr/ig/fhir/eclaire/StructureDefinition/eclaire-secondary-sponsor",
            "valueCodeableConcept": undefined,
            "valueReference": ReferenceModel {
              "display": "Reference to secondary sponsor",
              "id": undefined,
              "identifier": undefined,
              "reference": "Organization/2021-A01022-39-secondary-sponsor",
              "type": "Organization",
            },
            "valueString": undefined,
          },
          ExtensionModel {
            "id": undefined,
            "url": "https://interop.esante.gouv.fr/ig/fhir/eclaire/StructureDefinition/eclaire-therapeutic-area",
            "valueCodeableConcept": undefined,
            "valueReference": undefined,
            "valueString": "Autres",
          },
        ],
        "focus": undefined,
        "id": "2021-A01022-39",
        "identifier": [
          IdentifierModel {
            "assigner": ReferenceModel {
              "display": "INDISPONIBLE",
              "id": undefined,
              "identifier": undefined,
              "reference": undefined,
              "type": undefined,
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
              "display": "Agence nationale de sécurité du médicament et des produits de santé (ANSM)",
              "id": undefined,
              "identifier": undefined,
              "reference": undefined,
              "type": undefined,
            },
            "id": undefined,
            "period": undefined,
            "system": undefined,
            "type": undefined,
            "use": "secondary",
            "value": "2021-A01022-39",
          },
        ],
        "implicitRules": undefined,
        "keyword": undefined,
        "language": undefined,
        "location": undefined,
        "meta": MetaModel {
          "id": undefined,
          "lastUpdated": "2023-04-04T00:00:00.000Z",
          "profile": [
            "https://interop.esante.gouv.fr/ig/fhir/eclaire/StructureDefinition/eclaire-researchstudy",
          ],
          "security": undefined,
          "source": undefined,
          "tag": undefined,
          "versionId": undefined,
        },
        "objective": undefined,
        "partOf": undefined,
        "period": undefined,
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
          "id": undefined,
          "text": "INDISPONIBLE",
        },
        "primaryPurposeType": undefined,
        "principalInvestigator": undefined,
        "protocol": undefined,
        "reasonStopped": undefined,
        "referenceContents": ReferenceContentsModel {
          "organizations": [
            OrganizationModel {
              "active": true,
              "address": [
                AddressModel {
                  "city": "Valenciennes",
                  "country": "France",
                  "district": undefined,
                  "line": undefined,
                  "period": undefined,
                  "postalCode": "59313",
                  "state": undefined,
                  "text": "LAMIH - Campus du Mont-Houy Valenciennes 59313 France",
                  "type": "physical",
                  "use": "work",
                },
              ],
              "alias": undefined,
              "contact": [
                OrganizationContactModel {
                  "address": undefined,
                  "id": undefined,
                  "name": HumanNameModel {
                    "family": "GILLET",
                    "given": [
                      "Christophe",
                    ],
                    "id": undefined,
                    "period": undefined,
                    "prefix": undefined,
                    "suffix": undefined,
                    "text": "Christophe GILLET",
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
                    "id": undefined,
                    "text": "Organization Contact Purpose",
                  },
                  "telecom": [
                    ContactPointModel {
                      "id": undefined,
                      "period": undefined,
                      "rank": undefined,
                      "system": "phone",
                      "use": "work",
                      "value": "INDISPONIBLE",
                    },
                    ContactPointModel {
                      "id": undefined,
                      "period": undefined,
                      "rank": undefined,
                      "system": "email",
                      "use": "work",
                      "value": "christophe.gillet@uphf.fr",
                    },
                  ],
                },
              ],
              "contained": undefined,
              "endpoint": undefined,
              "id": "2021-A01022-39-primary-sponsor",
              "identifier": undefined,
              "implicitRules": undefined,
              "language": undefined,
              "meta": undefined,
              "name": "Université Polytechnique Hauts-de-France",
              "partOf": undefined,
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
                  "id": undefined,
                  "text": "Organization Sponsor Type",
                },
              ],
            },
            OrganizationModel {
              "active": true,
              "address": [
                AddressModel {
                  "city": "INDISPONIBLE",
                  "country": "INDISPONIBLE",
                  "district": undefined,
                  "line": undefined,
                  "period": undefined,
                  "postalCode": "INDISPONIBLE",
                  "state": undefined,
                  "text": "INDISPONIBLE INDISPONIBLE INDISPONIBLE INDISPONIBLE",
                  "type": "physical",
                  "use": "work",
                },
              ],
              "alias": undefined,
              "contact": [
                OrganizationContactModel {
                  "address": undefined,
                  "id": undefined,
                  "name": HumanNameModel {
                    "family": "INDISPONIBLE",
                    "given": [
                      "INDISPONIBLE",
                    ],
                    "id": undefined,
                    "period": undefined,
                    "prefix": undefined,
                    "suffix": undefined,
                    "text": "INDISPONIBLE INDISPONIBLE",
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
                    "id": undefined,
                    "text": "Organization Contact Purpose",
                  },
                  "telecom": [
                    ContactPointModel {
                      "id": undefined,
                      "period": undefined,
                      "rank": undefined,
                      "system": "phone",
                      "use": "work",
                      "value": "INDISPONIBLE",
                    },
                    ContactPointModel {
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
              "contained": undefined,
              "endpoint": undefined,
              "id": "2021-A01022-39-secondary-sponsor",
              "identifier": undefined,
              "implicitRules": undefined,
              "language": undefined,
              "meta": undefined,
              "name": "INDISPONIBLE",
              "partOf": undefined,
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
                  "id": undefined,
                  "text": "Organization Sponsor Type",
                },
              ],
            },
          ],
        },
        "relatedArtifact": undefined,
        "resourceType": "ResearchStudy",
        "site": undefined,
        "sponsor": ReferenceModel {
          "display": "Reference to primary sponsor",
          "id": undefined,
          "identifier": undefined,
          "reference": "Organization/2021-A01022-39-primary-sponsor",
          "type": "Organization",
        },
        "status": "active",
        "text": undefined,
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
        "arm": undefined,
        "category": [
          CodeableConceptModel {
            "coding": [
              CodingModel {
                "code": undefined,
                "display": "JARDE",
                "id": undefined,
                "system": undefined,
                "userSelected": undefined,
                "version": undefined,
              },
            ],
            "id": undefined,
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
            "id": undefined,
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
            "id": undefined,
            "text": "MedDRA Condition",
          },
        ],
        "contact": [
          ContactDetailModel {
            "extension": undefined,
            "id": undefined,
            "name": " ",
            "telecom": [
              ContactPointModel {
                "id": undefined,
                "period": undefined,
                "rank": undefined,
                "system": "phone",
                "use": "work",
                "value": "INDISPONIBLE",
              },
              ContactPointModel {
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
                "id": undefined,
                "url": "https://ansforge.github.io/IG-essais-cliniques/ig/main/StructureDefinition-eclaire-contact-type.html",
                "valueCodeableConcept": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": "SCI",
                      "display": "Scientifique / Scientific",
                      "id": undefined,
                      "system": "https://ansforge.github.io/IG-essais-cliniques/ig/main/CodeSystem-eclaire-type-contact-code-system.html",
                      "userSelected": undefined,
                      "version": "0.1.0",
                    },
                  ],
                  "id": undefined,
                  "text": "Contact Type",
                },
                "valueReference": undefined,
                "valueString": undefined,
              },
            ],
            "id": undefined,
            "name": "INDISPONIBLE INDISPONIBLE",
            "telecom": [
              ContactPointModel {
                "id": undefined,
                "period": undefined,
                "rank": undefined,
                "system": "phone",
                "use": "work",
                "value": "INDISPONIBLE",
              },
              ContactPointModel {
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
            "active": undefined,
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
                  "id": undefined,
                  "text": "Group characteristic code",
                },
                "exclude": false,
                "id": undefined,
                "period": undefined,
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
                  "id": undefined,
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
                  "id": undefined,
                  "text": "Group characteristic code",
                },
                "exclude": false,
                "id": undefined,
                "period": undefined,
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
                  "id": undefined,
                  "text": "Age range",
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
                  "id": undefined,
                  "text": "Group characteristic code",
                },
                "exclude": false,
                "id": undefined,
                "period": undefined,
                "valueBoolean": undefined,
                "valueCodeableConcept": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": undefined,
                      "display": "-1",
                      "id": undefined,
                      "system": undefined,
                      "userSelected": undefined,
                      "version": undefined,
                    },
                  ],
                  "id": undefined,
                  "text": "Study Size",
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
                  "id": undefined,
                  "text": "Group characteristic code",
                },
                "exclude": false,
                "id": undefined,
                "period": undefined,
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
                  "id": undefined,
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
                  "id": undefined,
                  "text": "Group characteristic code",
                },
                "exclude": false,
                "id": undefined,
                "period": undefined,
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
                  "id": undefined,
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
                  "id": undefined,
                  "text": "Group characteristic code",
                },
                "exclude": false,
                "id": undefined,
                "period": undefined,
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
                  "id": undefined,
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
                  "id": undefined,
                  "text": "Group characteristic code",
                },
                "exclude": true,
                "id": undefined,
                "period": undefined,
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
                  "id": undefined,
                  "text": "Study Exclusion Criteria",
                },
                "valueQuantity": undefined,
                "valueRange": undefined,
                "valueReference": undefined,
              },
            ],
            "code": undefined,
            "id": "2021-A01022-39-enrollment-group-id",
            "identifier": undefined,
            "implicitRules": undefined,
            "language": undefined,
            "managingEntity": undefined,
            "member": undefined,
            "meta": undefined,
            "name": undefined,
            "quantity": undefined,
            "resourceType": "Group",
            "type": "person",
          },
        ],
        "description": "INDISPONIBLE",
        "enrollment": [
          ReferenceModel {
            "display": "Reference to group detailing study characteristics",
            "id": undefined,
            "identifier": undefined,
            "reference": "#2021-A01022-39-enrollment-group-id",
            "type": "Group",
          },
        ],
        "extension": [
          ExtensionModel {
            "id": undefined,
            "url": "https://interop.esante.gouv.fr/ig/fhir/eclaire/StructureDefinition/eclaire-secondary-sponsor",
            "valueCodeableConcept": undefined,
            "valueReference": ReferenceModel {
              "display": "Reference to secondary sponsor",
              "id": undefined,
              "identifier": undefined,
              "reference": "Organization/2021-A01022-39-secondary-sponsor",
              "type": "Organization",
            },
            "valueString": undefined,
          },
          ExtensionModel {
            "id": undefined,
            "url": "https://interop.esante.gouv.fr/ig/fhir/eclaire/StructureDefinition/eclaire-therapeutic-area",
            "valueCodeableConcept": undefined,
            "valueReference": undefined,
            "valueString": "",
          },
        ],
        "focus": undefined,
        "id": "2021-A01022-39",
        "identifier": [
          IdentifierModel {
            "assigner": ReferenceModel {
              "display": "INDISPONIBLE",
              "id": undefined,
              "identifier": undefined,
              "reference": undefined,
              "type": undefined,
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
              "display": "Agence nationale de sécurité du médicament et des produits de santé (ANSM)",
              "id": undefined,
              "identifier": undefined,
              "reference": undefined,
              "type": undefined,
            },
            "id": undefined,
            "period": undefined,
            "system": undefined,
            "type": undefined,
            "use": "secondary",
            "value": "2021-A01022-39",
          },
        ],
        "implicitRules": undefined,
        "keyword": undefined,
        "language": undefined,
        "location": undefined,
        "meta": MetaModel {
          "id": undefined,
          "lastUpdated": "2021-12-31T23:00:00.000Z",
          "profile": [
            "https://interop.esante.gouv.fr/ig/fhir/eclaire/StructureDefinition/eclaire-researchstudy",
          ],
          "security": undefined,
          "source": undefined,
          "tag": undefined,
          "versionId": undefined,
        },
        "objective": undefined,
        "partOf": undefined,
        "period": undefined,
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
          "id": undefined,
          "text": "INDISPONIBLE",
        },
        "primaryPurposeType": undefined,
        "principalInvestigator": undefined,
        "protocol": undefined,
        "reasonStopped": undefined,
        "referenceContents": ReferenceContentsModel {
          "organizations": [
            OrganizationModel {
              "active": true,
              "address": [
                AddressModel {
                  "city": "",
                  "country": "",
                  "district": undefined,
                  "line": undefined,
                  "period": undefined,
                  "postalCode": "",
                  "state": undefined,
                  "text": "   ",
                  "type": "physical",
                  "use": "work",
                },
              ],
              "alias": undefined,
              "contact": [
                OrganizationContactModel {
                  "address": undefined,
                  "id": undefined,
                  "name": HumanNameModel {
                    "family": "",
                    "given": [
                      "",
                    ],
                    "id": undefined,
                    "period": undefined,
                    "prefix": undefined,
                    "suffix": undefined,
                    "text": " ",
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
                    "id": undefined,
                    "text": "Organization Contact Purpose",
                  },
                  "telecom": [
                    ContactPointModel {
                      "id": undefined,
                      "period": undefined,
                      "rank": undefined,
                      "system": "phone",
                      "use": "work",
                      "value": "INDISPONIBLE",
                    },
                    ContactPointModel {
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
              "contained": undefined,
              "endpoint": undefined,
              "id": "2021-A01022-39-primary-sponsor",
              "identifier": undefined,
              "implicitRules": undefined,
              "language": undefined,
              "meta": undefined,
              "name": "",
              "partOf": undefined,
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
                  "id": undefined,
                  "text": "Organization Sponsor Type",
                },
              ],
            },
            OrganizationModel {
              "active": true,
              "address": [
                AddressModel {
                  "city": "INDISPONIBLE",
                  "country": "INDISPONIBLE",
                  "district": undefined,
                  "line": undefined,
                  "period": undefined,
                  "postalCode": "INDISPONIBLE",
                  "state": undefined,
                  "text": "INDISPONIBLE INDISPONIBLE INDISPONIBLE INDISPONIBLE",
                  "type": "physical",
                  "use": "work",
                },
              ],
              "alias": undefined,
              "contact": [
                OrganizationContactModel {
                  "address": undefined,
                  "id": undefined,
                  "name": HumanNameModel {
                    "family": "INDISPONIBLE",
                    "given": [
                      "INDISPONIBLE",
                    ],
                    "id": undefined,
                    "period": undefined,
                    "prefix": undefined,
                    "suffix": undefined,
                    "text": "INDISPONIBLE INDISPONIBLE",
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
                    "id": undefined,
                    "text": "Organization Contact Purpose",
                  },
                  "telecom": [
                    ContactPointModel {
                      "id": undefined,
                      "period": undefined,
                      "rank": undefined,
                      "system": "phone",
                      "use": "work",
                      "value": "INDISPONIBLE",
                    },
                    ContactPointModel {
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
              "contained": undefined,
              "endpoint": undefined,
              "id": "2021-A01022-39-secondary-sponsor",
              "identifier": undefined,
              "implicitRules": undefined,
              "language": undefined,
              "meta": undefined,
              "name": "INDISPONIBLE",
              "partOf": undefined,
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
                  "id": undefined,
                  "text": "Organization Sponsor Type",
                },
              ],
            },
          ],
        },
        "relatedArtifact": undefined,
        "resourceType": "ResearchStudy",
        "site": undefined,
        "sponsor": ReferenceModel {
          "display": "Reference to primary sponsor",
          "id": undefined,
          "identifier": undefined,
          "reference": "Organization/2021-A01022-39-primary-sponsor",
          "type": "Organization",
        },
        "status": "active",
        "text": undefined,
        "title": "",
      }
    `)
  })
})
