import { Injectable } from '@nestjs/common'
import { NestExpressApplication } from '@nestjs/platform-express'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

@Injectable()
export class SwaggerService {
  create(app: NestExpressApplication) {
    const builder = new DocumentBuilder()
      .setTitle('API Eclaire')
      .setDescription(`Base nationale des essais cliniques.<br>Pour rappel :
        <ul>
        <li>Une valeur <b>"INDISPONIBLE"</b> signifie que nous n’avons pas la valeur en base de données et qu’elle arrivera par la suite</li>
        <li>Une valeur <b>vide</b> signifie que le déposant ne l’a pas remplie</li>
      </ul>`)
      .setExternalDoc('Guide d’implémentation', 'https://ansforge.github.io/IG-essais-cliniques/ig/main/index.html')
      .setVersion('0.1')
      // .addSecurity('bearer', {
      //   scheme: 'bearer',
      //   type: 'http',
      // })
      .build()
    const document = SwaggerModule.createDocument(app, builder)
    SwaggerModule.setup('api', app, document, { swaggerOptions: { tagsSorter: 'alpha' } })
  }
}
