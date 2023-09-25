import { Injectable } from '@nestjs/common'
import { NestExpressApplication } from '@nestjs/platform-express'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

@Injectable()
export class SwaggerService {
  create(app: NestExpressApplication) {
    const builder = new DocumentBuilder()
      .setTitle('API Eclaire')
      .setDescription(`<p>Base nationale des essais cliniques au standard <a href="https://hl7.org/fhir/R4/index.html"><abbr title="Fast Healthcare Interoperability Resources">FHIR</abbr></a>.</p>
        <p>Si vous avez des demandes d'améliorations ou des bugs, vous pouvez écrire une <a href="https://github.com/DNUM-SocialGouv/eclaire/issues">issue</a> sur notre Github.</p>
        <p>Pour information :</p>
        <ul>
        <li>Une valeur <b>"INDISPONIBLE"</b> signifie que nous n’avons pas encore la donnée et qu’elle arrivera par la suite ;</li>
        <li>Les données sont mises à jour toutes les nuits à 6 heures du matin.</li>
      </ul>`)
      .setExternalDoc('Notre documentation FHIR est disponible via notre guide d’implémentation (R4).', 'https://interop.esante.gouv.fr/ig/fhir/eclaire/index.html')
      .setVersion('0.1')
      .build()
    const document = SwaggerModule.createDocument(app, builder)
    SwaggerModule.setup('api', app, document, { swaggerOptions: { tagsSorter: 'alpha' } })
  }
}
