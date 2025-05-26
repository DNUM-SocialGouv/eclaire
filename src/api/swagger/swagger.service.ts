import { NestExpressApplication } from '@nestjs/platform-express'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

export class SwaggerService {
  create(app: NestExpressApplication) {
    const builder = new DocumentBuilder()
      .setTitle('API Eclaire')
      .setDescription(`<p>Base nationale des essais cliniques au standard <a href="https://hl7.org/fhir/R4/index.html"><abbr title="Fast Healthcare Interoperability Resources">FHIR</abbr></a>.</p>
        <p> Les données exposées par l'API ECLAIRE proviennent de sources différentes, toutes disponibles dans le SI RIPH 2G, selon le type d'études cliniques :</p>
        <ul>
          <li>Recherches impliquant la personne humaine (1er alinéa de l’article L.1121-1 du code de la santé publique) : « Jardé »</li>
          <li>Investigations cliniques (article 2 du règlement 2017.745) :  « DM »</li>
          <li>Etudes de performance  (article 2 du règlement 2017.746) : « DM DIV »</li>
          <li>Essais cliniques (article 2 du règlement 2014_536) provenant du CTIS et disponibles dans le SI RIPH 2G : « CTIS »</li>
        </ul>
        <p>Si vous avez des demandes d'améliorations ou des bugs, vous pouvez écrire une <a href="https://github.com/DNUM-SocialGouv/eclaire/issues">issue</a> sur notre Github.</p>
        <p>Pour information :</p>
        <ul>
        <li>Une valeur <b>"INDISPONIBLE"</b> signifie que nous n’avons pas encore la donnée et qu’elle arrivera par la suite ;</li>
        <li>Les données sont mises à jour toutes les nuits à 6 heures du matin.</li>
      </ul>
      <p>Quick start:</p>
      <ul>
        <li>Déplier la section "/R4/ResearchStudy"</li>
        <li>Cliquer sur "Try it out"</li>
        <li>Utiliser les champs pour filtrer. On peut, par exemple, utiliser les champs "_text" ou "_content" avec les mots clef "CTIS", "JARDE", "DM", etc.</li>
        <li>Cliquer sur "Exécuter" pour voir le résultat au format JSON</li>
      </ul>`)
      .setExternalDoc('Notre documentation FHIR est disponible via notre guide d’implémentation (R4).', 'https://interop.esante.gouv.fr/ig/fhir/eclaire/index.html')
      .setVersion('0.3.0')
      .build()
    const document = SwaggerModule.createDocument(app, builder)
    SwaggerModule.setup('api', app, document, { swaggerOptions: { tagsSorter: 'alpha' } })
  }
}
