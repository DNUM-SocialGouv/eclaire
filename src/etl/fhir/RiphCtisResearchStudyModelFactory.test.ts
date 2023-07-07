/* eslint-disable vitest/no-large-snapshots */
import { RiphCtisResearchStudyModelFactory } from './RiphCtisResearchStudyModelFactory'
import { ResearchStudyModel } from '../../shared/models/fhir/ResearchStudyModel'
import { riphCtisDto } from '../../shared/test/helpers/elasticsearchHelper'

describe('ctis research study model factory', () => {
  it('should build a CTIS research study model, when RIPH CTIS with all fields filled is given', () => {
    // GIVEN
    const normalResearchStudyDto = riphCtisDto[0]

    // WHEN
    const researchStudyModel: ResearchStudyModel = RiphCtisResearchStudyModelFactory.create(normalResearchStudyDto)

    // THEN
    expect(researchStudyModel).toMatchInlineSnapshot(`
      ResearchStudyModel {
        "arm": undefined,
        "category": [
          CodeableConceptModel {
            "coding": undefined,
            "id": undefined,
            "text": "REG536",
          },
        ],
        "condition": [
          CodeableConceptModel {
            "coding": [
              CodingModel {
                "code": "Locally-Advanced or Metastatic breast cancer (MBC)",
                "display": "Disease Condition",
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
                "code": "10070575",
                "display": "MedDRA",
                "id": undefined,
                "system": "http://terminology.hl7.org/CodeSystem/mdr",
                "userSelected": undefined,
                "version": "2.0.1",
              },
              CodingModel {
                "code": "10065430",
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
            "id": undefined,
            "name": "Head of EU, Trial Information Support Line-TISL, Switzerland",
            "telecom": [
              ContactPointModel {
                "id": undefined,
                "period": undefined,
                "rank": undefined,
                "system": "phone",
                "use": "work",
                "value": "0041616881111",
              },
              ContactPointModel {
                "id": undefined,
                "period": undefined,
                "rank": undefined,
                "system": "email",
                "use": "work",
                "value": "global.rochegenentechtrials@roche.com",
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
                "code": undefined,
                "exclude": false,
                "id": undefined,
                "period": undefined,
                "valueBoolean": undefined,
                "valueCodeableConcept": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": "male",
                      "display": "Male",
                      "id": undefined,
                      "system": "http://hl7.org/fhir/administrative-gender",
                      "userSelected": undefined,
                      "version": "5.0.0",
                    },
                    CodingModel {
                      "code": "female",
                      "display": "Female",
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
                "code": undefined,
                "exclude": false,
                "id": undefined,
                "period": undefined,
                "valueBoolean": undefined,
                "valueCodeableConcept": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": undefined,
                      "display": "65+ years",
                      "id": undefined,
                      "system": undefined,
                      "userSelected": undefined,
                      "version": undefined,
                    },
                    CodingModel {
                      "code": undefined,
                      "display": "18-64 years",
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
                "code": undefined,
                "exclude": false,
                "id": undefined,
                "period": undefined,
                "valueBoolean": undefined,
                "valueCodeableConcept": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": undefined,
                      "display": "21",
                      "id": undefined,
                      "system": undefined,
                      "userSelected": undefined,
                      "version": undefined,
                    },
                    CodingModel {
                      "code": undefined,
                      "display": "Données non disponible",
                      "id": undefined,
                      "system": undefined,
                      "userSelected": undefined,
                      "version": undefined,
                    },
                    CodingModel {
                      "code": undefined,
                      "display": "Women of child bearing potential not using contraception, Women of child bearing potential using contraception",
                      "id": undefined,
                      "system": undefined,
                      "userSelected": undefined,
                      "version": undefined,
                    },
                  ],
                  "id": undefined,
                  "text": "Criteria",
                },
                "valueQuantity": undefined,
                "valueRange": undefined,
                "valueReference": undefined,
              },
            ],
            "code": undefined,
            "id": undefined,
            "identifier": undefined,
            "implicitRules": undefined,
            "language": undefined,
            "managingEntity": undefined,
            "member": undefined,
            "meta": undefined,
            "name": undefined,
            "quantity": undefined,
            "resourceType": undefined,
            "type": "person",
          },
        ],
        "description": "INDISPONIBLE",
        "enrollment": [
          ReferenceModel {
            "display": undefined,
            "id": undefined,
            "identifier": undefined,
            "reference": undefined,
            "type": "Group",
          },
        ],
        "focus": undefined,
        "id": undefined,
        "identifier": [
          IdentifierModel {
            "assigner": ReferenceModel {
              "display": "euclinicaltrials.eu",
              "id": undefined,
              "identifier": undefined,
              "reference": "https://euclinicaltrials.eu/app/#/view/2022-500014-26-00",
              "type": undefined,
            },
            "id": undefined,
            "period": undefined,
            "type": undefined,
            "use": "usual",
            "value": "2022-500014-26-00",
          },
        ],
        "implicitRules": undefined,
        "keyword": undefined,
        "language": undefined,
        "location": undefined,
        "meta": MetaModel {
          "id": undefined,
          "lastUpdated": "12/04/2023",
          "profile": undefined,
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
              "code": "phase-3",
              "display": "Phase 3",
              "id": undefined,
              "system": "http://terminology.hl7.org/CodeSystem/research-study-phase",
              "userSelected": undefined,
              "version": "4.0.1",
            },
          ],
          "id": undefined,
          "text": "Therapeutic confirmatory  (Phase III)",
        },
        "primaryPurposeType": undefined,
        "principalInvestigator": undefined,
        "protocol": undefined,
        "reasonStopped": undefined,
        "relatedArtifact": undefined,
        "resourceType": undefined,
        "site": undefined,
        "sponsor": undefined,
        "status": "active",
        "text": undefined,
        "title": "A PHASE III, RANDOMIZED, OPEN-LABEL STUDY EVALUATING THE EFFICACY AND SAFETY OF GIREDESTRANT IN COMBINATION WITH PHESGO VERSUS PHESGO AFTER INDUCTION THERAPY WITH PHESGO+TAXANE IN PATIENTS WITH PREVIOUSLY UNTREATED HER2-POSITIVE, ESTROGEN RECEPTOR-POSITIVE LOCALLY-ADVANCED OR METASTATIC BREAST CANCER",
      }
    `)
  })

  it('should build a CTIS research study model, when RIPH CTIS with null fields is given', () => {
    // GIVEN
    const researchStudyDtoWithEmptyFields = riphCtisDto[1]

    // WHEN
    const researchStudyModel = RiphCtisResearchStudyModelFactory.create(researchStudyDtoWithEmptyFields)

    // THEN
    expect(researchStudyModel).toMatchInlineSnapshot(`
      ResearchStudyModel {
        "arm": undefined,
        "category": [
          CodeableConceptModel {
            "coding": undefined,
            "id": undefined,
            "text": "REG536",
          },
        ],
        "condition": [
          CodeableConceptModel {
            "coding": [
              CodingModel {
                "code": "",
                "display": "Disease Condition",
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
            "coding": [],
            "id": undefined,
            "text": "MedDRA Condition",
          },
        ],
        "contact": [
          ContactDetailModel {
            "id": undefined,
            "name": ", ",
            "telecom": [
              ContactPointModel {
                "id": undefined,
                "period": undefined,
                "rank": undefined,
                "system": "phone",
                "use": "work",
                "value": "",
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
        "contained": [
          GroupModel {
            "active": undefined,
            "actual": true,
            "characteristic": [
              GroupCharacteristicModel {
                "code": undefined,
                "exclude": false,
                "id": undefined,
                "period": undefined,
                "valueBoolean": undefined,
                "valueCodeableConcept": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": "unknown",
                      "display": "Unknown",
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
                "code": undefined,
                "exclude": false,
                "id": undefined,
                "period": undefined,
                "valueBoolean": undefined,
                "valueCodeableConcept": CodeableConceptModel {
                  "coding": [],
                  "id": undefined,
                  "text": "Age range",
                },
                "valueQuantity": undefined,
                "valueRange": undefined,
                "valueReference": undefined,
              },
              GroupCharacteristicModel {
                "code": undefined,
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
                    CodingModel {
                      "code": undefined,
                      "display": "",
                      "id": undefined,
                      "system": undefined,
                      "userSelected": undefined,
                      "version": undefined,
                    },
                    CodingModel {
                      "code": undefined,
                      "display": "",
                      "id": undefined,
                      "system": undefined,
                      "userSelected": undefined,
                      "version": undefined,
                    },
                  ],
                  "id": undefined,
                  "text": "Criteria",
                },
                "valueQuantity": undefined,
                "valueRange": undefined,
                "valueReference": undefined,
              },
            ],
            "code": undefined,
            "id": undefined,
            "identifier": undefined,
            "implicitRules": undefined,
            "language": undefined,
            "managingEntity": undefined,
            "member": undefined,
            "meta": undefined,
            "name": undefined,
            "quantity": undefined,
            "resourceType": undefined,
            "type": "person",
          },
        ],
        "description": "INDISPONIBLE",
        "enrollment": [
          ReferenceModel {
            "display": undefined,
            "id": undefined,
            "identifier": undefined,
            "reference": undefined,
            "type": "Group",
          },
        ],
        "focus": undefined,
        "id": undefined,
        "identifier": [
          IdentifierModel {
            "assigner": ReferenceModel {
              "display": "euclinicaltrials.eu",
              "id": undefined,
              "identifier": undefined,
              "reference": "https://euclinicaltrials.eu/app/#/view/2022-500299-71-00",
              "type": undefined,
            },
            "id": undefined,
            "period": undefined,
            "type": undefined,
            "use": "usual",
            "value": "2022-500299-71-00",
          },
        ],
        "implicitRules": undefined,
        "keyword": undefined,
        "language": undefined,
        "location": undefined,
        "meta": MetaModel {
          "id": undefined,
          "lastUpdated": "",
          "profile": undefined,
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
          "text": "",
        },
        "primaryPurposeType": undefined,
        "principalInvestigator": undefined,
        "protocol": undefined,
        "reasonStopped": undefined,
        "relatedArtifact": undefined,
        "resourceType": undefined,
        "site": undefined,
        "sponsor": undefined,
        "status": "active",
        "text": undefined,
        "title": "",
      }
    `)
  })

  it('should build a CTIS research study with the last date of approval, when the last date of approval is higher than historic date', () => {
    // GIVEN
    const ctisWithDateOfApprovalHigherThanHistoricDate = riphCtisDto[0]

    // WHEN
    const researchStudyModel = RiphCtisResearchStudyModelFactory.create(ctisWithDateOfApprovalHigherThanHistoricDate)

    // THEN
    expect(researchStudyModel).toMatchInlineSnapshot(`
      ResearchStudyModel {
        "arm": undefined,
        "category": [
          CodeableConceptModel {
            "coding": undefined,
            "id": undefined,
            "text": "REG536",
          },
        ],
        "condition": [
          CodeableConceptModel {
            "coding": [
              CodingModel {
                "code": "Locally-Advanced or Metastatic breast cancer (MBC)",
                "display": "Disease Condition",
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
                "code": "10070575",
                "display": "MedDRA",
                "id": undefined,
                "system": "http://terminology.hl7.org/CodeSystem/mdr",
                "userSelected": undefined,
                "version": "2.0.1",
              },
              CodingModel {
                "code": "10065430",
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
            "id": undefined,
            "name": "Head of EU, Trial Information Support Line-TISL, Switzerland",
            "telecom": [
              ContactPointModel {
                "id": undefined,
                "period": undefined,
                "rank": undefined,
                "system": "phone",
                "use": "work",
                "value": "0041616881111",
              },
              ContactPointModel {
                "id": undefined,
                "period": undefined,
                "rank": undefined,
                "system": "email",
                "use": "work",
                "value": "global.rochegenentechtrials@roche.com",
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
                "code": undefined,
                "exclude": false,
                "id": undefined,
                "period": undefined,
                "valueBoolean": undefined,
                "valueCodeableConcept": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": "male",
                      "display": "Male",
                      "id": undefined,
                      "system": "http://hl7.org/fhir/administrative-gender",
                      "userSelected": undefined,
                      "version": "5.0.0",
                    },
                    CodingModel {
                      "code": "female",
                      "display": "Female",
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
                "code": undefined,
                "exclude": false,
                "id": undefined,
                "period": undefined,
                "valueBoolean": undefined,
                "valueCodeableConcept": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": undefined,
                      "display": "65+ years",
                      "id": undefined,
                      "system": undefined,
                      "userSelected": undefined,
                      "version": undefined,
                    },
                    CodingModel {
                      "code": undefined,
                      "display": "18-64 years",
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
                "code": undefined,
                "exclude": false,
                "id": undefined,
                "period": undefined,
                "valueBoolean": undefined,
                "valueCodeableConcept": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": undefined,
                      "display": "21",
                      "id": undefined,
                      "system": undefined,
                      "userSelected": undefined,
                      "version": undefined,
                    },
                    CodingModel {
                      "code": undefined,
                      "display": "Données non disponible",
                      "id": undefined,
                      "system": undefined,
                      "userSelected": undefined,
                      "version": undefined,
                    },
                    CodingModel {
                      "code": undefined,
                      "display": "Women of child bearing potential not using contraception, Women of child bearing potential using contraception",
                      "id": undefined,
                      "system": undefined,
                      "userSelected": undefined,
                      "version": undefined,
                    },
                  ],
                  "id": undefined,
                  "text": "Criteria",
                },
                "valueQuantity": undefined,
                "valueRange": undefined,
                "valueReference": undefined,
              },
            ],
            "code": undefined,
            "id": undefined,
            "identifier": undefined,
            "implicitRules": undefined,
            "language": undefined,
            "managingEntity": undefined,
            "member": undefined,
            "meta": undefined,
            "name": undefined,
            "quantity": undefined,
            "resourceType": undefined,
            "type": "person",
          },
        ],
        "description": "INDISPONIBLE",
        "enrollment": [
          ReferenceModel {
            "display": undefined,
            "id": undefined,
            "identifier": undefined,
            "reference": undefined,
            "type": "Group",
          },
        ],
        "focus": undefined,
        "id": undefined,
        "identifier": [
          IdentifierModel {
            "assigner": ReferenceModel {
              "display": "euclinicaltrials.eu",
              "id": undefined,
              "identifier": undefined,
              "reference": "https://euclinicaltrials.eu/app/#/view/2022-500014-26-00",
              "type": undefined,
            },
            "id": undefined,
            "period": undefined,
            "type": undefined,
            "use": "usual",
            "value": "2022-500014-26-00",
          },
        ],
        "implicitRules": undefined,
        "keyword": undefined,
        "language": undefined,
        "location": undefined,
        "meta": MetaModel {
          "id": undefined,
          "lastUpdated": "12/04/2023",
          "profile": undefined,
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
              "code": "phase-3",
              "display": "Phase 3",
              "id": undefined,
              "system": "http://terminology.hl7.org/CodeSystem/research-study-phase",
              "userSelected": undefined,
              "version": "4.0.1",
            },
          ],
          "id": undefined,
          "text": "Therapeutic confirmatory  (Phase III)",
        },
        "primaryPurposeType": undefined,
        "principalInvestigator": undefined,
        "protocol": undefined,
        "reasonStopped": undefined,
        "relatedArtifact": undefined,
        "resourceType": undefined,
        "site": undefined,
        "sponsor": undefined,
        "status": "active",
        "text": undefined,
        "title": "A PHASE III, RANDOMIZED, OPEN-LABEL STUDY EVALUATING THE EFFICACY AND SAFETY OF GIREDESTRANT IN COMBINATION WITH PHESGO VERSUS PHESGO AFTER INDUCTION THERAPY WITH PHESGO+TAXANE IN PATIENTS WITH PREVIOUSLY UNTREATED HER2-POSITIVE, ESTROGEN RECEPTOR-POSITIVE LOCALLY-ADVANCED OR METASTATIC BREAST CANCER",
      }
    `)
  })

  it('should build a CTIS research study with the historic date, when the historic date is higher than last date of approval', () => {
    // GIVEN
    const ctisWithHistoricDateHigherThanDateOfApproval = riphCtisDto[2]

    // WHEN
    const researchStudyModel = RiphCtisResearchStudyModelFactory.create(ctisWithHistoricDateHigherThanDateOfApproval)

    // THEN
    expect(researchStudyModel).toMatchInlineSnapshot(`
      ResearchStudyModel {
        "arm": undefined,
        "category": [
          CodeableConceptModel {
            "coding": undefined,
            "id": undefined,
            "text": "REG536",
          },
        ],
        "condition": [
          CodeableConceptModel {
            "coding": [
              CodingModel {
                "code": "",
                "display": "Disease Condition",
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
            "coding": [],
            "id": undefined,
            "text": "MedDRA Condition",
          },
        ],
        "contact": [
          ContactDetailModel {
            "id": undefined,
            "name": ", ",
            "telecom": [
              ContactPointModel {
                "id": undefined,
                "period": undefined,
                "rank": undefined,
                "system": "phone",
                "use": "work",
                "value": "",
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
        "contained": [
          GroupModel {
            "active": undefined,
            "actual": true,
            "characteristic": [
              GroupCharacteristicModel {
                "code": undefined,
                "exclude": false,
                "id": undefined,
                "period": undefined,
                "valueBoolean": undefined,
                "valueCodeableConcept": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": "unknown",
                      "display": "Unknown",
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
                "code": undefined,
                "exclude": false,
                "id": undefined,
                "period": undefined,
                "valueBoolean": undefined,
                "valueCodeableConcept": CodeableConceptModel {
                  "coding": [],
                  "id": undefined,
                  "text": "Age range",
                },
                "valueQuantity": undefined,
                "valueRange": undefined,
                "valueReference": undefined,
              },
              GroupCharacteristicModel {
                "code": undefined,
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
                    CodingModel {
                      "code": undefined,
                      "display": "",
                      "id": undefined,
                      "system": undefined,
                      "userSelected": undefined,
                      "version": undefined,
                    },
                    CodingModel {
                      "code": undefined,
                      "display": "",
                      "id": undefined,
                      "system": undefined,
                      "userSelected": undefined,
                      "version": undefined,
                    },
                  ],
                  "id": undefined,
                  "text": "Criteria",
                },
                "valueQuantity": undefined,
                "valueRange": undefined,
                "valueReference": undefined,
              },
            ],
            "code": undefined,
            "id": undefined,
            "identifier": undefined,
            "implicitRules": undefined,
            "language": undefined,
            "managingEntity": undefined,
            "member": undefined,
            "meta": undefined,
            "name": undefined,
            "quantity": undefined,
            "resourceType": undefined,
            "type": "person",
          },
        ],
        "description": "INDISPONIBLE",
        "enrollment": [
          ReferenceModel {
            "display": undefined,
            "id": undefined,
            "identifier": undefined,
            "reference": undefined,
            "type": "Group",
          },
        ],
        "focus": undefined,
        "id": undefined,
        "identifier": [
          IdentifierModel {
            "assigner": ReferenceModel {
              "display": "euclinicaltrials.eu",
              "id": undefined,
              "identifier": undefined,
              "reference": "https://euclinicaltrials.eu/app/#/view/2022-500024-30-00",
              "type": undefined,
            },
            "id": undefined,
            "period": undefined,
            "type": undefined,
            "use": "usual",
            "value": "2022-500024-30-00",
          },
        ],
        "implicitRules": undefined,
        "keyword": undefined,
        "language": undefined,
        "location": undefined,
        "meta": MetaModel {
          "id": undefined,
          "lastUpdated": "29/11/2023",
          "profile": undefined,
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
          "text": "",
        },
        "primaryPurposeType": undefined,
        "principalInvestigator": undefined,
        "protocol": undefined,
        "reasonStopped": undefined,
        "relatedArtifact": undefined,
        "resourceType": undefined,
        "site": undefined,
        "sponsor": undefined,
        "status": "active",
        "text": undefined,
        "title": "",
      }
    `)
  })
})
