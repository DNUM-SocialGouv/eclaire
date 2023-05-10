import { Module } from '@nestjs/common'

import { UserController } from './user.controller'
import { UsersService } from './users.service'

@Module({
  controllers: [UserController],
  exports: [UsersService],
  providers: [UsersService],
})
export class UsersModule {}
