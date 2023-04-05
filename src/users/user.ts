import { Exclude } from 'class-transformer'
import { IsArray, IsNotEmpty, IsStrongPassword } from 'class-validator'

export class User {
  constructor(partial: Partial<User>) {
    Object.assign(this, partial)
  }

  id!: number

  firstname?: string

  lastname?: string

  @IsNotEmpty()
    email!: string

  @IsArray()
    roles!: string[]

  @IsStrongPassword()
  @Exclude()
    password!: string
}
