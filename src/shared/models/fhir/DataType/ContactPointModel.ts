import { ContactPoint, Extension, Period } from 'fhir/r4'

import { ExtensionModel } from '../SpecialPurposeDataType/ExtensionModel'

export class ContactPointModel implements ContactPoint {
  constructor(
    readonly id: string | undefined,
    readonly extension: Extension[] | undefined,
    readonly period: Period | undefined,
    readonly rank: number | undefined,
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
      undefined,
      undefined,
      undefined,
      'phone',
      'work',
      phone
    )
  }

  static createEmail(email: string): ContactPointModel {
    return new ContactPointModel(
      undefined,
      undefined,
      undefined,
      undefined,
      'email',
      'work',
      email
    )
  }

  static createUrl(url: string): ContactPointModel {
    return new ContactPointModel(
      undefined,
      undefined,
      undefined,
      undefined,
      'url',
      'work',
      url
    )
  }

  static createSiteContactName(firstname: string, name: string, title: string): ContactPointModel {
    return new ContactPointModel(
      undefined,
      [ExtensionModel.createEclaireSiteContactName(firstname, name, title)],
      undefined,
      undefined,
      undefined,
      'work',
      undefined
    )
  }
}
