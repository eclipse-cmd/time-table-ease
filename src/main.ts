import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { GlobalExceptionFilter, HttpExceptionFilter } from './core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.setGlobalPrefix('api/v1', { exclude: [] });
  const configService = app.get(ConfigService);

  const APP_NAME = configService.get<string>('APP_NAME'),
    PORT = configService.get<number>('PORT');

  const swaggerConfig = new DocumentBuilder()
    .setTitle(`${APP_NAME} Documentation`)
    .setDescription(`The ${APP_NAME} Api Documentation`)
    .setVersion('1.0')
    .addTag(APP_NAME)
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig, {
    ignoreGlobalPrefix: false,
  });

  SwaggerModule.setup('app-doc', app, document, {
    customSiteTitle: `${APP_NAME} App documentation`,
  });

  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new HttpExceptionFilter(configService), new GlobalExceptionFilter(httpAdapterHost, configService));

  await app.listen(PORT);
}

bootstrap();
