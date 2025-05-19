export const eclaireStudyPhaseCodeSystem = {
  resourceType : 'CodeSystem',
  id : 'eclaire-study-phase-code-system',
  text : {
    status : 'generated',
    div : '<div xmlns="http://www.w3.org/1999/xhtml"><p>This case-sensitive code system <code>https://interop.esante.gouv.fr/ig/fhir/eclaire/CodeSystem/eclaire-study-phase-code-system</code> defines the following code:</p><table class="codes"><tr><td style="white-space:nowrap"><b>Code</b></td><td><b>Display</b></td><td><b>Definition</b></td></tr><tr><td style="white-space:nowrap">phase-3-phase-4<a name="eclaire-study-phase-code-system-phase-3-phase-4"> </a></td><td>Phase 3 and phase 4</td><td>Trials that are a combination of phases 3 and 4.</td></tr></table></div>',
  },
  url : 'https://interop.esante.gouv.fr/ig/fhir/eclaire/CodeSystem/eclaire-study-phase-code-system',
  version : '0.3.0',
  name : 'EclaireStudyPhaseCS',
  title : "Définition des type de phase de l'essai cliniques incluant https://hl7.org/fhir/R4/valueset-research-study-phase.html",
  status : 'draft',
  date : '2024-02-26T13:35:44+00:00',
  publisher : 'ANS',
  contact : [
    {
      name : 'ANS',
      telecom : [
        {
          system : 'url',
          value : 'https://esante.gouv.fr',
        },
      ],
    },
  ],
  description : "type de phase de l'essai clinique",
  jurisdiction : [
    {
      coding : [
        {
          system : 'urn:iso:std:iso:3166',
          code : 'FR',
          display : 'FRANCE',
        },
      ],
    },
  ],
  caseSensitive : true,
  content : 'complete',
  count : 1,
  concept : [
    {
      code : 'phase-3-phase-4',
      display : 'Phase 3 and phase 4',
      definition : 'Trials that are a combination of phases 3 and 4.',
    },
  ],
}
