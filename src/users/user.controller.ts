import { Controller, Get, Req, Res } from '@nestjs/common'
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
// eslint-disable-next-line import/no-extraneous-dependencies
import { Request, Response } from 'express'

import { UsersService } from './users.service'

@ApiTags('User')
@ApiBearerAuth()
@Controller()
export class UserController {
  constructor(private userService: UsersService) {}

  @ApiOperation({ summary: 'Permet de vérifier si l’utilisateur est authentifier depuis son Bearer token. Retourne un résumé du profil de l’utilisateur si c’est le cas.' })
  @ApiOkResponse({
    description: 'Vous êtes bien authentifier. Un résumé de votre profil vous est retourné.',
    schema: { properties: { email: { example: 'mon-email@example.com', type: 'string' } } },
  })
  @Get('user')
  execute(@Req() request: Request, @Res() res: Response) {
    const user = this.userService.getFromRequest(request)

    if (user) {
      res.json({ email: user.email })
    }
  }
}
