export const eclaireStudyPopulationCodeSystem = {
  resourceType : 'CodeSystem',
  id : 'eclaire-study-population-code-system',
  text : {
    status : 'generated',
    div : "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p>This case-sensitive code system <code>https://interop.esante.gouv.fr/ig/fhir/eclaire/CodeSystem/eclaire-study-population-code-system</code> defines the following codes:</p><table class=\"codes\"><tr><td style=\"white-space:nowrap\"><b>Code</b></td><td><b>Display</b></td></tr><tr><td style=\"white-space:nowrap\">incap-pop<a name=\"eclaire-study-population-code-system-incap-pop\"> </a></td><td>Incapacitated population (Population en situation de handicap)</td></tr><tr><td style=\"white-space:nowrap\">minors<a name=\"eclaire-study-population-code-system-minors\"> </a></td><td>Minors (Mineurs)</td></tr><tr><td style=\"white-space:nowrap\">nursing<a name=\"eclaire-study-population-code-system-nursing\"> </a></td><td>Nursing women (Femmes allaitant)</td></tr><tr><td style=\"white-space:nowrap\">other<a name=\"eclaire-study-population-code-system-other\"> </a></td><td>Other (Autres)</td></tr><tr><td style=\"white-space:nowrap\">pregnant<a name=\"eclaire-study-population-code-system-pregnant\"> </a></td><td>Pregnant women (Femmes enceintes)</td></tr><tr><td style=\"white-space:nowrap\">emergency-situation<a name=\"eclaire-study-population-code-system-emergency-situation\"> </a></td><td>Subjects in emergency situation (Sujets en situation d'urgence)</td></tr><tr><td style=\"white-space:nowrap\">incap-consent<a name=\"eclaire-study-population-code-system-incap-consent\"> </a></td><td>Subjects incapable of giving consent personally (Sujets incapables de donner leur consentement personnel)</td></tr><tr><td style=\"white-space:nowrap\">no-using-contraception<a name=\"eclaire-study-population-code-system-no-using-contraception\"> </a></td><td>Women of child bearing potential not using contraception (Femmes en âge de procréer n'utilisant pas de contraception)</td></tr><tr><td style=\"white-space:nowrap\">using-contraception<a name=\"eclaire-study-population-code-system-using-contraception\"> </a></td><td>Women of child bearing potential using contraception (Femmes en âge de procréer utilisant une méthode de contraception)</td></tr></table></div>",
  },
  url : 'https://interop.esante.gouv.fr/ig/fhir/eclaire/CodeSystem/eclaire-study-population-code-system',
  version : '0.2.0',
  name : 'EclaireStudyPopulationCS',
  title : "Codes pour caractériser la population de l'étude",
  status : 'draft',
  date : '2023-10-20T11:56:25+00:00',
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
  description : "Codes pour caractériser la population ciblée par l'étude",
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
  count : 9,
  concept : [
    {
      code : 'incap-pop',
      display : 'Incapacitated population (Population en situation de handicap)',
    },
    {
      code : 'minors',
      display : 'Minors (Mineurs)',
    },
    {
      code : 'nursing',
      display : 'Nursing women (Femmes allaitant)',
    },
    {
      code : 'other',
      display : 'Other (Autres)',
    },
    {
      code : 'pregnant',
      display : 'Pregnant women (Femmes enceintes)',
    },
    {
      code : 'emergency-situation',
      display : "Subjects in emergency situation (Sujets en situation d'urgence)",
    },
    {
      code : 'incap-consent',
      display : 'Subjects incapable of giving consent personally (Sujets incapables de donner leur consentement personnel)',
    },
    {
      code : 'no-using-contraception',
      display : "Women of child bearing potential not using contraception (Femmes en âge de procréer n'utilisant pas de contraception)",
    },
    {
      code : 'using-contraception',
      display : 'Women of child bearing potential using contraception (Femmes en âge de procréer utilisant une méthode de contraception)',
    },
  ],
}
