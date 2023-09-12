export const eclaireStudyPhaseCodeSystem = {
  resourceType: 'CodeSystem',
  id: 'eclaire-study-phase-code-system',
  text: {
    status: 'generated',
    div: '<div xmlns="http://www.w3.org/1999/xhtml"><p>This code system <code>https://interop.esante.gouv.fr/ig/fhir/eclaire/CodeSystem/eclaire-study-phase-code-system</code> defines the following code:</p><table class="codes"><tr><td style="white-space:nowrap"><b>Code</b></td><td><b>Display</b></td></tr><tr><td style="white-space:nowrap">phase-3-phase-4<a name="eclaire-study-phase-code-system-phase-3-phase-4"> </a></td><td>Phase III and phase IV (Integrated)</td></tr></table></div>',
  },
  url: 'https://interop.esante.gouv.fr/ig/fhir/eclaire/CodeSystem/eclaire-study-phase-code-system',
  version: '0.1.0',
  name: 'EclaireStudyPhaseCS',
  title: "Définition des type de phase de l'essai cliniques incluant https://hl7.org/fhir/R4/valueset-research-study-phase.html",
  status: 'draft',
  date: '2023-07-28T16:03:24+00:00',
  publisher: 'ANS',
  contact: [
    {
      name: 'ANS',
      telecom: [
        {
          system: 'url',
          value: 'https://esante.gouv.fr',
        },
      ],
    },
  ],
  description: "type de phase de l'essai clinique",
  content: 'complete',
  count: 1,
  concept: [
    {
      code: 'phase-3-phase-4',
      display: 'Phase III and phase IV (Integrated)',
    },
  ],
}
