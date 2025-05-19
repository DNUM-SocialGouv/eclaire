export const eclaireStudyPhaseSourceCodeSystem = {
  resourceType : 'CodeSystem',
  id : 'eclaire-study-phase-source-code-system',
  text : {
    status : 'generated',
    div : '<div xmlns="http://www.w3.org/1999/xhtml"><p>This case-sensitive code system <code>https://interop.esante.gouv.fr/ig/fhir/eclaire/CodeSystem/eclaire-study-phase-source-code-system</code> defines the following codes:</p><table class="codes"><tr><td style="white-space:nowrap"><b>Code</b></td><td><b>Display</b></td></tr><tr><td style="white-space:nowrap">jarde-early<a name="eclaire-study-phase-source-code-system-jarde-early"> </a></td><td>Jardé phase précoce</td></tr><tr><td style="white-space:nowrap">phase-I-first-admin<a name="eclaire-study-phase-source-code-system-phase-I-first-admin"> </a></td><td>Human Pharmacology (Phase I) - First administration to humans</td></tr><tr><td style="white-space:nowrap">phase-I-bioequivalence<a name="eclaire-study-phase-source-code-system-phase-I-bioequivalence"> </a></td><td>Human Pharmacology (Phase I) - Bioequivalence Study</td></tr><tr><td style="white-space:nowrap">phase-I-other<a name="eclaire-study-phase-source-code-system-phase-I-other"> </a></td><td>Human Pharmacology (Phase I) -  Other</td></tr><tr><td style="white-space:nowrap">phase-I-II-first-admin<a name="eclaire-study-phase-source-code-system-phase-I-II-first-admin"> </a></td><td>Phase I and Phase II (Integrated) - First administration to humans</td></tr><tr><td style="white-space:nowrap">phase-I-II-first-bioequivalence<a name="eclaire-study-phase-source-code-system-phase-I-II-first-bioequivalence"> </a></td><td>Phase I and Phase II (Integrated) - Bioequivalence Study</td></tr><tr><td style="white-space:nowrap">phase-I-II-other<a name="eclaire-study-phase-source-code-system-phase-I-II-other"> </a></td><td>Phase I and Phase II (Integrated) - Other</td></tr><tr><td style="white-space:nowrap">phase-II<a name="eclaire-study-phase-source-code-system-phase-II"> </a></td><td>Therapeutic exploratory (Phase II)</td></tr><tr><td style="white-space:nowrap">phase-II-III<a name="eclaire-study-phase-source-code-system-phase-II-III"> </a></td><td>Phase II and Phase III (Integrated)</td></tr><tr><td style="white-space:nowrap">phase-III<a name="eclaire-study-phase-source-code-system-phase-III"> </a></td><td>Therapeutic confirmatory  (Phase III)</td></tr><tr><td style="white-space:nowrap">phase-IV<a name="eclaire-study-phase-source-code-system-phase-IV"> </a></td><td>Therapeutic use (Phase IV)</td></tr><tr><td style="white-space:nowrap">phase-III-IV<a name="eclaire-study-phase-source-code-system-phase-III-IV"> </a></td><td>Phase III and phase IV (Integrated)</td></tr></table></div>',
  },
  url : 'https://interop.esante.gouv.fr/ig/fhir/eclaire/CodeSystem/eclaire-study-phase-source-code-system',
  version : '0.3.0',
  name : 'EclaireStudyPhaseSourceCS',
  title : "Définition des phase de l'essai utilisés dans la base de données ECLAIRE",
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
  description : "Définition des phases de l'essai utilisées dans la base de données ECLAIRE",
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
  count : 12,
  concept : [
    {
      code : 'jarde-early',
      display : 'Jardé phase précoce',
    },
    {
      code : 'phase-I-first-admin',
      display : 'Human Pharmacology (Phase I) - First administration to humans',
    },
    {
      code : 'phase-I-bioequivalence',
      display : 'Human Pharmacology (Phase I) - Bioequivalence Study',
    },
    {
      code : 'phase-I-other',
      display : 'Human Pharmacology (Phase I) -  Other',
    },
    {
      code : 'phase-I-II-first-admin',
      display : 'Phase I and Phase II (Integrated) - First administration to humans',
    },
    {
      code : 'phase-I-II-first-bioequivalence',
      display : 'Phase I and Phase II (Integrated) - Bioequivalence Study',
    },
    {
      code : 'phase-I-II-other',
      display : 'Phase I and Phase II (Integrated) - Other',
    },
    {
      code : 'phase-II',
      display : 'Therapeutic exploratory (Phase II)',
    },
    {
      code : 'phase-II-III',
      display : 'Phase II and Phase III (Integrated)',
    },
    {
      code : 'phase-III',
      display : 'Therapeutic confirmatory  (Phase III)',
    },
    {
      code : 'phase-IV',
      display : 'Therapeutic use (Phase IV)',
    },
    {
      code : 'phase-III-IV',
      display : 'Phase III and phase IV (Integrated)',
    },
  ],
}
