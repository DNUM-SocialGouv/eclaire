import { Exclude } from 'class-transformer'
import { IsArray, IsNotEmpty, IsStrongPassword } from 'class-validator'

import { UserInterface } from '../interfaces/user.interface'

export class User implements UserInterface {
  constructor(partial: Partial<User>) {
    Object.assign(this, partial)
  }

  id!: number

  firstname?: string

  lastname?: string

  @IsNotEmpty()
    email!: string

  entity!: string

  @IsArray()
    roles!: string[]

  @IsStrongPassword()
  @Exclude()
    password!: string

  createdAt!: Date

  updatedAt!: Date
}
