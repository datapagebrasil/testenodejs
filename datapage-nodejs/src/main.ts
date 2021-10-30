import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger, ValidationError, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './app/filters/http-exception.filter';
import { FallbackExceptionFilter } from './app/filters/fallback-exception.filter';
import { ValidationFilter } from './app/filters/validation.filter';
import { ValidationException } from './app/filters/validation.exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // loading .env file
  const configService = app.get(ConfigService);
  // setting up swagger
  const configDocs = new DocumentBuilder()
      .setTitle('DataPage NodeJS API')
      .setDescription('Documentação da API')
      .setVersion('1.0')
      .build();
  const document = SwaggerModule.createDocument(app, configDocs);
  SwaggerModule.setup('docs', app, document);
  // initializing app
  const port = configService.get<number>('PORT');
  console.log(port);
  // setting up exception filters
  app.useGlobalFilters(
    new FallbackExceptionFilter(),
    new HttpExceptionFilter(),
    new ValidationFilter()
  );
  // setting up validation
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    exceptionFactory: (errors: ValidationError[]) => {
      const messages = errors.map((error) => {
        return {
          mensagem: Object.values(error.constraints).join('')
        };
      });
      return new ValidationException(messages);
    }
  }));

  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port);
    Logger.log(`Running in ${configService.get('environment')} mode`);
  });
}
bootstrap();
