import { Controller, Post, Request, UseGuards } from '@nestjs/common'
import {
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'

import { AuthService } from './auth.service'
import { LocalAuthGuard } from './local-auth-guard'
import { Public } from './public.decorator'
import { User } from '../users/User'

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Permet de se connecter avec ses identifiants (e-mail et mot de passe).' })
  @ApiBody({ type: User })
  @ApiCreatedResponse({
    description: 'La connexion est réussi et un token Bearer JWT vous est retourné. Félicitation ! Il devra être utilisé pour vous authentifier sur toutes les autres requêtes de l’API. Pour cela, il faut ajouter le header suivant sur les requêtes : "Authorization: Bearer mon_token_bearer"',
    schema: {
      properties: {
        access_token: {
          example: 'yyJhbtciOiJIUzB6NiIsInR5cCI6IkpXVCX9.eyJlbWFpbCI6IxFudG9pbmDuYnV6UXVkQG9jdG8uY42tIiwic3ViIjoxLCJp',
          type: 'string',
        },
      },
    },
  })
  @ApiNotFoundResponse({ description: 'Aucun utilisateur n’a été trouvé. Veuillez vérifier vos identifiants.' })
  @ApiUnauthorizedResponse({ description: 'Vous n’êtes pas authentifié. Veuillez vérifier vos identifiants.' })
  @ApiTags('Authentication')
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  login(@Request() request: ParameterDecorator) {
    // @ts-ignore
    // eslint-disable-next-line
    return this.authService.login(request.user as User)
  }
}