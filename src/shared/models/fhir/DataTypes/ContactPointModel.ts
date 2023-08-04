import { ContactPoint, Extension } from 'fhir/r4'

import { ExtensionModel } from '../SpecialPurposeDataTypes/ExtensionModel'

export class ContactPointModel implements ContactPoint {
  constructor(
    readonly extension: Extension[] | undefined,
    readonly system:
      | 'phone'
      | 'fax'
      | 'email'
      | 'pager'
      | 'url'
      | 'sms'
      | 'other'
      | undefined,
    readonly use: 'home' | 'work' | 'temp' | 'old' | 'mobile' | undefined,
    readonly value: string | undefined
  ) {}

  static createPhone(phone: string): ContactPointModel {
    return new ContactPointModel(
      undefined,
      'phone',
      'work',
      phone
    )
  }

  static createEmail(email: string): ContactPointModel {
    return new ContactPointModel(
      undefined,
      'email',
      'work',
      email
    )
  }

  static createUrl(url: string): ContactPointModel {
    return new ContactPointModel(
      undefined,
      'url',
      'work',
      url
    )
  }

  static createSiteContactName(firstname: string, name: string, title: string): ContactPointModel {
    return new ContactPointModel(
      [ExtensionModel.createEclaireSiteContactName(firstname, name, title)],
      undefined,
      'work',
      undefined
    )
  }
}
