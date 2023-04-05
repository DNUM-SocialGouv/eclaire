import { ApiHideProperty, ApiProperty } from '@nestjs/swagger'
import { Exclude } from 'class-transformer'
import { IsArray, IsNotEmpty, IsNumber, IsString, IsStrongPassword } from 'class-validator'

export class User {
  constructor(partial: Partial<User>) {
    Object.assign(this, partial)
  }

  @ApiHideProperty()
  @IsNumber()
    id!: number

  @IsString()
    firstname?: string

  @IsString()
    lastname?: string

  @IsString()
    organization?: string

  @ApiProperty({ example: 'monemail@mondomaine.com' })
  @IsNotEmpty()
    email!: string

  @IsArray()
    roles!: string[]

  @ApiProperty({ example: '!monSuperMotDePasseSécursé1234' })
  @IsStrongPassword()
  @Exclude()
    password!: string
}
