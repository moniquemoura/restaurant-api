import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import * as compression from 'compression';
import { useContainer } from 'class-validator';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';

import helmet from 'helmet';
import * as morgan from 'morgan';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger:
      process.env.NODE_ENV === 'development'
        ? ['log', 'debug', 'error', 'verbose', 'warn']
        : ['error', 'warn'],
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.enableVersioning({
    type: VersioningType.URI,
  });

  const configService = app.get(ConfigService);
  app.use(compression());
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.use(cookieParser());
  app.use(morgan('tiny'));
  app.use(helmet());

  // Swagger Auth
  app.use(
    ['/api'],
    basicAuth({
      challenge: true,
      users: {
        [configService.get('SWAGGER_USERNAME')]:
          configService.get('SWAGGER_PASSWORD'),
      },
    }),
  );
  // Swagger
  const configSwagger = new DocumentBuilder()
    .setTitle('Restaurant')
    .setDescription('Api Restaurant')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('api', app, document);

  const port = configService.get('PORT') ?? 3000;
  await app.listen(port);
}

bootstrap();
