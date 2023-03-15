import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as Sentry from '@sentry/node';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ConfigService } from "@nestjs/config";

const configService = new ConfigService();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  Sentry.init({
    dsn: configService.get('SENTRY_DNS'),
    // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });

  const config = new DocumentBuilder()
    .setTitle('API Eclaire')
    .setDescription('Base nationale des essais cliniques')
    .setVersion('0.1')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
