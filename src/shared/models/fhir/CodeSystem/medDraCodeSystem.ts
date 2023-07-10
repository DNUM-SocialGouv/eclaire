/* eslint-disable sort-keys */
export const medDraCodeSystem = {
  resourceType : 'CodeSystem',
  id : 'mdr',
  text : {
    status : 'generated',
    div : '<div xmlns="http://www.w3.org/1999/xhtml"><p>This code system <code>http://terminology.hl7.org/CodeSystem/mdr</code> defines many codes, but they are not represented here</p></div>',
  },
  url : 'http://terminology.hl7.org/CodeSystem/mdr',
  identifier : [
    {
      system : 'urn:ietf:rfc:3986',
      value : 'urn:oid:2.16.840.1.113883.6.163',
    },
  ],
  version : '2.0.1',
  name : 'Mdr',
  title : 'MedDRA',
  status : 'active',
  experimental : false,
  date : '2019-03-20T00:00:00-04:00',
  publisher : 'TBD - External Body',
  contact : [{ name : 'MedDRA MSSO/ Northrop Grumman,MedDRA MSSO/ Northrop Grumman' }],
  description : 'MedDRA is a five-level hierarchy of terms. MedDRA was developed as an ICH initiative and is maintained and distributed by the MedDRA Maintenance and Support Services Organization (MSSO).\r\n\r\nVersions - Versions are released twice per year and are identified by 2 numbers separated by a decimal point (e.g., 7.0, 7.1, 8.0, and 8.1).\r\n\r\n.0 releases may contain changes to the hierarchy.\r\n\r\n.1 releases will only contain additions, moves, and modifications of medical concept terms (Preferred Terms) and coding level terms (Lowest Level Terms).\r\n\r\nConcepts - Concepts are represented by a MedDRA code and a MedDRA term name. The MedDRA code is an eight digit numeric code. MedDRA codes are unique and are never reused. The MedDRA term name is a 100 character alphanumeric field used to describe the concept or term.\r\n\r\nHierarchies - MedDRA is structured as a five level hierarchy. System Organ Classes (SOCs) are the broadest terms (e.g., Cardiac disorders, Investigations). The lowest level of the terminology is the Lowest Level Term (LLT) level. There are 26 SOCs and over 60,000 LLTs',
  caseSensitive : true,
  content : 'not-present',
}
