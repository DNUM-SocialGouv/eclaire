export class TitleModel {
  constructor(titleModel?: Partial<TitleModel>) {
    if (titleModel) {
      Object.assign(this, titleModel)
    }
  }

  readonly value: string = ''
  readonly acronym: string = ''
}
