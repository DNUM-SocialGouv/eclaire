export const eclaireStudyTitleTypeCodeSystem = {
  resourceType : 'CodeSystem',
  id : 'eclaire-study-title-type-code-system',
  text : {
    status : 'generated',
    div : "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p>This case-sensitive code system <code>https://interop.esante.gouv.fr/ig/fhir/eclaire/CodeSystem/eclaire-study-title-type-code-system</code> defines the following codes:</p><table class=\"codes\"><tr><td style=\"white-space:nowrap\"><b>Code</b></td><td><b>Display</b></td><td><b>Definition</b></td></tr><tr><td style=\"white-space:nowrap\">primary<a name=\"eclaire-study-title-type-code-system-primary\"> </a></td><td>Primary title</td><td>Main title for common use. The primary title used for representation if multiple titles exist.</td></tr><tr><td style=\"white-space:nowrap\">official<a name=\"eclaire-study-title-type-code-system-official\"> </a></td><td>Official title</td><td>The official or authoritative title.</td></tr><tr><td style=\"white-space:nowrap\">scientific<a name=\"eclaire-study-title-type-code-system-scientific\"> </a></td><td>Scientific title</td><td>Title using scientific terminology.</td></tr><tr><td style=\"white-space:nowrap\">plain-language<a name=\"eclaire-study-title-type-code-system-plain-language\"> </a></td><td>Plain language title</td><td>Title using language common to lay public discourse.</td></tr><tr><td style=\"white-space:nowrap\">subtitle<a name=\"eclaire-study-title-type-code-system-subtitle\"> </a></td><td>Subtitle</td><td>Subtitle or secondary title.</td></tr><tr><td style=\"white-space:nowrap\">short-title<a name=\"eclaire-study-title-type-code-system-short-title\"> </a></td><td>Short title</td><td>Brief title (e.g. 'running title' or title used in page headers)</td></tr><tr><td style=\"white-space:nowrap\">acronym<a name=\"eclaire-study-title-type-code-system-acronym\"> </a></td><td>Acronym</td><td>Abbreviation used as title</td></tr><tr><td style=\"white-space:nowrap\">earlier-title<a name=\"eclaire-study-title-type-code-system-earlier-title\"> </a></td><td>Different text in an earlier version</td><td>Alternative form of title in an earlier version such as epub ahead of print.</td></tr><tr><td style=\"white-space:nowrap\">language<a name=\"eclaire-study-title-type-code-system-language\"> </a></td><td>Different language</td><td>Additional form of title in a different language.</td></tr><tr><td style=\"white-space:nowrap\">autotranslated<a name=\"eclaire-study-title-type-code-system-autotranslated\"> </a></td><td>Different language derived from autotranslation</td><td>Machine translated form of title in a different language, language element codes the language into which it was translated by machine.</td></tr><tr><td style=\"white-space:nowrap\">human-use<a name=\"eclaire-study-title-type-code-system-human-use\"> </a></td><td>Human use</td><td>Human-friendly title</td></tr><tr><td style=\"white-space:nowrap\">machine-use<a name=\"eclaire-study-title-type-code-system-machine-use\"> </a></td><td>Machine use</td><td>Machine-friendly title</td></tr><tr><td style=\"white-space:nowrap\">duplicate-uid<a name=\"eclaire-study-title-type-code-system-duplicate-uid\"> </a></td><td>Different text for the same object with a different identifier</td><td>An alternative form of the title in two or more entries, e.g. in multiple medline entries</td></tr></table></div>",
  },
  url : 'https://interop.esante.gouv.fr/ig/fhir/eclaire/CodeSystem/eclaire-study-title-type-code-system',
  version : '0.3.0',
  name : 'EclaireStudyTitleTypeCS',
  title : "Définition des types de titre pour l'essai",
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
  description : "Définition des types de titre pour l'essai (Code System inspiré de R5 : https://hl7.org/fhir/codesystem-title-type.html)",
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
  count : 13,
  concept : [
    {
      code : 'primary',
      display : 'Primary title',
      definition : 'Main title for common use. The primary title used for representation if multiple titles exist.',
    },
    {
      code : 'official',
      display : 'Official title',
      definition : 'The official or authoritative title.',
    },
    {
      code : 'scientific',
      display : 'Scientific title',
      definition : 'Title using scientific terminology.',
    },
    {
      code : 'plain-language',
      display : 'Plain language title',
      definition : 'Title using language common to lay public discourse.',
    },
    {
      code : 'subtitle',
      display : 'Subtitle',
      definition : 'Subtitle or secondary title.',
    },
    {
      code : 'short-title',
      display : 'Short title',
      definition : "Brief title (e.g. 'running title' or title used in page headers)",
    },
    {
      code : 'acronym',
      display : 'Acronym',
      definition : 'Abbreviation used as title',
    },
    {
      code : 'earlier-title',
      display : 'Different text in an earlier version',
      definition : 'Alternative form of title in an earlier version such as epub ahead of print.',
    },
    {
      code : 'language',
      display : 'Different language',
      definition : 'Additional form of title in a different language.',
    },
    {
      code : 'autotranslated',
      display : 'Different language derived from autotranslation',
      definition : 'Machine translated form of title in a different language, language element codes the language into which it was translated by machine.',
    },
    {
      code : 'human-use',
      display : 'Human use',
      definition : 'Human-friendly title',
    },
    {
      code : 'machine-use',
      display : 'Machine use',
      definition : 'Machine-friendly title',
    },
    {
      code : 'duplicate-uid',
      display : 'Different text for the same object with a different identifier',
      definition : 'An alternative form of the title in two or more entries, e.g. in multiple medline entries',
    },
  ],
}
