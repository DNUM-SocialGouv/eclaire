export const eclaireStudyPartyOrganizationTypeCodeSystem = {
  resourceType : 'CodeSystem',
  id : 'eclaire-study-party-organization-type-code-system',
  text : {
    status : 'generated',
    div : '<div xmlns="http://www.w3.org/1999/xhtml"><p>This case-sensitive code system <code>https://interop.esante.gouv.fr/ig/fhir/eclaire/CodeSystem/eclaire-study-party-organization-type-code-system</code> defines the following codes:</p><table class="codes"><tr><td style="white-space:nowrap"><b>Code</b></td><td><b>Display</b></td></tr><tr><td style="white-space:nowrap">government<a name="eclaire-study-party-organization-type-code-system-government"> </a></td><td>Gouvernemental / Government</td></tr><tr><td style="white-space:nowrap">nonprofit<a name="eclaire-study-party-organization-type-code-system-nonprofit"> </a></td><td>Sans but lucratif / Nonprofit</td></tr><tr><td style="white-space:nowrap">academic<a name="eclaire-study-party-organization-type-code-system-academic"> </a></td><td>Académique / Academic</td></tr><tr><td style="white-space:nowrap">industry<a name="eclaire-study-party-organization-type-code-system-industry"> </a></td><td>Industriel / Industry</td></tr></table></div>',
  },
  url : 'https://interop.esante.gouv.fr/ig/fhir/eclaire/CodeSystem/eclaire-study-party-organization-type-code-system',
  version : '0.3.0',
  name : 'EclaireStudyPartyOrganizationTypeCS',
  title : "Définition des différents types d'organisation des parties prenantes inspiré de http://hl7.org/fhir/research-study-party-organization-type",
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
  description : "Différents rôles des parties impliquées dans l'essai",
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
  count : 4,
  concept : [
    {
      code : 'government',
      display : 'Gouvernemental / Government',
    },
    {
      code : 'nonprofit',
      display : 'Sans but lucratif / Nonprofit',
    },
    {
      code : 'academic',
      display : 'Académique / Academic',
    },
    {
      code : 'industry',
      display : 'Industriel / Industry',
    },
  ],
}
