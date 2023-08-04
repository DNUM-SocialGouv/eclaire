/* eslint-disable sort-keys */

export const titleTypeCodeSystem = {
  resourceType : 'CodeSystem',
  id : 'title-type',
  meta : {
    lastUpdated : '2023-03-26T15:21:02.749+11:00',
    profile : ['http://hl7.org/fhir/StructureDefinition/shareablecodesystem'],
  },
  text : {
    status : 'generated',
    div : "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p>This code system <code>http://hl7.org/fhir/title-type</code> defines the following codes:</p><table class=\"codes\"><tr><td style=\"white-space:nowrap\"><b>Code</b></td><td><b>Display</b></td><td><b>Definition</b></td></tr><tr><td style=\"white-space:nowrap\">primary<a name=\"title-type-primary\"> </a></td><td>Primary title</td><td>Main title for common use. The primary title used for representation if multiple titles exist.</td></tr><tr><td style=\"white-space:nowrap\">official<a name=\"title-type-official\"> </a></td><td>Official title</td><td>The official or authoritative title.</td></tr><tr><td style=\"white-space:nowrap\">scientific<a name=\"title-type-scientific\"> </a></td><td>Scientific title</td><td>Title using scientific terminology.</td></tr><tr><td style=\"white-space:nowrap\">plain-language<a name=\"title-type-plain-language\"> </a></td><td>Plain language title</td><td>Title using language common to lay public discourse.</td></tr><tr><td style=\"white-space:nowrap\">subtitle<a name=\"title-type-subtitle\"> </a></td><td>Subtitle</td><td>Subtitle or secondary title.</td></tr><tr><td style=\"white-space:nowrap\">short-title<a name=\"title-type-short-title\"> </a></td><td>Short title</td><td>Brief title (e.g. 'running title' or title used in page headers)</td></tr><tr><td style=\"white-space:nowrap\">acronym<a name=\"title-type-acronym\"> </a></td><td>Acronym</td><td>Abbreviation used as title</td></tr><tr><td style=\"white-space:nowrap\">earlier-title<a name=\"title-type-earlier-title\"> </a></td><td>Different text in an earlier version</td><td>Alternative form of title in an earlier version such as epub ahead of print.</td></tr><tr><td style=\"white-space:nowrap\">language<a name=\"title-type-language\"> </a></td><td>Different language</td><td>Additional form of title in a different language.</td></tr><tr><td style=\"white-space:nowrap\">autotranslated<a name=\"title-type-autotranslated\"> </a></td><td>Different language derived from autotranslation</td><td>Machine translated form of title in a different language, language element codes the language into which it was translated by machine.</td></tr><tr><td style=\"white-space:nowrap\">human-use<a name=\"title-type-human-use\"> </a></td><td>Human use</td><td>Human-friendly title</td></tr><tr><td style=\"white-space:nowrap\">machine-use<a name=\"title-type-machine-use\"> </a></td><td>Machine use</td><td>Machine-friendly title</td></tr><tr><td style=\"white-space:nowrap\">duplicate-uid<a name=\"title-type-duplicate-uid\"> </a></td><td>Different text for the same object with a different identifier</td><td>An alternative form of the title in two or more entries, e.g. in multiple medline entries</td></tr></table></div>",
  },
  extension : [
    {
      url : 'http://hl7.org/fhir/StructureDefinition/structuredefinition-wg',
      valueCode : 'cds',
    },
    {
      url : 'http://hl7.org/fhir/StructureDefinition/structuredefinition-standards-status',
      valueCode : 'trial-use',
    },
    {
      url : 'http://hl7.org/fhir/StructureDefinition/structuredefinition-fmm',
      valueInteger : 0,
    },
  ],
  url : 'http://hl7.org/fhir/title-type',
  identifier : [
    {
      system : 'urn:ietf:rfc:3986',
      value : 'urn:oid:2.16.840.1.113883.4.642.4.1875',
    },
  ],
  version : '5.0.0',
  name : 'TitleType',
  title : 'Title Type',
  status : 'active',
  experimental : false,
  date : '2020-12-28T16:55:11+11:00',
  publisher : 'HL7 (FHIR Project)',
  contact : [
    {
      telecom : [
        {
          system : 'url',
          value : 'http://hl7.org/fhir',
        },
        {
          system : 'email',
          value : 'fhir@lists.hl7.org',
        },
      ],
    },
  ],
  description : 'Used to express the reason and specific aspect for the variant title, such as language and specific language.',
  jurisdiction : [
    {
      coding : [
        {
          system : 'http://unstats.un.org/unsd/methods/m49/m49.htm',
          code : '001',
          display : 'World',
        },
      ],
    },
  ],
  caseSensitive : true,
  valueSet : 'http://hl7.org/fhir/ValueSet/title-type',
  content : 'complete',
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