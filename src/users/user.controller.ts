import { Controller, Get, Req } from '@nestjs/common'
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
// eslint-disable-next-line import/no-extraneous-dependencies
import { Request } from 'express'

import { UsersService } from './users.service'

@Controller()
export class UserController {
  constructor(private userService: UsersService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Permet de vérifier si l’utilisateur est authentifier depuis son Bearer token. Retourne un résumé du profil de l’utilisateur si c’est le cas.' })
  @ApiOkResponse({
    description: 'Vous êtes bien authentifier. Un résumé de votre profil vous est retourné.',
    schema: { properties: { email: { example: 'mon-email@example.com', type: 'string' } } },
  })
  @ApiTags('User')
  @Get('user')
  getUser(@Req() request: Request) {
    const user = this.userService.getFromRequest(request)
    return { email: user.email }
  }
}
