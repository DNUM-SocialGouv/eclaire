export const eclaireStudyPartyRoleVsCodeSystem = {
  resourceType : 'CodeSystem',
  id : 'eclaire-study-party-role-code-system',
  text : {
    status : 'generated',
    div : '<div xmlns="http://www.w3.org/1999/xhtml"><p>This case-sensitive code system <code>https://interop.esante.gouv.fr/ig/fhir/eclaire/CodeSystem/eclaire-study-party-role-code-system</code> defines the following codes:</p><table class="codes"><tr><td style="white-space:nowrap"><b>Code</b></td><td><b>Display</b></td><td><b>Definition</b></td></tr><tr><td style="white-space:nowrap">sponsor<a name="eclaire-study-party-role-code-system-sponsor"> </a></td><td>sponsor</td><td>sponsor</td></tr><tr><td style="white-space:nowrap">lead-sponsor<a name="eclaire-study-party-role-code-system-lead-sponsor"> </a></td><td>lead-sponsor</td><td>lead-sponsor</td></tr><tr><td style="white-space:nowrap">sponsor-investigator<a name="eclaire-study-party-role-code-system-sponsor-investigator"> </a></td><td>sponsor-investigator</td><td>sponsor-investigator</td></tr><tr><td style="white-space:nowrap">primary-investigator<a name="eclaire-study-party-role-code-system-primary-investigator"> </a></td><td>primary-investigator</td><td>primary-investigator</td></tr><tr><td style="white-space:nowrap">collaborator<a name="eclaire-study-party-role-code-system-collaborator"> </a></td><td>collaborator</td><td>collaborator</td></tr><tr><td style="white-space:nowrap">funding-source<a name="eclaire-study-party-role-code-system-funding-source"> </a></td><td>funding-source</td><td>funding-source</td></tr><tr><td style="white-space:nowrap">general-contact<a name="eclaire-study-party-role-code-system-general-contact"> </a></td><td>general-contact</td><td>general-contact</td></tr><tr><td style="white-space:nowrap">recruitment-contact<a name="eclaire-study-party-role-code-system-recruitment-contact"> </a></td><td>recruitment-contact</td><td>recruitment-contact</td></tr><tr><td style="white-space:nowrap">sub-investigator<a name="eclaire-study-party-role-code-system-sub-investigator"> </a></td><td>sub-investigator</td><td>sub-investigator</td></tr><tr><td style="white-space:nowrap">study-director<a name="eclaire-study-party-role-code-system-study-director"> </a></td><td>study-director</td><td>study-director</td></tr><tr><td style="white-space:nowrap">study-chair<a name="eclaire-study-party-role-code-system-study-chair"> </a></td><td>study-chair</td><td>study-chair</td></tr><tr><td style="white-space:nowrap">ethics<a name="eclaire-study-party-role-code-system-ethics"> </a></td><td>Ethics Review Board</td><td>Ethics Review Board</td></tr></table></div>',
  },
  url : 'https://interop.esante.gouv.fr/ig/fhir/eclaire/CodeSystem/eclaire-study-party-role-code-system',
  version : '0.3.0',
  name : 'EclaireStudyPartyRoleCS',
  title : 'Définition des rôles des parties prenantes inspiré de http://hl7.org/fhir/research-study-party-role',
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
  description : "Différents rôles des parties impliqué dans l'essai",
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
      code : 'sponsor',
      display : 'sponsor',
      definition : 'sponsor',
    },
    {
      code : 'lead-sponsor',
      display : 'lead-sponsor',
      definition : 'lead-sponsor',
    },
    {
      code : 'sponsor-investigator',
      display : 'sponsor-investigator',
      definition : 'sponsor-investigator',
    },
    {
      code : 'primary-investigator',
      display : 'primary-investigator',
      definition : 'primary-investigator',
    },
    {
      code : 'collaborator',
      display : 'collaborator',
      definition : 'collaborator',
    },
    {
      code : 'funding-source',
      display : 'funding-source',
      definition : 'funding-source',
    },
    {
      code : 'general-contact',
      display : 'general-contact',
      definition : 'general-contact',
    },
    {
      code : 'recruitment-contact',
      display : 'recruitment-contact',
      definition : 'recruitment-contact',
    },
    {
      code : 'sub-investigator',
      display : 'sub-investigator',
      definition : 'sub-investigator',
    },
    {
      code : 'study-director',
      display : 'study-director',
      definition : 'study-director',
    },
    {
      code : 'study-chair',
      display : 'study-chair',
      definition : 'study-chair',
    },
    {
      code : 'ethics',
      display : 'Ethics Review Board',
      definition : 'Ethics Review Board',
    },
  ],
}
