import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as argon2 from 'argon2'

import { User } from '../users/user'
import { UsersService } from '../users/users.service'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async encryptPassword(password: string): Promise<object> {
    const hash = await argon2.hash(password)
    return { hash: hash }
  }

  async comparePassword(password: string, user: User): Promise<boolean> {
    return await argon2.verify(user.password, password)
  }

  async validateUser(email: string, pass: string): Promise<User | undefined> {
    const user: User | undefined = this.usersService.findOne(email)
    const isSamePassword = user
      ? await this.comparePassword(pass, user)
      : false

    if (isSamePassword) {
      const { ...result } = user
      return result
    }

    return undefined
  }

  login(user: User) {
    return { access_token: this.jwtService.sign({ email: user.email, sub: user.id }) }
  }
}
