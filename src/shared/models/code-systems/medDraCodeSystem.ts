export const medDraCodeSystem = {
  resourceType : 'CodeSystem',
  id : 'mdr',
  text : {
    status : 'generated',
    div : '<div xmlns="http://www.w3.org/1999/xhtml"><p class="res-header-id"><b>Generated Narrative: CodeSystem mdr</b></p><a name="mdr"> </a><a name="hcmdr"> </a><a name="mdr-en-US"> </a><p>This case-sensitive code system <code>https://www.meddra.org</code> defines codes, but no codes are represented here</p></div>',
  },
  url : 'https://www.meddra.org',
  identifier : [
    {
      system : 'urn:ietf:rfc:3986',
      value : 'urn:oid:2.16.840.1.113883.6.163',
    },
  ],
  version : '3.0.0',
  name : 'MedDRA',
  title : 'Medical Dictionary for Regulatory Activities',
  status : 'active',
  experimental : false,
  date : '2023-06-14T00:00:00-04:00',
  publisher : 'MedDRA Maintenance and Support Services Organization (MedDRA MSSO); Mr. Patrick Revelle; MSSO Director',
  contact : [
    {
      name : 'International Council for Harmonisation of Technical Requirements for Pharmaceuticals for Human Use (ICH)',
      telecom : [
        {
          system : 'url',
          value : 'https://www.ich.org/page/contact',
        },
      ],
    },
  ],
  description : 'MedDRA is a multilingual standardised international medical terminology which can be used for regulatory communication and evaluation of data pertaining to medicinal products for human use.  MedDRA is designed for use in the registration, documentation and safety monitoring of medicinal products through all phases of the development cycle (i.e., from clinical trials to post-marketing surveillance).#13;\n\r\nMedDRA is structured as a five level hierarchy. System Organ Classes (SOCs) are the broadest terms (e.g., Cardiac disorders, Investigations). The lowest level of the terminology is the Lowest Level Term (LLT) level.',
  copyright : 'Please see [https://www.meddra.org/legal-mentions](https://www.meddra.org/legal-mentions). For information about special licensing, see [https://www.meddra.org/subscription/special-licences](https://www.meddra.org/subscription/special-licences)',
  caseSensitive : true,
  content : 'not-present',
}
